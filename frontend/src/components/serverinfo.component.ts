class serverInfoController {
  constructor(private SocketService: app.ISocketService) {'ngInject';}

  getServerName(): string {
    return this.SocketService.serverName;
  }
}

export const serverInfoComponent: ng.IComponentOptions = {
  template:
    `<div class="server-info">
      You are connected to {{ $ctrl.getServerName() }}
    </div>`,
  controller: serverInfoController
};

