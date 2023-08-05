import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienestarEstudiantilComponent } from './bienestar-estudiantil.component';

describe('BienestarEstudiantilComponent', () => {
  let component: BienestarEstudiantilComponent;
  let fixture: ComponentFixture<BienestarEstudiantilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BienestarEstudiantilComponent]
    });
    fixture = TestBed.createComponent(BienestarEstudiantilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
