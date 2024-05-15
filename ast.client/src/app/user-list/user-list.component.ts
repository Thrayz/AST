import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedServiceService } from '../_services/shared-service.service';
import { Observable } from 'rxjs';
import { User } from '../Models/User'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  //a list of users for a private chat

  users: User[] = [];
  public id!: string;
  @Output() userSelected = new EventEmitter<User>();
  constructor(private userService: SharedServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers().subscribe((users: any[]) => {
      this.users = users;
      console.log(users);
    });
    this.getUserIdFromToken();
  }

  getUsers(): Observable<any[]> {
    return this.userService.getUsers();
  }


  getUserIdFromToken(): string {
    this.id = this.userService.getUserIdFromToken();
    return this.userService.getUserIdFromToken();

  }

  selectUser(user: User) {
    this.userSelected.emit(user);
    console.log('User selected: ' + user.id);

    // Navigate to private chat with user ID
    this.router.navigate(['/private-chat', user.id]);
  }
}
