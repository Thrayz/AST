export class Message {
  id!: number;
  content!: string;
  senderId!: string;
  receiverId!: string;
  senderName!: string;
  isRead!: boolean;
  replyToMessageId!: number;
  attachments!: string[];
  timestamp!: Date;
}
