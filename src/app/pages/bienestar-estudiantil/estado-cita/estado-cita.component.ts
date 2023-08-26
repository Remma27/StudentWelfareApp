import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
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

  progr = 'En Progreso';

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

  actualizarProgreso(): void {
    /*this.srvCitas.getByEstado('Confirmada').subscribe(
     (datos)=>{
       if(datos){
         let nuevoEstado={
           Estado:datos.Estado
         }
       }
     }
    )*/
  }


  actualizarCanceladas(): void {

  }

  actualizarCompletadas(): void {

  }
}
