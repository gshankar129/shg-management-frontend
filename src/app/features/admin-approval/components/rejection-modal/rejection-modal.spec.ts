import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionModal } from './rejection-modal';

describe('RejectionModal', () => {
  let component: RejectionModal;
  let fixture: ComponentFixture<RejectionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectionModal],
    }).compileComponents();

    fixture = TestBed.createComponent(RejectionModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
