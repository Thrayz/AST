import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: HubConnection;
  private receivedMessageSubject: Subject<{ userId: string, message: string }> = new Subject<{ userId: string, message: string }>();

  constructor() {
    const token = localStorage.getItem('token') || 'test';

    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7122/chatHub", { accessTokenFactory: () => token })
      .build();

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMessage', (userId: string, message: string) => {
      this.receivedMessageSubject.next({ userId, message });
    });
  }

  sendMessage(userId: string, message: string, token: string): Observable<void> {
    return new Observable<void>((observer) => {
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


  receiveMessage(callback: (userId: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  getReceivedMessage(): Observable<{ userId: string, message: string }> {
    return this.receivedMessageSubject.asObservable();
  }
}
