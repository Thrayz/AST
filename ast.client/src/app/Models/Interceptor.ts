import { HubConnection, HubConnectionState, LogLevel } from '@microsoft/signalr';

export class SignalRLoggingInterceptor {
  constructor(private hubConnection: HubConnection) { }

  public startLogging(): void {
    this.hubConnection.on('ReceiveMessage', (data: any) => {
      console.log('Received message:', data);
    });

    this.hubConnection.onreconnecting(() => {
      console.log('Reconnecting...');
    });

    this.hubConnection.onreconnected(() => {
      console.log('Reconnected');
    });

    this.hubConnection.onclose(() => {
      console.log('Connection closed');
    });

    this.hubConnection.on('ReceiveConnectedUsers', (data: any) => {
      console.log('Received connected users:', data);
    });

    this.hubConnection.on('error', (error: any) => {
      console.error('SignalR error:', error);
    });
  }
}
