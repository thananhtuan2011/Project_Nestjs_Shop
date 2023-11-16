import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
@WebSocketGateway(80, {
  namespace: 'notify',
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  allowEIO3: true,
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Namespace;
  afterInit(server: any) {
    // throw new Error('Method not implemented.');
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
  async handleConnection(socket: Socket) {
    console.log("connect socket ")
  }
  async handleDisconnect(socket: Socket) {
    console.log("disconnect socket ")
  }
  public async sendNotify(message: any) {

    // this.server.to(socketId).emit('notification', message);
    this.server.emit('notification', message);
    // this.logger.log(`Send completed`);
  }
}
