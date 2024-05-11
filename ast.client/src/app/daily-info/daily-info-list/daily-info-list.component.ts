import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service';

@Component({
  selector: 'app-daily-info-list',
  templateUrl: './daily-info-list.component.html',
  styleUrls: ['./daily-info-list.component.css']
})
export class DailyInfoListComponent implements OnInit {

  dailyInfos: any[] = [];

  constructor(private service: CrudServiceService) { }

  ngOnInit(): void {
    this.getDailyInfos();
  }

  getDailyInfos(): void {
    this.service.getDailyInfoList()
      .subscribe(
        (response: any[]) => {
          this.dailyInfos = response;
        },
        (error: any) => {
          console.log(error);
        });
  }

  deleteDailyInfo(id: number): void {
    this.service.deleteDailyInfo(id)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.getDailyInfos();
        },
        (error: any) => {
          console.log(error);
        });
  }
}
