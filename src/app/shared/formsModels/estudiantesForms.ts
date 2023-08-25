import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EstudiantesForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      Estudiante_Id: ['', [Validators.required, Validators.maxLength(9)]],
      Genero: ['', [Validators.required]],
      Fecha_Nacimiento: [Date.now, [Validators.required]],
      Telefono: [
        0,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      Telefono2: [0, [Validators.minLength(8), Validators.maxLength(8)]],
      Correo_Electronico: ['', [Validators.required, Validators.email]],
      Distrito_Id: [0, [Validators.required]],
      Direccion_Exacta_Procedencia: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(150),
        ],
      ],
      Direccion_Exacta_Tiempo_Lectivo: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(150),
        ],
      ],
      Nacionalidad: ['', [Validators.required]],
      Colegio_Procedencia: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(50),
        ],
      ],
      Ano_Graduacion_Secundaria: [
        0,
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      Estado: true,
    });
  }
}
