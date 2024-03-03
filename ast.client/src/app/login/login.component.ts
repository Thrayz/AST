import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../_services/shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sharedService: SharedServiceService) { }

  ngOnInit(): void {
    
  }

  login(email: string, password: string, rememberMe: boolean) {
    console.log("Login method called"); 
    this.sharedService.login(email, password, rememberMe).subscribe(
      (response: any) => {
        console.log("Login successful");
      },
      (error: any) => {
        console.error("Login failed", error);
      }
    );
  }
  console() {
    console.log("Login method called");
  }

}
