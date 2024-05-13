import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../_services/chat-service.service';
import { User } from '../Models/User';
import { Observable } from 'rxjs';
import { SharedServiceService } from '../_services/shared-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent {
  messages: any[] = [];
  users: User[] = [];
  selectedUser!: User;
  newMessage!: string;
  receivedMessages: any[] = [];
  privateChatMessages: any[] = [];
  connectedUsers: any[] = [];
  connectedUsers2: any[] = [];
  senderName!: any;

  id: string = '';
  id2: string = '';
    receivedPrivateMessages: any;

  constructor(private chatService: ChatService, private userService: SharedServiceService, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.chatService.getReceivedP(); // Start listening for received private messages

    this.chatService.receivedPrivateMessageSubject.subscribe((message: any) => {
      console.log('Received private message:', message);
      this.receivedPrivateMessages.push(message);
      this.receivedPrivateMessages.add(message);
    });
    this.chatService.messageReceived$.subscribe(message => {
      console.log('Received message:', message);
      this.chatService.getReceivedMessage().subscribe({
        next: (message) => {

          if (this.selectedUser && message.userId === this.selectedUser.id) {
            this.privateChatMessages.push(message);
          } else {
            this.receivedMessages.push(message);

          }


          console.log('Received message:', message);
          console.log("boooooooooooooooooooooooo");
        },
        error: (error) => {
          console.error('Error receiving message:', error);
        }
      });

      this.messages.push(message);
      console.log(this.messages);
      this.senderName = this.getUsernameFromMessage(message);

    });
    this.userService.getUsers().subscribe(users => {
this.users = users;
    }
);

  }


  getUserNameFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));

    const userName = payload["unique_name"];
    console.log(payload["unique_name"]);
    console.log(userName);
    return userName;
  }

  getMessagesOfUusers() {
    var userId = this.getUserIdFromToken();
    this.getRecipientIdFromUrl();
    var recipeintId = this.id2;
    this.chatService.getMessages(userId, recipeintId).subscribe(messages => {
      this.messages = messages;
      console.log(this.messages);
    });
  }
  getUsernameFromMessage(message: any) {
    if (message.messageContent === null || message.messageContent === undefined || message.messageContent === '') {
      return this.users.find(user => user.id === message.senderId)?.userName;
    }
    else {
      return this.users.find(user => user.id === message.senderId)?.userName;
    }
  }

  getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const parts = token.split('.');


    


    const payload = JSON.parse(atob(parts[1]));

    const userId = payload["nameid"];
    console.log(payload["nameid"]);
    console.log(userId);


    return userId;
  }

  //get recipient user id from param in url
  getRecipientIdFromUrl() {
    this.route.paramMap.subscribe(params => {
      this.id2 = params.get('id') || '';
      console.log(this.id2);
      console.log("lmaoooooooooooooooooooooooooooooooo");
    });
  }


  sendMessage() {
    this.getRecipientIdFromUrl();
    this.chatService.sendPrivateMessage(this.id2, this.newMessage)
        .subscribe({
          next: () => {
             console.log('Message sent successfully');
            this.newMessage = '';
          },
          error: (error) => {
            console.error('Error sending message:', error);
          }
        });
   


    
   

  }
}
