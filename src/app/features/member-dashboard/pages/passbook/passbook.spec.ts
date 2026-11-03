import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Passbook } from './passbook';

describe('Passbook', () => {
  let component: Passbook;
  let fixture: ComponentFixture<Passbook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Passbook],
    }).compileComponents();

    fixture = TestBed.createComponent(Passbook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
