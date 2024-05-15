import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service';
import { SharedServiceService } from '../../_services/shared-service.service';

@Component({
  selector: 'app-user-activity-list',
  templateUrl: './user-activity-list.component.html',
  styleUrls: ['./user-activity-list.component.css']
})
export class UserActivityListComponent implements OnInit {

  constructor(private service: CrudServiceService, private shared: SharedServiceService) { }
  activities: any[] = [];
  userId: string = this.shared.getUserIdFromToken();


  ngOnInit(): void {
    this.service.getActivitiesByUser(this.userId).subscribe((data: any[]) => {
      this.activities = data;
    });
  }

}
