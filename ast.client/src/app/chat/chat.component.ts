import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat-service.service';


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
      // Assuming userId is available in the component
      const userId = 'currentUser';

      this.chatService.sendMessage(userId, this.newMessage);
      this.newMessage = '';
    }
  }
}
