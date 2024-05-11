import { TestBed } from '@angular/core/testing';

import { JointServiceService } from './joint-service.service';

describe('JointServiceService', () => {
  let service: JointServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JointServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
