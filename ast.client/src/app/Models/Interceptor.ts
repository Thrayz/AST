import { HubConnection, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';

export class SignalRLoggingInterceptor {
  constructor(private hubConnection: HubConnection,
    private toastr: ToastrService) { }

  public startLogging(): void {
    this.hubConnection.on('ReceiveMessage', (data: any) => {
      console.log('Received message:', data);
      // Display a notification for received message
      this.toastr.success('New message received', 'Message');
      console.log("welp");
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

  public handleIncomingMessage(message: string): void {
    // TODO: remove this and related code in other components
    this.toastr.success(message, 'New Message', {
      enableHtml: false,
      closeButton: true,
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      tapToDismiss: false,
      toastClass: 'custom-toast'
    });
  
  }
}
