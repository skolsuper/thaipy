export class SocketService implements app.ISocketService {

  private stream;
  private shouldReconnect: boolean = true;
  public connected = false;
  public serverName;

  constructor(private $log: ng.ILogService,
              private $rootScope: ng.IRootScopeService,
              private $timeout: ng.ITimeoutService,
              private $websocket,
              private MessagesService: app.IMessageService,
              private $location: ng.ILocationService) {
    'ngInject';
    $rootScope.$on('$destroy', () => {
      this.$log.debug('Shutting down');
      this.disconnect();
    });
  }

  connect() {
    const WS_URL = `ws://${this.$location.host()}:${this.$location.port()}/ws`;
    this.stream = this.$websocket(WS_URL);
    this.stream.onOpen(() => this.onConnect());
    this.stream.onMessage((response) => {
      const message: app.IWebsocketMessage = angular.fromJson(response.data);
      this.processMessage(message);
    });
    this.stream.onClose(() => {
      this.connected = false;
      if (this.shouldReconnect) {
        this.$timeout(() => this.connect(), 1000);
      }
    });
  }

  disconnect() {
    this.shouldReconnect = false;
    this.connected = false;
    this.stream.close();
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
      case 'server':
        this.serverName = (message.data as app.IConnectionInfo).name;
        break;
    }
  }
}
