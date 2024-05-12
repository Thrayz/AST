import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'https://localhost:7122/api'; 

  constructor(private http: HttpClient) { }

  getDailyInfoByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/dailyInfo/GetDailyInfoByUserId/${userId}`);
  }

  getDailyInfoByTeamId(teamId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetDailyInfoByTeamId/${teamId}`);
  }
}
