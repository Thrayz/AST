import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGoalListComponent } from './user-goal-list.component';

describe('UserGoalListComponent', () => {
  let component: UserGoalListComponent;
  let fixture: ComponentFixture<UserGoalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGoalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
