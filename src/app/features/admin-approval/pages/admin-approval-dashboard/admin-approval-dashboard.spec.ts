import { TestBed } from '@angular/core/testing';
import { AdminApproval } from './admin-approval';

describe('AdminApproval', () => {
  let service: AdminApproval;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminApproval);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});