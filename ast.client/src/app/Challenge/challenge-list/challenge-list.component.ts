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

  async joinChallenge(challengeId: any) {
    try {
      const challengeUser = {
        userId: "a86ccff4-37e7-485a-aa65-14c5e765a4be", 
        challengeId: challengeId
      };

      await this.crudService.addUserToChallenge(challengeUser);
      console.log('User added to challenge');
     
    } catch (error) {
      console.error('Failed to add user to challenge:', error);
  
    }
  }

  async leaveChallenge(challengeId: any, userId: any) {
    try {
      await this.crudService.removeUserFromChallenge(challengeId, userId);
      console.log('User removed from challenge');
    
    } catch (error) {
      console.error('Failed to remove user from challenge:', error);
  
    }
  }

}
