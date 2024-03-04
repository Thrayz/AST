import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../_services/shared-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public errorMessage: string | null = null;
  constructor(private sharedService: SharedServiceService) { }

  ngOnInit(): void {
  
  }

  register(email: string, password: string) {
   
    this.sharedService.register(email, password).subscribe(
        (      response: any) => {
      
        console.log("Registration successful");
      },
        (      error: any) => {
     
          console.error("Registration failed", error);
          this.errorMessage = error.error.message || "Registration failed";
      }
    );
  }
}
