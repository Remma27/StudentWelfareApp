import { Component, Inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    { value: '1', viewValue: 'Costarricense' },
    { value: '2', viewValue: 'Extranjero' },
  ];

  constructor(
    public estudianteForm: EstudiantesForm,
    private srvEstudiante: EstudiantesService,
    private mensajeria: ToastrService
  ) {}
}
