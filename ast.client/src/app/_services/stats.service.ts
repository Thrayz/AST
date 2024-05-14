import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'https://localhost:7122/api'; 

  constructor(private http: HttpClient) { }


  //Get daily info, basically weight and calories intake of a single user
  getDailyInfoByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/dailyInfo/GetDailyInfoByUserId/${userId}`);
  }

  //Get the same info for a whole team, to be averaged out 
  getDailyInfoByTeamId(teamId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetDailyInfoByTeamId/${teamId}`);
  }

  //Get Activity info for a single user
getActivityInfoByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities/user/${userId}`);
}

  //get all activities for all users
  getActivities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities`);
  }

  //Get Activity info for a whole team
  getActivityInfoByTeamId(teamId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities/team/${teamId}`);
  }


}
