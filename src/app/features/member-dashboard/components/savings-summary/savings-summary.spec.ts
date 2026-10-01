import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsSummary } from './savings-summary';

describe('SavingsSummary', () => {
  let component: SavingsSummary;
  let fixture: ComponentFixture<SavingsSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingsSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(SavingsSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
