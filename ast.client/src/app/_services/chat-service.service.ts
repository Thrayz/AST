import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { decode } from 'jsonwebtoken'; 
import * as signalR from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: HubConnection;
  private receivedMessageSubject: Subject<{ userId: string, message: string }> = new Subject<{ userId: string, message: string }>();


 




  constructor() {

    const token = localStorage.getItem('token') ?? 'test';
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7122/chatHub", { accessTokenFactory: () => token })
      .build();


    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));


    this.hubConnection.on('ReceiveMessage', (userId: string, message: string) => {
      this.receivedMessageSubject.next({ userId, message });
    });
  }


  sendMessage(userId: string, message: string) {
    this.hubConnection.invoke('SendMessageToUser', userId, message)
      .catch((err: any) => console.error(err));
  }

  receiveMessage(callback: (userId: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  getReceivedMessage(): Observable<{ userId: string, message: string }> {
    return this.receivedMessageSubject;
  }

}
