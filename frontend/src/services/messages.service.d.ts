declare module app {

  interface IUnsentMessage {
    username: string
    message: string
  }

  interface IMessage extends IUnsentMessage {
    id: string
    timestamp: string
  }

  interface IMessageService {
    get(): app.IMessage[]
    add(message: app.IMessage): void
  }
}
