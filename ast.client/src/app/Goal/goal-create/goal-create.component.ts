import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service'; 

@Component({
  selector: 'app-goal-create',
  templateUrl: './goal-create.component.html',
  styleUrls: ['./goal-create.component.css']
})
export class GoalCreateComponent implements OnInit {

  goal = { id: 0, goalType: '', goalValue: 0, date: new Date(), userId: 0 };

  constructor(private goalService: CrudServiceService) { }
  ngOnInit(): void {
  }

  addGoal(): void {
    this.goalService.addGoal(this.goal)
      .subscribe(() => this.goal = { id: 0, goalType: '', goalValue: 0, date: new Date(), userId: 0 });
  }

 

}
