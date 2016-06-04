class serverInfoController {
  constructor(private SocketService: app.ISocketService) {'ngInject';}

  getServerName(): string {
    return 'red';
  }
}

export const serverInfoComponent: ng.IComponentOptions = {
  template:
    `<div class="server-info">
      You are connected to {{ $ctrl.getServerName() }}
    </div>`,
  controller: serverInfoController
};

