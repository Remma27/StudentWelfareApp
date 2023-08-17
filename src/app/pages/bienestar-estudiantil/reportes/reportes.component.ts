import { Component, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ToastrService } from 'ngx-toastr';
import { ReportesService } from 'src/app/shared/services/reportes.service';
import { saveAs } from 'file-saver';

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
    private srvReportes: ReportesService) { }

  continuar() {
    const opcSeleccionada = this.opcios.selectedOptions.selected[0];

    if (opcSeleccionada) {
      console.log('Opción seleccionada:', opcSeleccionada.value);

      this.srvReportes.getReporte(opcSeleccionada.value).subscribe(
        (data: any) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const fileName = 'reporte.pdf';
          saveAs(blob, fileName);
        },
        (error) => {
          console.error('Error al obtener el reporte:', error);
          this.msj.error('Error al obtener el reporte.');
        }
      );

    } else {
      this.msj.error('Por favor, seleccione una opción antes de continuar.');
    }
  }
}
