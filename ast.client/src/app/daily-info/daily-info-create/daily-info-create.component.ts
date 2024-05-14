import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../../_services/crud-service.service';


@Component({
  selector: 'app-daily-info-create',
  templateUrl: './daily-info-create.component.html',
  styleUrls: ['./daily-info-create.component.css']
})
export class DailyInfoCreateComponent implements OnInit {

  dailyInfo = {
    date: '',
    weight: '',
    caloriesIntake: '',
    userId: 'a86ccff4-37e7-485a-aa65-14c5e765a4be'
  };

  constructor(private service: CrudServiceService) { }

  ngOnInit(): void {
  }

createDailyInfo(): void {
    this.service.addDailyInfo(this.dailyInfo)
      .subscribe(
          (response: any) => {
          console.log(response);
        },
          (error: any) => {
          console.log(error);
        });
  }


}
