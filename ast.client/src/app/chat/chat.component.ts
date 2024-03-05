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
      const userId = '20086aaa-efd6-4eab-900d-a5f58f24a6a0';

      this.chatService.sendMessage(userId, this.newMessage);
      this.newMessage = '';
    }
  }
}
