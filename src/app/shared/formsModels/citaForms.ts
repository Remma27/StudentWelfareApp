import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CitaForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      Estudiante_Id: [0, [Validators.required, Validators.maxLength(9)]],
      Encargado_Nombre: ['', [Validators.required, Validators.maxLength(20)]],
      Observacion_Cita: ['', [Validators.required]],
      Fecha_Cita: ['', [Validators.required]],
      Estado: ['Confirmada'],
    });
  }
}
