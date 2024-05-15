import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInfoNotificationComponent } from './daily-info-notification.component';

describe('DailyInfoNotificationComponent', () => {
  let component: DailyInfoNotificationComponent;
  let fixture: ComponentFixture<DailyInfoNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyInfoNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyInfoNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
