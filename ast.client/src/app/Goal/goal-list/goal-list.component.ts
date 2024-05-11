import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudServiceService } from '../../_services/crud-service.service';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  goals!: { id: number, goalType: string, goalValue: number, date: Date, userId: number }[];


  constructor(private goalService: CrudServiceService, private router: Router) { }

  ngOnInit() {
    this.getGoals();
  }

  getGoals(): void {
    this.goalService.getGoals()
      .subscribe(goals => this.goals = goals);
  }
  updateGoal(challenge: any) {
    this.router.navigate(['/goal-update', challenge.id]);
  }

  deleteGoal(id: number): void {
    this.goalService.deleteGoal(id)
      .subscribe(() => this.getGoals());
  }

}
