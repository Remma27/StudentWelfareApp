import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCitaComponent } from './estado-cita.component';

describe('EstadoCitaComponent', () => {
  let component: EstadoCitaComponent;
  let fixture: ComponentFixture<EstadoCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoCitaComponent]
    });
    fixture = TestBed.createComponent(EstadoCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
