import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/_services/crud-service.service';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})
export class ActivityCreateComponent implements OnInit {
  activity: any = {
    activityType: '',
    distance: '',
    duration: '',
    date: '',
    caloriesBurned: null,
    pace: null,
    routeMap: '',
    userId: ''
  };

  constructor(private service: CrudServiceService) { }

  ngOnInit(): void {

  }

  createActivity() {

    this.service.addActivity(this.activity).subscribe(() => {
      console.log('Activity created successfully');

    });
  }

}
