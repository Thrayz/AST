import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat-service.service';
import { User } from '../Models/User';
import { Observable } from 'rxjs';
import { SharedServiceService } from '../_services/shared-service.service';
import { Router } from '@angular/router';



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
  connectedUsers: any[] = [];
  connectedUsers2: any[] = [];

  id: string = '';
  id2: string = '';


  constructor(private chatService: ChatService, private userService: SharedServiceService,
  private router: Router) { }

  ngOnInit(): void {




    /*
    setInterval(() => {
      this.bullshit();
    }, 5000);
    this.fetchUsers();
    */

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
  }


  fetchUsers() {

  }


  selectUser(user: User) {
  
    console.log('User selected: ' + user.id);

    // Navigate to private chat with user ID
    this.router.navigate(['/private-chat', user.id]);
  }


  sendMessage() {
    if (this.newMessage.trim() !== '' && this.selectedUser) {
      const token = localStorage.getItem('token') || '';

      this.chatService.sendMessage(this.selectedUser.id, this.newMessage, token)
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
      //get the users that are connected to the chat from all the users using  getUsers() from the shared service and remove the current user


      this.userService.getUsers().subscribe(users => {
        const token = localStorage.getItem('token') || '';
        this.id2 = this.getUserIdFromToken() || '';
        this.connectedUsers2 = users.filter(user => this.connectedUsers.includes(user.id) && user.id !== this.id2);
      });





    });
  }

  getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const parts = token.split('.');


    if (parts.length !== 3) {
      return null;
    }


    const payload = JSON.parse(atob(parts[1]));

    const userId = payload["nameid"];
    console.log(userId);
    return userId;
  }

 

}
