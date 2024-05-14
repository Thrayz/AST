import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { SharedServiceService } from '../../_services/shared-service.service';

import { StatsService } from '../../_services/stats.service';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
  };

  constructor(private statsService: StatsService, private sharedService: SharedServiceService) { }
  private id: string = this.sharedService.getUserIdFromToken();
  ngOnInit(): void {
    this.statsService.getDailyInfoByUserId(this.id).subscribe((data: any[]) => {
      const events = data.map(dailyInfo => {
        return {
          start: dailyInfo.date,
          title: `Weight: ${dailyInfo.weight}, Calories: ${dailyInfo.caloriesIntake}`
        };
      });

     
      this.calendarOptions.events = events;
    });
  }
}
