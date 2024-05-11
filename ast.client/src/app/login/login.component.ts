import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../_services/shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage: string | null = null;

  constructor(private sharedService: SharedServiceService) { }

  ngOnInit(): void {
    
  }
  showModal: boolean = false;
  showLoginForm: boolean = true;

  showLogin() {
    this.showLoginForm = true;
  }

  showRegister() {
    this.showLoginForm = false;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  login(email: string, password: string, rememberMe: boolean) {
    console.log("Login method called"); 
    this.sharedService.login(email, password, rememberMe).subscribe(
      (response: any) => {
        console.log("Login successful");
        
      },
      (error: any) => {
        console.error("Login failed", error);
        this.errorMessage = error.error.message || "Login failed";
      }
    );
  }
  console() {
    console.log("Login method called");
  }

}
