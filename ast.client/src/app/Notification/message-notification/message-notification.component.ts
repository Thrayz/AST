import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../_services/chat-service.service';
import Swal from 'sweetalert2';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-message-notification',
  templateUrl: './message-notification.component.html',
  styleUrls: ['./message-notification.component.css']
})
export class MessageNotificationComponent implements OnInit {

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit(): void {

    //stops the notification from showing on chat page
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url !== '/chat') {
        this.chatService.getReceivedMessage().subscribe(() => {
          this.showNotification();
        });
      }
    });
  }



  showNotification() {
    Swal.fire({
      position: "top-end",
      title: "New Message",
      width: 300,
      confirmButtonText: "Go to chat",
      showConfirmButton: true,
      timer: 3000

    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/chat";
      }
    });
  }

}
