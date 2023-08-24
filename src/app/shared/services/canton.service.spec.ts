import { TestBed } from '@angular/core/testing';

import { CantonService } from './canton.service';

describe('CantonService', () => {
  let service: CantonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
