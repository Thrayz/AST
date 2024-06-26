import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignalRLoggingInterceptor } from '../Models/Interceptor';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})

//Bugged piece of shit that works just about good enough for me to stop giving a flying fuck 
//DON'T TOUCH anything in this file and/or anything related to this file 


export class ChatService {
  private hubConnection: HubConnection;

  private receivedMessageSubject: Subject<{ userId: string, message: string }> = new Subject<{ userId: string, message: string }>();
  public receivedPrivateMessageSubject: Subject<any> = new Subject<any>();
  private apiUrl = 'https://localhost:7122/api/message';
  public messageReceived$ = new Subject<any>();
    signalRInterceptor!: SignalRLoggingInterceptor;
    notificationSubject: any;


  constructor(private http: HttpClient, private toastr: ToastrService) {



  
    const token = localStorage.getItem('token') || 'test';
    const hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl("https://localhost:7122/chatHub", { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information);
   


    this.hubConnection = hubConnectionBuilder.build();

   
    const loggingInterceptor = new SignalRLoggingInterceptor(this.hubConnection, this.toastr);

  
    loggingInterceptor.startLogging();

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));

   
    this.hubConnection.on('ReceiveMessage', (userId: string, message: string) => {
      this.receivedMessageSubject.next({ userId, message });
     
      this.signalRInterceptor.handleIncomingMessage(message);
     

    });


  }

 
  sendMessage(userId: string, message: string, token: string): Observable<void> {
    return new Observable<void>((observer) => {
      console.log('Sending message to user:', userId, message);
      this.hubConnection.invoke('SendMessageToUser', userId, message, token)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  
  broadcastMessage(message: string): Observable<void> {
    const token = localStorage.getItem('token') || '';
    return new Observable<void>((observer) => {
      this.hubConnection.invoke('BroadcastMessage', message, token)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }


  getReceivedMessage(): Observable<{ userId: string, message: string }> {
  
    return this.receivedMessageSubject.asObservable();
    
  }

  getReceivedP(): any {
    this.hubConnection.on('ReceivePMessage', (senderId, messageContent) => {
      // Emit received message to subscribers
      this.messageReceived$.next({ senderId, messageContent });
    });
  }
 
  fetchOldMessages(userId: string): Observable<{ userId: string, message: string }[]> {

    return this.http.get<{ userId: string, message: string }[]>(`https://localhost:7122/api/message/${userId}?senderId=eb04b5e3-49cd-477a-94d9-a17317e604b4`);
  }


  getConnectedUsers(): Observable<string[]> {
  return new Observable<string[]>((observer) => {
    if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
      this.hubConnection.on('ReceiveConnectedUsers', (connectedUsersJson: any) => {
        console.log('Received connected users JSON:', connectedUsersJson);
        const users: string[] = JSON.parse(connectedUsersJson);
        console.log('Parsed connected users:', users);
        observer.next(users);
        observer.complete();
      });

      this.hubConnection.invoke('GetConnectedUsers')
        .catch((error: any) => {
          observer.error(error);
        });
    } else {
      observer.error('Hub connection is not in the connected state.');
    }
  });
  }


  sendPrivateMessage(recipientId: string, message: any): Observable<void> {
    var token = localStorage.getItem('token') || '';
    return new Observable<void>((observer) => {
      if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
        // Listen for the private message acknowledgment from the server
        this.hubConnection.on('ReceivePMessage', (message: any) => {
          console.log('Received private message:', message);
          console.log('Received private message:', message.senderUserId, message.messageContent);
          this.receivedPrivateMessageSubject.next(message);
          observer.next(message);
          observer.complete();
        });

        // Invoke the server method to send the private message
        this.hubConnection.invoke('SendPrivateMessage', recipientId, message, token)
          .catch((error: any) => {
            observer.error(error);
          });
      } else {
        observer.error('Hub connection is not in the connected state.');
      }
    });
  }


  getReceivedPrivateMessage(): Observable<{ senderUserId: string, message: string }> {
    return this.receivedPrivateMessageSubject.asObservable();
  }


  public sendMessage1 = (userId: string, message: string) => {
    this.hubConnection.invoke('SendMessage1', userId, message)
      .catch(err => console.error(err));
      console.log('Sending message to user:', userId, message);
  }



  public startConnection = () => {
    const token = localStorage.getItem('token') || 'test';
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7122/chatHub", { accessTokenFactory: () => token })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMessage', (senderId, messageContent) => {
      // Emit received message to subscribers
      this.messageReceived$.next({ senderId, messageContent });

      console.log("uduhfsksdjhflkdshfjdshlfdsjhfjdshfj uvovewe bisaw fuckity fuck");
    });
  }



  getMessages(userId: any, currentUserId: any): Observable<any> {
    console.log('Getting messages for user:', userId);
    console.log('Current user:', currentUserId);
    return this.http.get(`${this.apiUrl}/${userId}?currentUserId=${currentUserId}`);
  }

  listenForNotifications(): void {
    this.hubConnection.on('NotifyMissingInfo', (message: string) => {
      this.notificationSubject.next(message);
    });
  }




  getNotification(): Observable<string> {
    return this.notificationSubject.asObservable();
  }


  
}
