import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/_services/crud-service.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  activities: any[] = [];

  constructor(private service: CrudServiceService) { }

  ngOnInit(): void {
    this.getActivities();
   
  }

  getActivities() {
    this.service.getActivities().subscribe((response: any) => {
      this.activities = response;
    });
  }

}
