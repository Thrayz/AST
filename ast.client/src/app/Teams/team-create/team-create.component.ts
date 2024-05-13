import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudServiceService } from 'src/app/_services/crud-service.service';


@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {
  team: any = { teamName: '' };

  constructor(private crudService: CrudServiceService, private router: Router) { }
  ngOnInit(): void {
  }


  createTeam(team: any): void {
    this.crudService.addTeam(team).subscribe(() => {
      this.router.navigate(['/teams']);
    });
  }
}
