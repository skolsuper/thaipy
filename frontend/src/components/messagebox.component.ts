class messageBoxController {

  public message: string;

  constructor(private AuthService: app.IAuthService,
              private SocketService: app.ISocketService) { 'ngInject';}

  sendMessage(): void {
    const unsentMessage: app.IUnsentMessage = {
      username: this.AuthService.username,
      message: this.message,
    };
    this.SocketService.sendMessage(unsentMessage);
  }
}

export const messageBoxComponent: ng.IComponentOptions = {
  template:
    `<form novalidate ng-submit="$ctrl.sendMessage()">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Write Message" ng-model="$ctrl.message">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button">
            Send
          </button>
        </span>
      </div>
    </form>`,
  controller: messageBoxController
};

