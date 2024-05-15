import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/_services/crud-service.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  activities: any[] = [];
  

  constructor(private service: CrudServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    this.service.getActivities().subscribe((response: any) => {
      this.activities = response;
    });
  }

  createActivity() {
    this.router.navigate(['/activity-create']);
    
  }

  updateActivity(activity: any) {
   this.router.navigate(['/activity-update', activity.id]);
  }

  deleteActivity(id: number) {
    this.service.deleteActivity(id).subscribe((response: any) => {
      // Reload activities after delete
      this.getActivities();
    });
  }
}
