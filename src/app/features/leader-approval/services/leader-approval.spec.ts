import { TestBed } from '@angular/core/testing';

import { LeaderApproval } from './leader-approval';

describe('LeaderApproval', () => {
  let service: LeaderApproval;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderApproval);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
