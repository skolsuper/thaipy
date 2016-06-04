export class SocketService implements app.ISocketService {

  private stream;
  private connected: boolean = false;

  constructor(private $log: ng.ILogService,
              private $timeout: ng.ITimeoutService,
              private $websocket,
              private MessagesService: app.IMessageService) { 'ngInject';}

  connect(url) {
    this.stream = this.$websocket(url);
    this.stream.onOpen(() => this.onConnect());
    this.stream.onMessage((response: string) => {
      const message: app.IWebsocketMessage = angular.fromJson(response);
      this.processMessage(message);
    });
    this.stream.onClose(() => {
      this.connected = false;
      this.$timeout(() => this.connect(url), 1000);
    });
  }

  sendMessage(message) {
    this.$log.debug('sending message:', message);
    if (this.connected){
      const data: string = angular.toJson(message);
      this.stream.send(data);
    }
  }

  private onConnect() {
    this.connected = true;
    this.$log.info('Websocket connected');
  }

  private processMessage(message: app.IWebsocketMessage): void {
    this.$log.info('WS message received', message);
    switch (message.info) {
      case 'message':
        this.MessagesService.add(message.data as app.IMessage);
        break;
    }
  }
}
