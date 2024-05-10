import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JointServiceService {

  private ChallengeUrl = 'https://localhost:7122/api/Challenges';
  private TeamsUrl = 'https://localhost:7122/api/Teams';

  constructor(private http: HttpClient) { }



  addUserToTeam(teamId: number, userId: string): Observable<any> {
return this.http.post<any>(`${this.TeamsUrl}/${teamId}/AddUser/${userId}`, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }


  removeUserFromTeam(teamId: number, userId: string): Observable<any> {
return this.http.post<any>(`${this.TeamsUrl}/${teamId}/RemoveUser/${userId}`, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }


}
