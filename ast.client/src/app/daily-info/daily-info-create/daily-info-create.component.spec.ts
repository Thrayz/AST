import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInfoCreateComponent } from './daily-info-create.component';

describe('DailyInfoCreateComponent', () => {
  let component: DailyInfoCreateComponent;
  let fixture: ComponentFixture<DailyInfoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyInfoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyInfoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
