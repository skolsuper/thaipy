import {findIndex, propEq} from 'ramda';


export class MessagesService implements app.IMessageService {

  private messages: app.IMessage[];

  constructor(private $rootScope: ng.IRootScopeService) {'ngInject';}

  get() {
    return this.messages;
  }

  add(message) {
    if (findIndex(propEq('id', message.id))(this.messages) === -1) {
      this.messages.push(message);
      this.$rootScope.$broadcast('message-received', message);
    }
  }
}
