import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionPsicologicaComponent } from './atencion-psicologica.component';

describe('AtencionPsicologicaComponent', () => {
  let component: AtencionPsicologicaComponent;
  let fixture: ComponentFixture<AtencionPsicologicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtencionPsicologicaComponent]
    });
    fixture = TestBed.createComponent(AtencionPsicologicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
