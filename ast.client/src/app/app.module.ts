import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';





import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { UserListComponent } from './user-list/user-list.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { ActivityListComponent } from './Activity/activity-list/activity-list.component';
import { ActivityCreateComponent } from './Activity/activity-create/activity-create.component';
import { ActivityUpdateComponent } from './Activity/activity-update/activity-update.component';
import { ChallengeListComponent } from './Challenge/challenge-list/challenge-list.component';
import { ChallengeCreateComponent } from './Challenge/challenge-create/challenge-create.component';
import { ChallengeUpdateComponent } from './Challenge/challenge-update/challenge-update.component';
import { GoalListComponent } from './Goal/goal-list/goal-list.component';
import { GoalCreateComponent } from './Goal/goal-create/goal-create.component';
import { GoalUpdateComponent } from './Goal/goal-update/goal-update.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { DailyInfoCreateComponent } from './daily-info/daily-info-create/daily-info-create.component';
import { DailyInfoUpdateComponent } from './daily-info/daily-info-update/daily-info-update.component';
import { DailyInfoListComponent } from './daily-info/daily-info-list/daily-info-list.component';
import { UserchallengelistComponent } from './Challenge/userchallengelist/userchallengelist.component';
import { UserGoalListComponent } from './Goal/user-goal-list/user-goal-list.component';
import { UserActivityListComponent } from './Activity/user-activity-list/user-activity-list.component';
import { UserDashboardComponent } from './Dashboard/user-dashboard/user-dashboard.component';
import { UserStatsComponent } from './Dashboard/user-stats/user-stats.component';
import { GlobalStatsComponent } from './Dashboard/global-stats/global-stats.component';
import { TeamStatsComponent } from './Dashboard/team-stats/team-stats.component';
import { UserCalendarComponent } from './Dashboard/user-calendar/user-calendar.component';
import { TeamComponent } from './team/team.component';
import { TeamCreateComponent } from './Teams/team-create/team-create.component';
import { TeamUpdateComponent } from './Teams/team-update/team-update.component';
import { TeamListComponent } from './Teams/team-list/team-list.component';
import { MessageNotificationComponent } from './Notification/message-notification/message-notification.component';
import { DailyInfoNotificationComponent } from './Notification/daily-info-notification/daily-info-notification.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    UserListComponent,
    PrivateChatComponent,
    ActivityListComponent,
    ActivityCreateComponent,
    ActivityUpdateComponent,
    ChallengeListComponent,
    ChallengeCreateComponent,
    ChallengeUpdateComponent,
    GoalListComponent,
    GoalCreateComponent,
    GoalUpdateComponent,
    UserAccountComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SideNavComponent,
    JoinRoomComponent,
    DailyInfoCreateComponent,
    DailyInfoUpdateComponent,
    DailyInfoListComponent,
    UserchallengelistComponent,
    UserGoalListComponent,
    UserActivityListComponent,
    UserDashboardComponent,
    UserStatsComponent,
    GlobalStatsComponent,
    TeamStatsComponent,
    UserCalendarComponent,
    TeamComponent,
    TeamCreateComponent,
    TeamUpdateComponent,
    TeamListComponent,
    MessageNotificationComponent,
    DailyInfoNotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FullCalendarModule,
    ChartsModule,
    NgbDropdownModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      enableHtml: true,
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',

      tapToDismiss: true,
      toastClass: 'custom-toast'
    }),
SweetAlert2Module.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
