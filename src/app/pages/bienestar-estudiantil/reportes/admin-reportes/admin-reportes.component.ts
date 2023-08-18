import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { tr } from 'date-fns/locale';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { Reportes } from 'src/app/shared/models/reportes';
import { ReportesService } from 'src/app/shared/services/reportes.service';

@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.scss']
})
export class AdminReportesComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  datosCargados = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { opcion: string },
    private srvReportes: ReportesService,
    private msj: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this.loadReportData();
  }

  loadReportData(): void {
    switch (this.data.opcion) {
      case 'Por tipo de problema atendido':
        this.srvReportes.getTipoDeProblema().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar.');
            }
          },
          (error) => {
            console.log(error);
            this.msj.error('Error al cargar los reportes.');
          }
        );
        break;
      case 'Por genero':
        this.srvReportes.getGenero().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          }, (error) => {
            console.log(error);
            this.msj.error('Error al cargar los reportes');
          }
        );
        break;
      case 'Por edad':
        this.srvReportes.getEdad().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          }, (error) => {
            console.log(error);
            this.msj.error('Error al cargar los reportes');
          }
        );
        break;
      case 'Por zona de procedencia':
        this.srvReportes.getZonaProcedencia().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          }, (error) => {
            console.log(error);
            this.msj.error('Error al cargar los reportes');
          }
        );
        break;
      case 'Por rango de fecha':
        this.srvReportes.getRangoFecha().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          }, (error) => {
            console.log(error);
            this.msj.error('Error al cargar los reportes');
          }
        );
        break;
      case 'Recursos invertidos, como apoyos tecnicos':
        this.srvReportes.getRecursosInvertidos().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          }, (error) => {
            console.log(error);
            this.msj.error('Error al cargar los reportes');
          }
        );
        break;
      case 'Combinacion de todos los anteriores':
        this.srvReportes.getCombinacion().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          }, (error) => {
            console.log(error);
            this.msj.error('Error al cargar los reportes');
          }
        );
        break;
      default:
        this.msj.warning('Opción de reporte no reconocida.');
        break;
    }
  }

  exportToCSV() {
    const csvData = this.dataSource.data.map(item => {
      return this.displayedColumns.map(col => item[col]).join(',');
    });

    const csvString = csvData.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'reporte.csv');
  }

}
