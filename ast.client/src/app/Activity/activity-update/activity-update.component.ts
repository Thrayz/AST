import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudServiceService } from 'src/app/_services/crud-service.service';

@Component({
  selector: 'app-activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.css']
})
export class ActivityUpdateComponent implements OnInit {
  activity: any = {};
  activityId!: number;

  constructor(private route: ActivatedRoute, private service: CrudServiceService) { }

  ngOnInit(): void {
    this.activityId = +this.route.snapshot.params['id'];
    this.getActivity(this.activityId);
  }

  getActivity(id: number) {
    this.service.getActivity(id).subscribe((response: any) => {
      this.activity = response;
    });
  }

  updateActivity() {
    this.service.updateActivity(this.activity).subscribe(() => {
      console.log('Activity updated successfully');
    });
  }

}
