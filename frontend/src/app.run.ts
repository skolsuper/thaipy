import {WS_URL} from './app.constants.ts';

export function startApp(
  SocketService: app.ISocketService
) {
  'ngInject';
  SocketService.connect(WS_URL);
}
