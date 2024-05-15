import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { SharedServiceService } from '../../_services/shared-service.service';

@Component({
  selector: 'app-daily-info-notification',
  templateUrl: './daily-info-notification.component.html',
  styleUrls: ['./daily-info-notification.component.css']
})
export class DailyInfoNotificationComponent implements OnInit {
  private readonly notificationDismissedKey = 'daily_info_notification_dismissed';


  constructor(private http: HttpClient, private shared: SharedServiceService) { }

  ngOnInit(): void {
    const userId = this.shared.getUserIdFromToken();

    const notificationDismissed = localStorage.getItem(this.notificationDismissedKey);
    if (!notificationDismissed) {
      this.checkDailyInfo();
      this.checkActivity(userId);
    }

 
  }

  checkDailyInfo(): void {
    const userId = this.shared.getUserIdFromToken();
    this.http.get<any>('https://localhost:7122/api/DailyInfo/GetDailyInfoByUserIdToday/' + userId)
      .subscribe(dailyInfo => {
        if (!dailyInfo) {
          this.showNotification();
        } else {
          this.checkActivity(userId);
        }
      });
  }

  checkActivity(userId: string): void {
    this.http.get<any>('https://localhost:7122/api/activities/user/' + userId + '/today')
      .subscribe(activity => {
        if (!activity) {
          this.showNotification();
        }
      });
  }

  showNotification(): void {
    Swal.fire({
      position: 'top-end',
      title: 'Missing Information',
      text: 'Please enter your daily information or activity for today.',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem(this.notificationDismissedKey, 'true');
      }
    });
  }
}
