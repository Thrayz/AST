import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service'; 
import { SharedServiceService } from '../../_services/shared-service.service';

@Component({
  selector: 'app-goal-create',
  templateUrl: './goal-create.component.html',
  styleUrls: ['./goal-create.component.css']
})
export class GoalCreateComponent implements OnInit {

  goal = { goalType: '', goalValue: 0, start: new Date(), finish: new Date(),  userId: ""  };

  constructor(private goalService: CrudServiceService, private sharedService: SharedServiceService) { }
  userId: string = '';

  ngOnInit(): void {
    this.userId = this.sharedService.getUserIdFromToken();
    this.goal.userId = this.userId;
  }

  addGoal(): void {
    this.goalService.addGoal(this.goal)
      .subscribe(() => this.goal = {  goalType: '', goalValue: 0, start: new Date(), finish: new Date(), userId: this.userId });
    console.log(this.userId);
    console.log(this.goal);
  }

 

}
