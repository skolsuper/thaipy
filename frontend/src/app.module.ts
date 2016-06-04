import 'angular';
import 'angular-animate';
import 'angular-websocket';

import * as components from './components/index.ts';
import * as services from './services/index.ts';

angular.module('thaiPyDemo', [
  'ngAnimate',
  'angular-websocket',
])
  .component('messageBox', components.messageBoxComponent)
  .component('chatHistory', components.chatHistoryComponent)
  .component('chatMessage', components.chatMessageComponent)
  .component('serverInfo', components.serverInfoComponent)
  .filter('humanizeAgo', components.humanizeAgoFilter)
  .service('SocketService', services.SocketService)
  .service('MessagesService', services.MessagesService)
;
