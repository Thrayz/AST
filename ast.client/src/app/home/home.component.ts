import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../_services/shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sharedService: SharedServiceService) { }

  ngOnInit(): void {
    this.sharedService.getUserRoleFromToken();
  }

}
