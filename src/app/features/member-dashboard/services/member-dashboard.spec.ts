import { TestBed } from '@angular/core/testing';

import { MemberDashboard } from './member-dashboard';

describe('MemberDashboard', () => {
  let service: MemberDashboard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberDashboard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
