import { TestBed } from '@angular/core/testing';

import { Shg } from './shg';

describe('Shg', () => {
  let service: Shg;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shg);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
