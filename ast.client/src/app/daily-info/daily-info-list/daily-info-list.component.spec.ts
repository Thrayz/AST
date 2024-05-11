import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInfoListComponent } from './daily-info-list.component';

describe('DailyInfoListComponent', () => {
  let component: DailyInfoListComponent;
  let fixture: ComponentFixture<DailyInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyInfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
