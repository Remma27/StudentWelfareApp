import { TestBed } from '@angular/core/testing';

import { BitacoraServices } from './bitacora.service';

describe('BitacoraService', () => {
  let service: BitacoraServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitacoraServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
