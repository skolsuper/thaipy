import {findIndex, propEq} from 'ramda';


export class MessagesService implements app.IMessageService {

  private messages: app.IMessage[] = [];

  constructor(private $rootScope: ng.IRootScopeService) {'ngInject';}

  get() {
    return this.messages;
  }

  add(newMessage) {
    if (findIndex(propEq('id', newMessage.id), this.messages) === -1) {
      this.messages.push(newMessage);
      this.$rootScope.$broadcast('message-received', newMessage);
    }
  }
}
