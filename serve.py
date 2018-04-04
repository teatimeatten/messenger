from sockets import socketio
from website import create_app

app = create_app()

if __name__ == '__main__':

    socketio.run(app, port=8989, debug=True)