import asyncio
import json
import os
import random
from typing import MutableSet

import aiohttp
import arrow
import resync
from aiohttp import web
from resync.diff import Diff, create
from resync.fields import StrField
from resync.listener import ChangeListener
from resync.models import Model

SERVER_NAME = random.choice(['Wedge', 'Dak', 'Derek', 'Wes', 'Zev', 'Luke'])

ws_listeners = set()  # type: MutableSet[web.WebSocketResponse]


class Message(Model):

    id = StrField()
    username = StrField()
    message = StrField()
    timestamp = StrField(default=arrow.utcnow)


async def main_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    ws_listeners.add(ws)

    server_info_message = {
        'info': 'server',
        'data': {
            'name': SERVER_NAME,
        },
    }
    ws.send_str(json.dumps(server_info_message))

    async for msg in ws:
        if msg.tp == aiohttp.MsgType.text:
            if msg.data == 'close':
                ws_listeners.remove(ws)
                await ws.close()
            else:
                await process_incoming_chat_message(msg.data)
        elif msg.tp == aiohttp.MsgType.error:
            ws_listeners.remove(ws)
    return ws


async def process_incoming_chat_message(data: str):
    message_data = json.loads(data)
    await Message.objects.create(**message_data)


async def new_message_listener(message: Message, diff: Diff):
    global ws_listeners
    if diff is create:
        outgoing_message_data = {
            'info': 'message',
            'data': message.to_db()
        }
        errors = set()
        for ws in ws_listeners:
            try:
                ws.send_str(json.dumps(outgoing_message_data))
            except RuntimeError:
                errors.add(ws)
        ws_listeners -= errors


def main():
    resync.setup({
        'host': os.environ.get('RETHINK_HOST', 'localhost'),
        'db': 'thaipy',
    })
    loop = asyncio.get_event_loop()
    app = web.Application(loop=loop)
    app.router.add_route('GET', '/ws', main_handler)

    db_listener = ChangeListener(Message.objects.all(), new_message_listener)
    listen_task = asyncio.ensure_future(db_listener.listen())

    async def _on_shutdown(_app):
        listen_task.cancel()
        for ws in ws_listeners:
            await ws.close(code=1001, message='Server shutdown')
        await resync.teardown()

    app.on_shutdown.append(_on_shutdown)

    web.run_app(app, port=os.environ.get('WS_PORT', 8001))


if __name__ == '__main__':
    main()
