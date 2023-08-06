import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EstudiantesForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      Estudiante_Id: ['', [Validators.required, Validators.maxLength(9)]],
      Genero: ['', [Validators.required]],
      Fecha_Nacimiento: ['', [Validators.required]],
      Telefono: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      Telefono2: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
      ],
      Correo_Electronico: ['', [Validators.required, Validators.email]],
      Distrito_Id: ['', [Validators.required]],
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
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      Boleta_Matricula: ['', [Validators.required]],
      Foto_Cedula: ['', [Validators.required]],
      Estado: true,
    });
  }
}
