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
  dataSource = new MatTableDataSource();

  constructor(
    private srvCitas: CitaService,
    private mensajeria: ToastrService
  ) {}

  ngOnInit() {
    this.cargarlista();
  }

  cargarlista() {
    this.srvCitas.getAll().subscribe(
      (datos) => {
        this.dataSource.data = datos;
      },
      (error) => {
        this.mensajeria.error('No hay datos');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
