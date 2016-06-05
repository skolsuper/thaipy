export class MessagesService implements app.IMessageService {

  private messages: app.IMessage[] = [];

  constructor(private $rootScope: ng.IRootScopeService) {'ngInject';}

  get() {
    return this.messages;
  }

  add(message) {
    if (this.findIndex((existing) => existing.id === message.id, this.messages) === -1) {
      this.messages.push(message);
      this.$rootScope.$broadcast('message-received', message);
    }
  }

  private findIndex(predicate: (a: any) => boolean, list: any[]) {
    let index = 0;
    for (const obj in list) {
      if (predicate(obj)) {
        return index;
      }
      ++index;
    }
    return -1;
  }
}
