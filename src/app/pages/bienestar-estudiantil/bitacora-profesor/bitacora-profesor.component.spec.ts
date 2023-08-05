import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraProfesorComponent } from './bitacora-profesor.component';

describe('BitacoraProfesorComponent', () => {
  let component: BitacoraProfesorComponent;
  let fixture: ComponentFixture<BitacoraProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BitacoraProfesorComponent]
    });
    fixture = TestBed.createComponent(BitacoraProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
