import { Component, Inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesForm } from 'src/app/shared/formsModels/estudiantesForms';
import { EstudiantesService } from 'src/app/shared/services/estudiantes.service';

<<<<<<< Updated upstream


interface informacion {
=======
interface bitacora {
>>>>>>> Stashed changes
  value: string;
  viewValue: string;
}

<<<<<<< Updated upstream
interface  nacimiento {
  value: string;
  viewValue: string;
} 

=======
>>>>>>> Stashed changes
@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss'],
})
export class InformacionPersonalComponent {
<<<<<<< Updated upstream
  
 

  informacion: informacion[] = [
    {value: '1', viewValue: 'I Cuatrimestre'},
    {value: '2', viewValue: 'II Cuatrimestre'},
    {value: '3', viewValue: 'III Cuatrimestre'},
  ];

  nacimiento: nacimiento[] = [
    {value: '1', viewValue: 'Costarricense'},
    {value: '2', viewValue: 'Extranjero'},
  
  ];

  
=======
  bitacora: bitacora[] = [
    {value: '1', viewValue: 'I cuatrimestre'},
    {value: '2', viewValue: 'II cuatrimestre'},
    {value: '3', viewValue: 'III cuatrimestre'},
  ];
  titulo = 'Informacion Personal';
  isCreate: boolean = true;
>>>>>>> Stashed changes
  constructor(
    public estudianteForm: EstudiantesForm,
    private srvEstudiante: EstudiantesService,
    private mensajeria: ToastrService
<<<<<<< Updated upstream
  ) {}
  
 
 


=======
  ) { }



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
>>>>>>> Stashed changes
}


