import { Component, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ToastrService } from 'ngx-toastr';

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
    'Por rango de fecha', 'Recursos compartidos como apoyos tecnicos',
    'Combinacion de todos los anteriores'];

  constructor(private msj: ToastrService) { }

  continuar() {
    const opcSeleccionada = this.opcios.selectedOptions.selected[0];

    if (opcSeleccionada) {
      console.log('Opción seleccionada:', opcSeleccionada.value);
    } else {
      this.msj.error('Por favor, seleccione una opción antes de continuar.');
    }
  }
}
