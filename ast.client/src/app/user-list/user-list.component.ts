import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedServiceService } from '../_services/shared-service.service';
import { Observable } from 'rxjs';
import { User } from '../Models/User'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  @Output() userSelected = new EventEmitter<User>();
  constructor(private userService: SharedServiceService) { }

  ngOnInit(): void {
    this.getUsers().subscribe((users: any[]) => {
      this.users = users;
      console.log(users);
    });
  }

  getUsers(): Observable<any[]> {
    return this.userService.getUsers();
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
    console.log('some cunt is selected hooray' + user.id);
  }
}
