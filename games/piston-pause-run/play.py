from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
import webbrowser

folder = Path(__file__).resolve().parent / 'dist'
with ThreadingHTTPServer(('127.0.0.1', 0), partial(SimpleHTTPRequestHandler, directory=str(folder))) as server:
    url = f'http://127.0.0.1:{server.server_port}/'
    print('Open this address to play:', url)
    print('Press Ctrl+C to stop the local preview.')
    threading.Timer(0.4, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
