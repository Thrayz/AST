import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challenge-update',
  templateUrl: './challenge-update.component.html',
})
export class ChallengeUpdateComponent implements OnInit {
  challenge: any = {};

  constructor(private crudService: CrudServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.crudService.getChallenge(id).subscribe((challenge) => {
      this.challenge = challenge;
    });
  }

  updateChallenge() {
    this.crudService.updateChallenge(this.challenge).subscribe((challenge) => {
   
    });
  }
}
