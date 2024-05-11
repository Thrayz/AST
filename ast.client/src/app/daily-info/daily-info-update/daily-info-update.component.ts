import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudServiceService } from '../../_services/crud-service.service';

@Component({
  selector: 'app-daily-info-update',
  templateUrl: './daily-info-update.component.html',
  styleUrls: ['./daily-info-update.component.css']
})
export class DailyInfoUpdateComponent implements OnInit {

  dailyInfo: any = {};

  constructor(
    private service: CrudServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDailyInfo(this.route.snapshot.params['id']);
  }

  getDailyInfo(id: number): void {
    this.service.getDailyInfo(id)
      .subscribe(
        (response: any) => {
          this.dailyInfo = response;
        },
        (error: any) => {
          console.log(error);
        });
  }

  updateDailyInfo(): void {
    this.service.updateDailyInfo(this.dailyInfo)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/daily-info-list']);
        },
        (error: any) => {
          console.log(error);
        });
  }
}
