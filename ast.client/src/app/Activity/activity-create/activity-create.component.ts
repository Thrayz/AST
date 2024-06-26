import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudServiceService } from 'src/app/_services/crud-service.service';
import { SharedServiceService } from '../../_services/shared-service.service';





@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})
export class ActivityCreateComponent implements OnInit {
  activity: any = {
    activityType: '',
    distance: null,
    duration: null,
    date: '',
    pace: '',
    userId :''
  };
  activityTypes: string[] = ['Running', 'Walking', 'Cycling'];
  activityTypeRequirements: any[] = [  
    { name: 'Running', requiresDistance: true, requiresRouteMap: true, caloriesBurnedPerHour: 600 },
    { name: 'Walking', requiresDistance: true, requiresRouteMap: false, caloriesBurnedPerHour: 300 },
    { name: 'Cycling', requiresDistance: true, requiresRouteMap: true, caloriesBurnedPerHour: 500 }
  ];
  paces = [
    { label: 'Low', factor: 4 },
    { label: 'Medium', factor: 6 },
    { label: 'High', factor: 8 }
  ];

  constructor(private crudService: CrudServiceService, private router: Router, private sharedService: SharedServiceService) { }

  ngOnInit(): void {
  }

  createActivity() {

    const activityType = this.activity.activityType;
    const durationHours = this.activity.duration / 60; 
    const paceFactor = this.activity.pace;
    this.activity.userId = this.sharedService.getUserIdFromToken();
    const activityTypeRequirement = this.getActivityTypeRequirement(activityType);
    if (activityTypeRequirement) {
      const caloriesBurnedPerHour = activityTypeRequirement.caloriesBurnedPerHour;
      const caloriesBurned = caloriesBurnedPerHour * durationHours * paceFactor;
      this.activity.caloriesBurned = caloriesBurned;
    }

    this.crudService.addActivity(this.activity).subscribe(() => {
      this.router.navigate(['/activity-list']);
    }
    );
}

  getActivityTypeRequirement(type: string): any | undefined {
    return this.activityTypeRequirements.find(req => req.name === type);
  }
}
