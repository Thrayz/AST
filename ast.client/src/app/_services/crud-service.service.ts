import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {
  private apiUrl = 'https://localhost:7122/api/Activities';
  private apiUrl2 = 'https://localhost:7122/api/Goals';
  private apiUrl3 = 'https://localhost:7122/api/Challenges';
  private apiUrl4 = 'https://localhost:7122/api/Teams';
  private apiUrl5 = 'https://localhost:7122/api/SocialInteractions';
  private apiUrl6 = 'https://localhost:7122/api/DailyInfo';
  



  constructor(private http: HttpClient) { }

  getActivities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  } 

  addActivity(activity: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, activity)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  deleteActivity(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  updateActivity(activity: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${activity.id}`, activity)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getActivity(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }


  getActivitiesByUser(userId: string): Observable<any[]> {
return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getActivitiesPaginated(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paginated/${page}/${pageSize}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getGoals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  addGoal(goal: any): Observable<any> {
    return this.http.post<any>(this.apiUrl2, goal)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  deleteGoal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl2}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  updateGoal(goal: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl2}/${goal.id}`, goal)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getGoal(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

getGoalsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/user/${userId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getGoalsPaginated(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/paginated/${page}/${pageSize}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }


  getChallenges(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl3)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  addChallenge(challenge: any): Observable<any> {
    return this.http.post<any>(this.apiUrl3, challenge)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  deleteChallenge(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl3}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  updateChallenge(challenge: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl3}/${challenge.id}`, challenge)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getChallenge(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getChallengesPaginated(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}/paginated/${page}/${pageSize}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getTeams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl4)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }


  addTeam(team: any): Observable<any> {
    return this.http.post<any>(this.apiUrl4, team)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl4}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  updateTeam(team: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl4}/${team.id}`, team)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getTeam(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl4}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getTeamsPaginated(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl4}/paginated/${page}/${pageSize}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getSocialInteractions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl5)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  addSocialInteraction(socialInteraction: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5, socialInteraction)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  deleteSocialInteraction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl5}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  updateSocialInteraction(socialInteraction: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl5}/${socialInteraction.id}`, socialInteraction)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getSocialInteraction(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl5}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  getSocialInteractionsPaginated(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl5}/paginated/${page}/${pageSize}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }


  getDailyInfoList(): Observable<any[]> {
return this.http.get<any[]>(this.apiUrl6)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

addDailyInfo(dailyInfo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl6, dailyInfo)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
}

  deleteDailyInfo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl6}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  updateDailyInfo(dailyInfo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl6}/${dailyInfo.id}`, dailyInfo)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

getDailyInfo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl6}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
}
  async addUserToChallenge(challengeUser: any) {
    try {
      return this.http.post(`${this.apiUrl3}/addUserToChallenge`, challengeUser).toPromise();
    } catch (error: any) {
      throw new Error('Failed to add user to challenge: ' + error.message);
    }
  }

  getChallengeUser(challengeId: number, userId: string): Observable<any> {
    const url = `${this.apiUrl3}/GetChallengeUser/${challengeId}/${userId}`;
    return this.http.get<any>(url);
  }

  removeUserFromChallenge(id: any) {
    console.log(id)
    return this.http.delete<any>(`${this.apiUrl3}/removeUserFromChallenge/${id}`)
    .pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  getDailyInfoByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl6}/GetDailyInfoByUserId/${userId}`);
  }


  getAllChallengeUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl3}/GetallChallengeUsers`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }



  


  
}
