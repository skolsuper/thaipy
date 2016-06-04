class messageBoxController {

  public form: app.IUnsentMessage = {
    username: '',
    message: ''
  };

  constructor(private SocketService: app.ISocketService) {'ngInject';}

  sendMessage() {
    this.SocketService.sendMessage(this.form);
  }

}

export const messageBoxComponent: ng.IComponentOptions = {
  template:
    `<form novalidate ng-submit="$ctrl.sendMessage()">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Name" ng-model="$ctrl.form.username">
      </div>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Write Message" ng-model="$ctrl.form.message">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button">
            Send
          </button>
        </span>
      </div>
    </form>`,
  controller: messageBoxController
};

