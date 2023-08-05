import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdecuacionCurricularComponent } from './adecuacion-curricular.component';

describe('AdecuacionCurricularComponent', () => {
  let component: AdecuacionCurricularComponent;
  let fixture: ComponentFixture<AdecuacionCurricularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdecuacionCurricularComponent]
    });
    fixture = TestBed.createComponent(AdecuacionCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
