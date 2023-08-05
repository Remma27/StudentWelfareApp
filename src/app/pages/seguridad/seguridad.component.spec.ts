import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadComponent } from './seguridad.component';

describe('SeguridadComponent', () => {
  let component: SeguridadComponent;
  let fixture: ComponentFixture<SeguridadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguridadComponent]
    });
    fixture = TestBed.createComponent(SeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
