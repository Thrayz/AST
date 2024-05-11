import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { UserchallengelistComponent } from './challenge/userchallengelist/userchallengelist.component';
import { UserGoalListComponent } from './goal/user-goal-list/user-goal-list.component';
import { UserActivityListComponent } from './activity/user-activity-list/user-activity-list.component';
import { UserDashboardComponent } from './Dashboard/user-dashboard/user-dashboard.component';


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
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
