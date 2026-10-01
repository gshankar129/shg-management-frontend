import { TestBed } from '@angular/core/testing';

import { LoanManagement } from './loan-management';

describe('LoanManagement', () => {
  let service: LoanManagement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanManagement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
