import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesForm } from 'src/app/shared/formsModels/estudiantesForms';
import { EstudiantesService } from 'src/app/shared/services/estudiantes.service';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss'],
})
export class InformacionPersonalComponent {
  titulo = 'Informacion Personal';
  isCreate: boolean = true;
  constructor(
    public estudianteForm: EstudiantesForm,
    private srvEstudiantes: EstudiantesService,
    @Inject(MAT_DIALOG_DATA) public data: { estudiante: any },
    private mensajeria: ToastrService
  ) {}

  ngOnInit() {
    if (this.data?.estudiante) {
      this.isCreate = false;
      this.titulo = 'Modificar Informacion Personal';
      this.cargarDatosForm();
    } else {
      this.isCreate = true;
      this.titulo = 'Informacion Personal';
    }
  }

  cargarDatosForm() {
    this.estudianteForm.baseForm.patchValue({
      Boleta_Matricula: this.data.estudiante.Boleta_Matricula,
      Estudiante_Id: this.data.estudiante.Estudiante_Id,
      Genero: this.data.estudiante.Genero,
      Fecha_Nacimiento: this.data.estudiante.Fecha_Nacimiento,
      Telefono: this.data.estudiante.Telefono,
      Telefono2: this.data.estudiante.Telefono2,
      Correo_Electronico: this.data.estudiante.Correo_Electronico,
      Distrito_Id: this.data.estudiante.Distrito_Id,
      Direccion_Exacta_Procedencia:
        this.data.estudiante.Direccion_Exacta_Procedencia,
      Direccion_Exacta_Tiempo_Lectivo:
        this.data.estudiante.Direccion_Exacta_Tiempo_Lectivo,
      Nacionalidad: this.data.estudiante.Nacionalidad,
      Colegio_Procedencia: this.data.estudiante.Colegio_Procedencia,
      Foto_Cedula: this.data.estudiante.Foto_Cedula,
      estado: true,
    });
  }

  guardar() {
    if (this.estudianteForm.baseForm.valid) {
      if (this.isCreate) {
        this.srvEstudiantes
          .insert(this.estudianteForm.baseForm.value)
          .subscribe(
            (dato) => {
              this.estudianteForm.baseForm.reset();
              this.mensajeria.success('Se guardó correctamente');
            },
            (error) => {
              this.mensajeria.error('Error al guardar');
            }
          );
      } else {
        this.srvEstudiantes
          .update(this.estudianteForm.baseForm.value)
          .subscribe(
            (dato) => {
              this.estudianteForm.baseForm.reset();
              this.mensajeria.success('Se modificó correctamente');
            },
            (error) => {
              this.mensajeria.error('Error al modificar');
            }
          );
      }
    }
  }
}
