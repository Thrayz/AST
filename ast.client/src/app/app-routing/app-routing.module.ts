import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ChatComponent } from '../chat/chat.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ActivityListComponent } from '../Activity/activity-list/activity-list.component';
import { HeaderComponent } from '../header/header.component';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'users', component: UserListComponent },
  { path: 'Activities', component: ActivityListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
