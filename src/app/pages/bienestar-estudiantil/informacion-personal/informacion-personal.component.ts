import { Component, Inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesForm } from 'src/app/shared/formsModels/estudiantesForms';
import { EstudiantesService } from 'src/app/shared/services/estudiantes.service';

interface bitacora {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss'],
})
export class InformacionPersonalComponent {
  bitacora: bitacora[] = [
    { value: '1', viewValue: 'I cuatrimestre' },
    { value: '2', viewValue: 'II cuatrimestre' },
    { value: '3', viewValue: 'III cuatrimestre' },
  ];
  titulo = 'Informacion Personal';
  isCreate: boolean = true;
  constructor(
    public estudianteForm: EstudiantesForm,
    private srvEstudiante: EstudiantesService,
    private mensajeria: ToastrService
  ) {}

  guardar() {
    this.srvEstudiante.insert(this.estudianteForm.baseForm.value).subscribe(
      (dato) => {
        console.log(dato);
        this.mensajeria.success('¡Guardado correctamente!');
        this.estudianteForm.baseForm.reset();
        window.location.reload();
      },
      (error) => {
        console.error('Error al guardar:', error);
        this.mensajeria.error('Error al guardar');
      }
    );
  }
}
