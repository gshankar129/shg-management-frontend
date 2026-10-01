import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalPassbook } from './digital-passbook';

describe('DigitalPassbook', () => {
  let component: DigitalPassbook;
  let fixture: ComponentFixture<DigitalPassbook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalPassbook],
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalPassbook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
