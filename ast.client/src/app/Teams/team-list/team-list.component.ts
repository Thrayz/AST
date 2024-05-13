import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudServiceService } from 'src/app/_services/crud-service.service';


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams$!: Observable<any[]>;

  constructor(private crudService: CrudServiceService, private router: Router) { }

  ngOnInit(): void {
    this.teams$ = this.crudService.getTeams();
  }


  navigateToUpdate(teamId: number): void {
this.router.navigate(['/team-update', teamId]);
  }
  navigateToCreate(): void {
this.router.navigate(['/team-create']);
  }

}
