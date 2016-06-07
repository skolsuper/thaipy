import asyncio
import json
import os
import uuid
from typing import MutableSet

import arrow
import aiohttp
from aiohttp import web

ws_listeners = set()  # type: MutableSet[web.WebSocketResponse]


async def main_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    ws_listeners.add(ws)

    server_info_message = {
        'info': 'server',
        'data': {
            'name': os.environ.get('SERVER_NAME', 'Wedge'),
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


async def process_incoming_chat_message(message: str):
    global ws_listeners
    chat_message = json.loads(message)
    chat_message['id'] = str(uuid.uuid4())
    chat_message['timestamp'] = arrow.utcnow().isoformat()
    outgoing_message = {
        'info': 'message',
        'data': chat_message
    }
    errors = set()
    for ws in ws_listeners:
        try:
            ws.send_str(json.dumps(outgoing_message))
        except RuntimeError:
            errors.add(ws)
    ws_listeners -= errors


def main():
    loop = asyncio.get_event_loop()
    app = web.Application(loop=loop)
    app.router.add_route('GET', '/', main_handler)

    async def _on_shutdown(_app):
        for ws in ws_listeners:
            await ws.close(code=1001, message='Server shutdown')

    app.on_shutdown.append(_on_shutdown)

    web.run_app(app, port=os.environ.get('WS_PORT', 8001))


if __name__ == '__main__':
    main()
