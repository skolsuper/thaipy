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
      You are connected to {{ $ctrl.SocketService.serverName }}
      <button ng-if="$ctrl.SocketService.connected" ng-click="$ctrl.disconnect()">
          Disconnect
      </button>
      <button ng-if="!$ctrl.SocketService.connected" ng-click="$ctrl.reconnect()">
          Reconnect
      </button>
    </div>
    `,
  controller: ServerInfoController
};

