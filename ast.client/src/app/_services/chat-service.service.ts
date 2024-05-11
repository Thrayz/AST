import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignalRLoggingInterceptor } from '../Models/Interceptor';
import * as signalR from '@microsoft/signalr';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: HubConnection;

  private receivedMessageSubject: Subject<{ userId: string, message: string }> = new Subject<{ userId: string, message: string }>();
    receivedPrivateMessageSubject: any;

  constructor(private http: HttpClient) {
  
    const token = localStorage.getItem('token') || 'test';
    const hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl("https://localhost:7122/chatHub", { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information);
   


    this.hubConnection = hubConnectionBuilder.build();

   
    const loggingInterceptor = new SignalRLoggingInterceptor(this.hubConnection);

  
    loggingInterceptor.startLogging();

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));

   
    this.hubConnection.on('ReceiveMessage', (userId: string, message: string) => {
      this.receivedMessageSubject.next({ userId, message });
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


  sendPrivateMessage(): Observable<void> {
    return new Observable<void>((observer) => {
      if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
        // Listen for the private message acknowledgment from the server
        this.hubConnection.on('ReceivePrivateMessage', (message: any) => {
          console.log('Received connected users JSON:', message);
          this.receivedPrivateMessageSubject.next(message);
          observer.next(message);
          observer.complete();
        });

        // Invoke the server method to send the private message
        this.hubConnection.invoke('SendPrivateMessage')
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
  }

  

  
}
