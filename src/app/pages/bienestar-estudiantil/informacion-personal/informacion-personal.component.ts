import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesForm } from 'src/app/shared/formsModels/estudiantesForms';
import { EstudiantesService } from 'src/app/shared/services/estudiantes.service';

interface informacion {
  value: string;
  viewValue: string;
}

interface nacimiento {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss'],
})
export class InformacionPersonalComponent {
  informacion: informacion[] = [
    { value: '1', viewValue: 'I Cuatrimestre' },
    { value: '2', viewValue: 'II Cuatrimestre' },
    { value: '3', viewValue: 'III Cuatrimestre' },
  ];

  nacimiento: nacimiento[] = [
    { value: 'C', viewValue: 'Costarricense' },
    { value: 'E', viewValue: 'Extranjero' },
  ];

  constructor(
    public estudianteForm: EstudiantesForm,
    private srvEstudiantes: EstudiantesService,
    private mensajeria: ToastrService
  ) {}

  guardar() {
    if (this.estudianteForm.baseForm.valid) {
      this.srvEstudiantes.insert(this.estudianteForm.baseForm.value).subscribe(
        (dato) => {
          this.estudianteForm.baseForm.reset();
          this.mensajeria.success('Sus datos se guardaron correctamente');
        },
        (error) => {
          this.mensajeria.error('Se produjo un error guardando sus datos');
        }
      );
    } else {
      this.mensajeria.error('Se produjo un error guardando sus datos');
    }
  }
}
