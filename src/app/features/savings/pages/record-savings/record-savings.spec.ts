import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSavings } from './record-savings';

describe('RecordSavings', () => {
  let component: RecordSavings;
  let fixture: ComponentFixture<RecordSavings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordSavings],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordSavings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
