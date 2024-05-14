import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../_services/shared-service.service';


@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
})
export class ChallengeListComponent implements OnInit {
  challenges: any[] = [];
  userId: string = '';
  challengeUser!: any;

  constructor(private crudService: CrudServiceService, private router: Router, private sharedService: SharedServiceService) { }

  ngOnInit() {
    this.userId = this.sharedService.getUserIdFromToken();
    this.crudService.getChallenges().subscribe((challenges) => {
      this.challenges = challenges;
      for (let challenge of this.challenges) {
        this.isThisUserInChallenge(challenge.id);
      }
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
        userId: this.userId,
        challengeId: challengeId
      };

      await this.crudService.addUserToChallenge(challengeUser);
      console.log('User added to challenge');
    } catch (error) {
      console.error('Failed to add user to challenge:', error);
    }
  }

  isThisUserInChallenge(challengeId: number) {
    this.crudService.getChallengeUser(challengeId, this.userId).subscribe(
      (challengeUser) => {
        // Store the ChallengeUser status for the current challenge
        if (challengeUser) {
          // If user is in the challenge, set a flag for that challenge
          this.challenges.find(challenge => challenge.id === challengeId).userInChallenge = true;
          console.log(this.challenges.find(challenge => challenge.id === challengeId).userInChallenge);
        } else {
          // If user is not in the challenge, set a flag for that challenge
          this.challenges.find(challenge => challenge.id === challengeId).userInChallenge = false;
        }
      },
      (error) => {
        if (error.status === 404) {
          // If the user is not in the challenge, set a flag for that challenge
          this.challenges.find(challenge => challenge.id === challengeId).userInChallenge = false;
        } else {
          // Handle other errors here, if needed
          console.error('Error fetching ChallengeUser:', error);
        }
      }
    );
  }




  async leaveChallenge(challengeId: any) {
    try {
      const challengeUser = await this.crudService.getChallengeUser(challengeId, this.userId).toPromise();
      if (challengeUser) {
        await this.crudService.removeUserFromChallenge(challengeUser.id).toPromise();
        console.log('User removed from challenge');
      } else {
        console.error('User is not in the challenge');
      }
    } catch (error) {
      console.error('Failed to remove user from challenge:', error);
    }
  }

}
