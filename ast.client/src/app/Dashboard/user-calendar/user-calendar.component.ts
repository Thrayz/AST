import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

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

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.getDailyInfoByUserId('a86ccff4-37e7-485a-aa65-14c5e765a4be').subscribe((data: any[]) => {
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
