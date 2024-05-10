import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat-service.service';
import { User } from '../Models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: User[] = [];
  selectedUser!: User;
  newMessage!: string;
  receivedMessages: any[] = [];
  privateChatMessages: any[] = [];
  connectedUsers: any[] = []

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {


    
    
    this.fetchUsers();

  
    this.chatService.getReceivedMessage().subscribe({
      next: (message) => {
      
        if (this.selectedUser && message.userId === this.selectedUser.id) {
          this.privateChatMessages.push(message);
        } else {
          this.receivedMessages.push(message);
        }
      },
      error: (error) => {
        console.error('Error receiving message:', error);
      }
    });
  }

 
  fetchUsers() {
  
  }

 
  selectUser(user: User) {
    this.selectedUser = user;
    this.privateChatMessages = []; 
    this.chatService.fetchOldMessages(user.id).subscribe(messages => {
      this.privateChatMessages = messages;
      console.log(this.privateChatMessages);
    });
  }

 
  sendMessage() {
    if (this.newMessage.trim() !== '' && this.selectedUser) {
      const token = localStorage.getItem('token') || ''; 

      this.chatService.sendMessage("706f458a-6bcb-44ec-af6d-4bb35a4acd9f", this.newMessage)
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

 
  broadcastMessage() {
    if (this.newMessage.trim() !== '') {
      this.chatService.broadcastMessage(this.newMessage)
        .subscribe({
          next: () => {
            console.log('Broadcast message sent successfully');
            this.newMessage = ''; 
          },
          error: (error) => {
            console.error('Error sending broadcast message:', error);
          }
        });
    }
  }


  bullshit() {
    this.chatService.getConnectedUsers().subscribe(users => {
      this.connectedUsers = users;

    });
  }
}
