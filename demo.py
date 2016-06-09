import asyncio

import time
from aiohttp import web
from aiohttp.web import Response

request_counter = 0


async def fast_handler(request):
    global request_counter
    request_counter += 1
    return Response(text='Hello visitor number {}'.format(request_counter))


async def slow_handler(request):
    time.sleep(10)
    return Response(text='Heeeeellllllllllllooooooooooooo')


def main():
    loop = asyncio.get_event_loop()
    app = web.Application(loop=loop)
    app.router.add_route('GET', '/slow', slow_handler)
    app.router.add_route('GET', '/fast', fast_handler)

    web.run_app(app, port=4444)

if __name__ == '__main__':
    main()
