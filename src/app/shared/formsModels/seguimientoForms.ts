import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class SeguimientoForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      cita: ['', [Validators.required]],
      Resumen_Cita: ['', [Validators.required, Validators.minLength(8)]],
      Fecha_Correspondiente: ['', Validators.required],
      Otra_Cita: ['', Validators.required],
    });
  }
}
