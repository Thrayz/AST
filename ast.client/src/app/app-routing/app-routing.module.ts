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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
  { path: 'users', component: UserListComponent },
  { path: 'Activities', component: ActivityListComponent },
  { path: 'private-chat', component: PrivateChatComponent },
  { path: 'daily-info-create', component: DailyInfoCreateComponent },
{ path: 'daily-info-list', component: DailyInfoListComponent },
  { path: 'daily-info-update/:id', component: DailyInfoUpdateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
