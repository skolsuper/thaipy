declare module app {

  interface IConnectionInfo {
    name: string
  }

  interface IWebsocketMessage {
    info: string
    data: IMessage | IConnectionInfo
  }

  interface ISocketService {
    connect(): void
    disconnect(): void
    sendMessage(message: app.IUnsentMessage): void
    connected: boolean
    serverName: string
  }
}
