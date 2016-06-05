class chatHistoryController {

  private messages: app.IMessage[];

  constructor(private $scope: ng.IScope,
              private MessagesService: app.IMessageService) {
    'ngInject';
    this.messages = this.getMessages();
    $scope.$on('message-received', () => {
      this.messages = this.getMessages();
    });
  }

  private getMessages() {
    return this.MessagesService.get();
  }
}

export const chatHistoryComponent: ng.IComponentOptions = {
  template:
    `<div class="chat-history">
      <div class="speech" ng-repeat="message in $ctrl.messages | orderBy:'timestamp' ">
        <chat-message message="message"></chat-message>
      </div>
    </div>`,
  controller: chatHistoryController
};

