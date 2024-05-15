import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service';
import { SharedServiceService } from '../../_services/shared-service.service';

@Component({
  selector: 'app-user-goal-list',
  templateUrl: './user-goal-list.component.html',
  styleUrls: ['./user-goal-list.component.css']
})
export class UserGoalListComponent implements OnInit {
  /*
  goals = [
    { id: 1, goalType: 'Weight Loss', goalValue: 10, start: '2021-01-01', finish: '2021-12-31', userId: "a86ccff4-37e7-485a-aa65-14c5e765a4be", progress: 0 },
    { id: 2, goalType: 'Fitness', goalValue: 100, start: '2021-01-01', finish: '2021-12-31', userId: "a86ccff4-37e7-485a-aa65-14c5e765a4be", progress: 0 },
    { id: 3, goalType: 'Nutrition', goalValue: 2000, start: '2021-01-01', finish: '2021-12-31', userId: "a86ccff4-37e7-485a-aa65-14c5e765a4be", progress: 0 }
  ];*/

  goals: any = [];
  activities: any[] = [];
  dailyInfo: any[] = [];
  userId: string = '';

  constructor(private crud: CrudServiceService, private shared: SharedServiceService) { }

  ngOnInit(): void {
    this.userId = this.shared.getUserIdFromToken();

    this.crud.getGoalsByUser(this.userId).subscribe((data: any[]) => {
      
      this.goals = data;
      this.calculateProgress();
    }
);

    this.crud.getActivitiesByUser(this.userId).subscribe((data: any[]) => {
      this.activities = data;
      this.calculateProgress();
    });
    this.crud.getDailyInfoByUserId(this.userId).subscribe((data: any[]) => {
      this.dailyInfo = data;
      console.log(this.dailyInfo);
      this.calculateProgress();
    });

    this.calculateProgress();
  }

  calculateProgress(): void {
    if (!this.dailyInfo || !this.activities) return;

    this.goals.forEach((goal: { start: string | number | Date; finish: string | number | Date; userId: any; goalType: string; progress: number; goalValue: number; }) => {
      const startDate = new Date(goal.start);
      const endDate = new Date(goal.finish);
      const userId = goal.userId;

      let userDailyInfo = [];
      let userActivities = [];

      for (const info of this.dailyInfo) {
        const infoDate = new Date(info.date);
        if (info.userId === userId && infoDate >= startDate && infoDate <= endDate) {
          userDailyInfo.push(info);
          console.log(userDailyInfo);
        }
      }

     
      for (const activity of this.activities) {
        const activityDate = new Date(activity.date);
        if (activity.userId === userId && activityDate >= startDate && activityDate <= endDate) {
          userActivities.push(activity);
        }
      }

      if (goal.goalType === 'Weight Loss') {
        let startWeight = null;
        let endWeight = null;

  
        if (userDailyInfo.length > 0) {
          startWeight = userDailyInfo[0].weight;
        }

  
        for (const info of userDailyInfo) {
          if (info.weight !== null) {
            endWeight = info.weight;
            goal.progress = (startWeight - endWeight) / goal.goalValue * 100;
          }
        }

      } else if (goal.goalType === 'Fitness') {
        let totalDistanceCovered = 0;
        userActivities.forEach(activity => {
          if (activity.distance) {
            totalDistanceCovered += activity.distance;
          }
        });
        goal.progress = totalDistanceCovered / goal.goalValue * 100;
      } else if (goal.goalType === 'Nutrition') {
        let totalCaloriesIntake = 0;
        userDailyInfo.forEach(info => {
          totalCaloriesIntake += info.caloriesIntake;
          console.log(totalCaloriesIntake);
          console.log(info.caloriesIntake);
        });
        goal.progress = totalCaloriesIntake / goal.goalValue * 100;
      }
    });
  }
}
