import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesForm } from 'src/app/shared/formsModels/estudiantesForms';
import { Canton } from 'src/app/shared/models/canton';
import { Distrito } from 'src/app/shared/models/distrito';
import { Provincia } from 'src/app/shared/models/provincia';
import { CantonService } from 'src/app/shared/services/canton.service';
import { DistritoService } from 'src/app/shared/services/distrito.service';
import { EstudiantesService } from 'src/app/shared/services/estudiantes.service';
import { ProvinciaService } from 'src/app/shared/services/provincia.service';

interface Cuatrimestre {
  value: string;
  viewValue: string;
}

interface Nacionalidad {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss'],
})
export class InformacionPersonalComponent {
  provincias: Provincia[] = [];
  cantones: Canton[] = [];
  distritos: Distrito[] = [];

  Cuatrimestre: Cuatrimestre[] = [
    { value: '1', viewValue: 'I Cuatrimestre' },
    { value: '2', viewValue: 'II Cuatrimestre' },
    { value: '3', viewValue: 'III Cuatrimestre' },
  ];

  Nacionalidad: Nacionalidad[] = [
    { value: 'C', viewValue: 'Costarricense' },
    { value: 'E', viewValue: 'Extranjero' },
  ];

  constructor(
    public estudianteForm: EstudiantesForm,
    private srvEstudiantes: EstudiantesService,
    private srvProvincias: ProvinciaService,
    private srvCantones: CantonService,
    private srvDistritos: DistritoService,
    private mensajeria: ToastrService
  ) {}

  ngOnInit() {
    this.CargarDatos();
  }

  //En este metodo estamos almacenando los datos que tiene nuestra base de datos
  //Para llenar el array y imprimir la informacion en el HTML
  CargarDatos() {
    this.srvProvincias.getAll().subscribe((provincias) => {
      this.provincias = provincias;
    });

    this.srvCantones.getAll().subscribe((cantones) => {
      this.cantones = cantones;
    });

    this.srvDistritos.getAll().subscribe((distritos) => {
      this.distritos = distritos;
    });
  }

  guardar() {
    console.log(this.estudianteForm.baseForm.value);
    console.log(this.estudianteForm.baseForm.valid);
    if (this.estudianteForm.baseForm.valid) {
      this.srvEstudiantes.insert(this.estudianteForm.baseForm.value).subscribe(
        () => {
          this.estudianteForm.baseForm.reset();
          this.mensajeria.success('Sus datos se guardaron correctamente');
        },
        (error) => {
          this.mensajeria.error(error);
        }
      );
    } else {
      this.mensajeria.error('Se produjo un error guardando sus datos');
    }
  }
}
