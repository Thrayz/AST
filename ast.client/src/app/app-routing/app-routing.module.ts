import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ChatComponent } from '../chat/chat.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ActivityListComponent } from '../Activity/activity-list/activity-list.component';
import { PrivateChatComponent } from '../private-chat/private-chat.component';
import { DailyInfoCreateComponent } from '../daily-info/daily-info-create/daily-info-create.component';
import { DailyInfoListComponent } from '../daily-info/daily-info-list/daily-info-list.component';
import { DailyInfoUpdateComponent } from '../daily-info/daily-info-update/daily-info-update.component';
import { HomeComponent } from '../home/home.component';
import { ActivityUpdateComponent } from '../Activity/activity-update/activity-update.component';
import { ActivityCreateComponent } from '../Activity/activity-create/activity-create.component';
import { ChallengeListComponent } from '../Challenge/challenge-list/challenge-list.component';
import { ChallengeCreateComponent } from '../Challenge/challenge-create/challenge-create.component';
import { ChallengeUpdateComponent } from '../Challenge/challenge-update/challenge-update.component';
import { GoalListComponent } from '../Goal/goal-list/goal-list.component';
import { GoalCreateComponent } from '../Goal/goal-create/goal-create.component';
import { GoalUpdateComponent } from '../Goal/goal-update/goal-update.component';
import { UserCalendarComponent } from '../Dashboard/user-calendar/user-calendar.component';
import { UserStatsComponent } from '../Dashboard/user-stats/user-stats.component';
import { TeamListComponent } from '../Teams/team-list/team-list.component';
import { TeamCreateComponent } from '../Teams/team-create/team-create.component';
import { TeamUpdateComponent } from '../Teams/team-update/team-update.component';
import { UserGoalListComponent } from '../Goal/user-goal-list/user-goal-list.component';
import { UserchallengelistComponent } from '../Challenge/userchallengelist/userchallengelist.component'; 


import { SideNavComponent } from '../side-nav/side-nav.component';

import { UserDashboardComponent } from '../Dashboard/user-dashboard/user-dashboard.component';






const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'users', component: UserListComponent },
  { path: 'activity-list', component: ActivityListComponent },
{ path: 'private-chat/:id', component: PrivateChatComponent },
  { path: 'daily-info-create', component: DailyInfoCreateComponent },
{ path: 'daily-info-list', component: DailyInfoListComponent },
  { path: 'daily-info-update/:id', component: DailyInfoUpdateComponent },
{ path: 'challenge-list', component: ChallengeListComponent },
  { path: 'challenge-create', component: ChallengeCreateComponent },
  { path: 'challenge-update/:id', component: ChallengeUpdateComponent },
{ path: 'goal-list', component: GoalListComponent },
  { path: 'goal-create', component: GoalCreateComponent },
  { path: 'goal-update/:id', component: GoalUpdateComponent },
  { path: 'user-calendar', component: UserCalendarComponent },
  { path: 'user-stats', component: UserStatsComponent },
  { path: 'teams', component: TeamListComponent },
  { path: 'team-create', component: TeamCreateComponent },
  { path: 'team-update/:id', component: TeamUpdateComponent },
  { path: 'user-list', component: UserListComponent },
  { path: '', component: HomeComponent },
  { path: 'user-goal-list', component: UserGoalListComponent },
  { path: 'user-challenge-list', component: UserchallengelistComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'activity-update/:id', component: ActivityUpdateComponent },
  { path: 'activity-create', component: ActivityCreateComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
