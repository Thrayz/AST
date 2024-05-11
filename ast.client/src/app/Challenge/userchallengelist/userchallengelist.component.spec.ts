import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserchallengelistComponent } from './userchallengelist.component';

describe('UserchallengelistComponent', () => {
  let component: UserchallengelistComponent;
  let fixture: ComponentFixture<UserchallengelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserchallengelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserchallengelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
