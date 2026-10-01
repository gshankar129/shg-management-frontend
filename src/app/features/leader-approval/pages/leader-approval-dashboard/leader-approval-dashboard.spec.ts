import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderApprovalDashboard } from './leader-approval-dashboard';

describe('LeaderApprovalDashboard', () => {
  let component: LeaderApprovalDashboard;
  let fixture: ComponentFixture<LeaderApprovalDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderApprovalDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderApprovalDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
