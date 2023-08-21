import { Component, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ToastrService } from 'ngx-toastr';
import { ReportesService } from 'src/app/shared/services/reportes.service';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { AdminReportesComponent } from './admin-reportes/admin-reportes.component';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {
  @ViewChild('opcios')
  opcios!: MatSelectionList;

  opciones: string[] = ['Por tipo de problema atendido',
    'Por genero', 'Por edad', 'Por zona de procedencia',
    'Por rango de fecha', 'Recursos invertidos, como apoyos tecnicos',
    'Combinacion de todos los anteriores'];

  constructor(private msj: ToastrService,
    private srvReportes: ReportesService,
    public dialog: MatDialog) { }

  abrirDialog() {
    if (this.opcios.selectedOptions.hasValue()) {
      const opcSeleccionada = this.opcios.selectedOptions.selected[0].value;
      const dialogo = this.dialog.open(AdminReportesComponent, {
        width: '1500px',
        height: '600px',
        data: { opcion: opcSeleccionada }
      });
      dialogo.afterClosed().subscribe((data) => {
        console.log(data);
        if (data) {
          // Realizar acciones después de cerrar el diálogo si es necesario
        }
      });
    } else {
      this.msj.error('Por favor, seleccione una opción antes de continuar.');
    }
  }
}
