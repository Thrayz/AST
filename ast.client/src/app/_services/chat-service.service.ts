import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: HubConnection;
  private receivedMessageSubject: Subject<{ userId: string, message: string }> = new Subject<{ userId: string, message: string }>();
 

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7122/chathub') 
      .build();

    this.hubConnection.start().catch(err => console.error(err));

    this.hubConnection.on('ReceiveMessage', (userId: string, message: string) => {
      this.receivedMessageSubject.next({ userId, message });
    });
  }


  sendMessage(userId: string, message: string) {
    this.hubConnection.invoke('SendMessage', userId, message)
      .catch((err: any) => console.error(err));
  }

  receiveMessage(callback: (userId: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  getReceivedMessage(): Observable<{ userId: string, message: string }> {
    return this.receivedMessageSubject;
  }

}
