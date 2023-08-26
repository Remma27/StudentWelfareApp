import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Citas } from 'src/app/shared/models/citas';
import { CitaService } from 'src/app/shared/services/cita.service';

@Component({
  selector: 'app-estado-cita',
  templateUrl: './estado-cita.component.html',
  styleUrls: ['./estado-cita.component.scss'],
})
export class EstadoCitaComponent {
  displayedColumns: string[] = [
    'Cita_Id',
    'Estudiante_Id',
    'Encargado_Nombre',
    'Observacion_Cita',
    'Fecha_Cita',
    'Acciones',
  ];

  displayedColumns2: string[] = [
    'Cita_Id',
    'Estudiante_Id',
    'Encargado_Nombre',
    'Observacion_Cita',
    'Fecha_Cita',
  ];
  confirmadas = new MatTableDataSource();
  progreso = new MatTableDataSource();
  Completada = new MatTableDataSource();
  Cancelada = new MatTableDataSource();

  constructor(
    private srvCitas: CitaService,
    private mensajeria: ToastrService
  ) { }

  ngOnInit() {
    this.cargarConfirmada();
    this.cargarProgreso();
    this.cargarCompletada();
    this.cargarCancelada();
  }

  cargarProgreso() {
    this.srvCitas.getByEstado('En Progreso').subscribe(
      (datos) => {
        this.progreso.data = datos;
        console.log(datos);
      },
      (error) => {
        this.mensajeria.error('No hay datos');
      }
    );
  }

  cargarCompletada() {
    this.srvCitas.getByEstado('Completada').subscribe(
      (datos) => {
        this.Completada.data = datos;
      },
      (error) => {
        this.mensajeria.error('No hay datos');
      }
    );
  }

  cargarCancelada() {
    this.srvCitas.getByEstado('Cancelada').subscribe(
      (datos) => {
        this.Cancelada.data = datos;
      },
      (error) => {
        this.mensajeria.error('No hay datos');
      }
    );
  }

  cargarConfirmada() {
    this.srvCitas.getByEstado('Confirmada').subscribe(
      (datos) => {
        this.confirmadas.data = datos;
      },
      (error) => {
        this.mensajeria.error('No hay datos');
      }
    );
  }

  actualizarProgreso(cita: any): void {
    const nuevoEstado = { Estado: 'En Progreso' };
    cita.Estado = nuevoEstado.Estado;

    this.srvCitas.update(cita).subscribe(
      (respuesta) => {
        this.mensajeria.success('Cita en progreso actualizada exitosamente.');
        this.cargarConfirmada();
        this.cargarProgreso();
      },
      (error) => {
        console.log(error);
        this.mensajeria.error('Error al actualizar la cita en progreso.');
      }
    );
  }

  actualizarCanceladas(cita: any): void {
    const nuevoEstado = { Estado: 'Cancelada' };
    cita.Estado = nuevoEstado.Estado;

    this.srvCitas.update(cita).subscribe(
      (respuesta) => {
        this.mensajeria.success('Cita cancelada exitosamente.');
        this.cargarCancelada();
      },
      (error) => {
        console.log(error);
        this.mensajeria.error('Error al cancelar la cita.');
      }
    );
  }

  actualizarCompletadas(cita: any): void {
    const nuevoEstado = { Estado: 'Completada' };
    cita.Estado = nuevoEstado.Estado

    this.srvCitas.update(cita).subscribe(
      (respuesta) => {
        this.mensajeria.success('Cita completada exitosamente.');
        this.cargarCompletada();
      },
      (error) => {
        console.log(error);
        this.mensajeria.error('Error al marcar la cita como completada.');
      }
    );
  }
}
