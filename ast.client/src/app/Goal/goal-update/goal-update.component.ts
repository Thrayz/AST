import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudServiceService } from 'src/app/_services/crud-service.service'; 

@Component({
  selector: 'app-goal-update',
  templateUrl: './goal-update.component.html',
  styleUrls: ['./goal-update.component.css']
})
export class GoalUpdateComponent implements OnInit {
  goal = { id: 0, goalType: '', goalValue: 0, date: new Date(), userId: 0 };

  constructor(
    private route: ActivatedRoute,
    private goalService: CrudServiceService
  ) { }

  ngOnInit() {
    this.getGoal();
  }

  getGoal(): void {
    const id = +this.route.snapshot.params['id'];
    this.goalService.getGoal(id)
      .subscribe(goal => this.goal = goal);
  }

  updateGoal(): void {
    this.goalService.updateGoal(this.goal)
      .subscribe(() => this.goal = { id: 0, goalType: '', goalValue: 0, date: new Date(), userId: 0 });
  }
}
