class messageBoxController {

  public message: string;

  constructor(private AuthService: app.IAuthService,
              private SocketService: app.ISocketService) { 'ngInject';}

  canSend(): boolean {
    return (
      angular.isDefined(this.AuthService.username) &&
      this.SocketService.connected &&
      !!this.message
    );
  }

  sendMessage(): void {
    if (this.message) {
      const unsentMessage:app.IUnsentMessage = {
        username: this.AuthService.username,
        message: this.message,
      };
      this.SocketService.sendMessage(unsentMessage);
      this.message = '';
    }
  }
}

export const messageBoxComponent: ng.IComponentOptions = {
  template:
    `<form novalidate ng-submit="$ctrl.sendMessage()">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Write Message"
               ng-model="$ctrl.message">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="submit" ng-disabled="!$ctrl.canSend()">
            Send
          </button>
        </span>
      </div>
    </form>`,
  controller: messageBoxController
};

