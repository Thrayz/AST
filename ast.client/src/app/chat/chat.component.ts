import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat-service.service';
import { jwtDecode } from 'jwt-decode';






@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  receivedMessages: { userId: string, message: string }[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getReceivedMessage().subscribe((message: any) => {
      this.receivedMessages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken && typeof decodedToken.nameid === 'string' ? decodedToken.nameid : null;
        if (userId) {
          console.log('Sending message to user ID:', userId);
          this.chatService.sendMessage(userId, this.newMessage);
          this.newMessage = '';
        } else {
          console.error('User ID is not available');
        }
      }
    }
  }




}
