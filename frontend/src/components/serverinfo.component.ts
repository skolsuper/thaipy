class ServerInfoController {
  constructor(public SocketService: app.ISocketService) {'ngInject';}

  disconnect() {
    this.SocketService.disconnect();
  }
  reconnect() {
    this.SocketService.connect();
  }
}

export const serverInfoComponent: ng.IComponentOptions = {
  template:
    `<div class="server-info">
      <span ng-if="$ctrl.SocketService.connected">
        You are connected to {{ $ctrl.SocketService.serverName }}
        <button ng-click="$ctrl.disconnect()">
          Disconnect
        </button>
      </span>
      <span ng-if="!$ctrl.SocketService.connected">
        You are disconnected.
        <button ng-click="$ctrl.reconnect()">
          Reconnect
        </button>
      </span>
    </div>
    `,
  controller: ServerInfoController
};

