export function startApp(
  SocketService: app.ISocketService
) {
  'ngInject';
  SocketService.connect();
}
