import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service';
import { Router } from '@angular/router';
import * as e from 'express';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
})
export class ChallengeListComponent implements OnInit {
  challenges: any[] = [];
  userId: string = "5c174e52-756d-4e38-a16f-92924006e207";
  constructor(private crudService: CrudServiceService, private router: Router) { }

  ngOnInit() {
    this.crudService.getChallenges().subscribe((challenges) => {
      this.challenges = challenges;
    });
  }

  deleteChallenge(id: number) {
    this.crudService.deleteChallenge(id).subscribe(() => {
      this.challenges = this.challenges.filter((challenge) => challenge.id !== id);
    });
  }

  updateChallenge(challenge: any) {
    this.router.navigate(['/challenge-update', challenge.id]);
  }

  createChallenge() {
    this.router.navigate(['/challenge-create']);
  }

  joinChallenge(challengeId: number, userId: string) {
    this.crudService.addUserToChallenge(challengeId, userId).subscribe(() => {

      console.log('User joined challenge');
    }, error => {
      console.log(error);
    });
  }

  leaveChallenge(challengeId: number, userId: string) {
    this.crudService.removeUserFromChallenge(challengeId, userId).subscribe(() => {
      console.log('User left challenge');
    }, error => {
      console.log(error);
    });
  }
}
