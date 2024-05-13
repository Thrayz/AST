import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudServiceService } from 'src/app/_services/crud-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-team-update',
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.css']
})
export class TeamUpdateComponent implements OnInit {
  teamId!: number;
  team: any;

  constructor(private route: ActivatedRoute, private crudService: CrudServiceService, private router: Router) { }

  ngOnInit(): void {
  
      const id = this.route.snapshot.params['id'];
      this.crudService.getTeam(this.teamId).subscribe(team => {
        this.team = team;
      });
  
  }

  updateTeam(team: any): void {
    this.crudService.updateTeam(team).subscribe(() => {
      this.router.navigate(['/teams']);
    });
  }
}
