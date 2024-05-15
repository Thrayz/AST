import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service';
import { SharedServiceService } from '../../_services/shared-service.service';

@Component({
  selector: 'app-userchallengelist',
  templateUrl: './userchallengelist.component.html',
  styleUrls: ['./userchallengelist.component.css']
})
export class UserchallengelistComponent implements OnInit {

  constructor(private crud: CrudServiceService, private shared: SharedServiceService) { }
  challenges: any = [];
  userId: string = '';

  ngOnInit(): void {
    this.userId = this.shared.getUserIdFromToken();

    this.crud.getChallengesByUserId(this.userId).subscribe((data: any) => {
      if (data && data.$values && Array.isArray(data.$values)) {
       
        this.challenges = data.$values.map((value: any) => value);
        console.log(this.challenges);
        this.calculateChallengeProgress();
      } else {
        console.error('Invalid data format:', data);
      }
    });
  }

  calculateChallengeProgress() {
    this.challenges.forEach((challenge: any) => {
      const startDate = new Date(challenge.StartDate);
      const endDate = new Date(challenge.EndDate);

      this.crud.getActivitiesByUser(this.userId).subscribe(
        (activities: any[]) => {
          let totalProgress = 0;
          console.log(activities);
          activities.forEach(activity => {
            const activityDate = new Date(activity.date);
            console.log(activityDate, startDate, endDate);
            if (activityDate >= startDate && activityDate <= endDate) {
              console.log('Activity is within challenge date range');
              if (challenge.ChallengeType == 'Distance') {
                console.log("yes");
                if (activity.distance && (activity.activityType == 'Running' || activity.activityType == 'Cycling' || activity.activityType == 'Walking')) {
                  console.log(activity.distance)
                  console.log(totalProgress += activity.distance);
                  totalProgress += activity.distance;
                }
              } else if (challenge.ChallengeType == 'Duration') {
                if (activity.duration && (activity.activityType == 'Running' || activity.activityType == 'Cycling' || activity.activityType == 'Walking')) {
                  console.log(totalProgress += activity.duration);
                  totalProgress += activity.duration;
                }
              } else if (challenge.ChallengeType == 'Calories Burned') {
                if (activity.caloriesBurned && (activity.activityType == 'Running' || activity.activityType == 'Cycling' || activity.activityType == 'Walking')) {
                  console.log(totalProgress += activity.caloriesBurned);
                  totalProgress += activity.caloriesBurned;
                }
              }
            }
          });

          const progressPercentage = (totalProgress / challenge.Target) * 100;

          challenge.progress = progressPercentage;
        },
        (error) => {
          console.error('Error calculating challenge progress:', error);
        }
      );
    });
  }

}
