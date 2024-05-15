import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'
import { SharedServiceService } from '../../_services/shared-service.service';
import { StatsService } from '../../_services/stats.service';




@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  

  // A lot going on here ik 
  public lineBigDashboardChartType: any;
  public gradientStroke: any;
  public chartColor: any;
  public canvas : any;
  public ctx: any;
  public gradientFill: any;
  public lineBigDashboardChartData!:Array<any>;
  public lineBigDashboardChartOptions:any;
  public lineBigDashboardChartLabels!:Array<any>;
  public lineBigDashboardChartColors!:Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType: any;
  public lineChartData!:Array<any>;
  public lineChartOptions:any;
  public lineChartLabels!:Array<any>;
  public lineChartColors!:Array<any>

  public lineChartWithNumbersAndGridType: any;
  public lineChartWithNumbersAndGridData!:Array<any>;
  public lineChartWithNumbersAndGridOptions:any;
  public lineChartWithNumbersAndGridLabels!:Array<any>;
  public lineChartWithNumbersAndGridColors!:Array<any>

  public lineChartGradientsNumbersType: any;
  public lineChartGradientsNumbersData!:Array<any>;
  public lineChartGradientsNumbersOptions:any;
  public lineChartGradientsNumbersLabels!:Array<any>;
  public lineChartGradientsNumbersColors!:Array<any>
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  public hexToRGB(hex: any, alpha: any) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(private statsService: StatsService, private sharedService: SharedServiceService ) { }
  userId: any = this.sharedService.getUserIdFromToken();
  ngOnInit() {
    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
    this.statsService.getDailyInfoByUserId('a86ccff4-37e7-485a-aa65-14c5e765a4be').subscribe((data: any[]) => { 
    this.lineBigDashboardChartData = [
        {
          label: "Your weight",

          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,

          borderWidth: 2,
        data: data.map(dailyInfo => dailyInfo.weight),

          backgroundColor: "#367491",
         borderColor: this.chartColor,
         pointBorderColor: this.chartColor,
         pointBackgroundColor: "#2c2c2c",
         pointHoverBackgroundColor: "#2c2c2c",
         pointHoverBorderColor: this.chartColor,
          
        }
      ];
      this.lineBigDashboardChartColors = [
       {
         backgroundColor: this.gradientFill,
         borderColor: this.chartColor,
         pointBorderColor: this.chartColor,
         pointBackgroundColor: "#2c2c2c",
         pointHoverBackgroundColor: "#2c2c2c",
         pointHoverBorderColor: this.chartColor,
       }
     ];
      this.lineBigDashboardChartLabels = data.map(dailyInfo => new Date(dailyInfo.date).toLocaleDateString());
    this.lineBigDashboardChartOptions = {

          layout: {
              padding: {
                  left: 20,
                  right: 20,
                  top: 0,
                  bottom: 0
              }
          },
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: '#fff',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
          },
          legend: {
              position: "bottom",
              fillStyle: "#FFF",
              display: false
          },
          scales: {
              yAxes: [{
                  ticks: {
                      fontColor: "rgba(255,255,255,0.4)",
                      fontStyle: "bold",
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      padding: 10
                  },
                  gridLines: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: "rgba(255,255,255,0.1)",
                      zeroLineColor: "transparent"
                  }

              }],
              xAxes: [{
                  gridLines: {
                      zeroLineColor: "transparent",
                      display: false,

                  },
                  ticks: {
                      padding: 10,
                      fontColor: "rgba(255,255,255,0.4)",
                      fontStyle: "bold"
                  }
              }]
          }
    };

    this.lineBigDashboardChartType = 'line';

    });
  
    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
              stepSize: 500
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.canvas = document.getElementById("lineChartExample");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    this.statsService.getActivityInfoByUserId(this.userId).subscribe((data: any[]) => {
      this.lineChartData = [
        {
          label: "Activity Duration",
          data: data.map(activity => activity.duration),
          borderColor: "#f96332",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#f96332",
          fill: true,
          borderWidth: 2
        }
      ];

   

      this.lineChartColors = [
       {
         borderColor: "#f96332",
         pointBorderColor: "#FFF",
         pointBackgroundColor: "#f96332",
         backgroundColor: this.gradientFill
       }
     ];
    this.lineChartLabels = data.map(activity => new Date(activity.date).toLocaleDateString());
    this.lineChartOptions = this.gradientChartOptionsConfiguration;

    this.lineChartType = 'line';
    });
    this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#18ce0f');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));
    this.statsService.getActivityInfoByUserId(this.userId).subscribe((data: any[]) => { 
    this.lineChartWithNumbersAndGridData = [
        {
         
           pointBorderWidth: 2,
           pointHoverRadius: 4,
           pointHoverBorderWidth: 1,
           pointRadius: 4,
           fill: true,
           borderWidth: 2,
        label: "Calories Burned",
        data: data.map(activity => activity.caloriesBurned), 
          borderColor: "#18ce0f",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#18ce0f",
          backgroundColor: this.gradientFill
        }
      ];
      this.lineChartWithNumbersAndGridColors = [
       {
         borderColor: "#18ce0f",
         pointBorderColor: "#FFF",
         pointBackgroundColor: "#18ce0f",
         backgroundColor: this.gradientFill
       }
     ];
      this.lineChartWithNumbersAndGridLabels = data.map(activity => new Date(activity.date).toLocaleDateString());
    this.lineChartWithNumbersAndGridOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.lineChartWithNumbersAndGridType = 'line';
    });



    this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));

    this.statsService.getActivityInfoByUserId(this.userId).subscribe((data: any[]) => { 

    this.lineChartGradientsNumbersData = [
        {
        label: "Distance Covered",

          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
        data: data.map(activity => activity.distance), 
          backgroundColor: this.gradientFill,
          borderColor: "#2CA8FF",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#2CA8FF",
        }
      ];
    this.lineChartGradientsNumbersColors = [
     {
       backgroundColor: this.gradientFill,
       borderColor: "#2CA8FF",
       pointBorderColor: "#FFF",
       pointBackgroundColor: "#2CA8FF",
     }
   ];
      this.lineChartGradientsNumbersLabels = data.map(activity => new Date(activity.date).toLocaleDateString());
    this.lineChartGradientsNumbersOptions = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        responsive: 1,
        scales: {
          yAxes: [{
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false
            },
            ticks: {
                stepSize: 20
            }
          }],
          xAxes: [{
            display: 0,
            ticks: {
              display: false
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false
            }
          }]
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 15,
            bottom: 15
          }
        }
      }

      this.lineChartGradientsNumbersType = 'bar';

    });
  }
}
