import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat-service.service';
import { SharedServiceService } from '../_services/shared-service.service'; 
import { User } from '../Models/User';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: User[] = [];
  selectedUser!: User;
  newMessage!: string;
  receivedMessages: { userId: string, message: string }[] = [];

  constructor(private chatService: ChatService, private sharedService: SharedServiceService, private http: HttpClient) { } 

  ngOnInit(): void {
    this.sharedService.getUsers().subscribe(users => { 
      this.users = users;
    });

    
    this.chatService.getReceivedMessage().subscribe({
      next: (message) => {
        this.receivedMessages.push(message);
        console.log(this.receivedMessages.push(message));
      },
      error: (error) => {
        console.error('Error receiving message:', error);
      }
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }


  sendMessage() {
    if (this.newMessage.trim() !== '' && this.selectedUser) {
      const token = localStorage.getItem('token') || ''; 

      this.chatService.sendMessage(this.selectedUser.id, this.newMessage, token)
        .subscribe({
          next: () => {
            console.log('Message sent successfully');
           // this.saveMessageToDatabase(this.selectedUser.id, this.newMessage);
            this.newMessage = '';
          },
          error: (error) => {
            console.error('Error sending message:', error);
          }
        });
    }
  }


  
  saveMessageToDatabase(recipientUserId: string, messageContent: string) {
    const url = '/api/message';
    const body = { recipientUserId, messageContent };

    this.http.post(url, body).subscribe(
      (response) => {
        console.log('Message saved to database:', response);
      },
      (error) => {
        console.error('Error saving message to database:', error);
      }
    );
  }

}
