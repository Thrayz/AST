import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { StatsService } from '../../_services/stats.service'; 

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {
  lineChartData: ChartDataset<'line'>[] = [];
  lineChartLabels: string[] = []; 
  lineChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(private statsService: StatsService) { } 

  ngOnInit(): void {
    this.statsService.getDailyInfoByUserId('a86ccff4-37e7-485a-aa65-14c5e765a4be').subscribe((data: any[]) => { 
      this.lineChartData = [
        { data: data.map(dailyInfo => dailyInfo.weight), label: 'Weight' }
      ];
      this.lineChartLabels = data.map(dailyInfo => new Date(dailyInfo.date).toLocaleDateString());
    });
  }
}
