import { Component } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service';

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
})
export class ChallengeCreateComponent {
  challenge = {
    challengeName: '',
    challengeDescription: '',
    challengeType: '',
    target: 0,
    targetReached: false,
    startDate: '',
    endDate: ''
  };

  constructor(private crudService: CrudServiceService) { }

  createChallenge() {
    this.crudService.addChallenge(this.challenge).subscribe((challenge) => {
  
    });
  }
}
