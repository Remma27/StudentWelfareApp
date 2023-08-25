import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { da, tr } from 'date-fns/locale';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { Reportes } from 'src/app/shared/models/reportes';
import { ReportesService } from 'src/app/shared/services/reportes.service';

@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.scss'],
})
export class AdminReportesComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  datosCargados = false;
  tituloReporte = undefined;

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
              //this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.displayedColumns = [
                'Estudiante_Id',
                'Telefono',
                'Telefono2',
                'Correo_Electronico',
                'Cita_Id',
                'Encargado_Nombre',
                'Fecha_Cita',
                'Seguimiento_Id',
                'Resumen_Cita',
                'Fecha_Correspondiente',
                'Evaluacion_Id',
                'Profesor_Cedula',
                'Profesor_Nombre',
                'Observacion',
              ];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar.');
            }
          },
          (error) => {
            console.log(error);
            this.msj.error(error);
          }
        );
        break;
      case 'Por genero':
        this.srvReportes.getGenero().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              //this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.displayedColumns = [
                'Genero',
                'Telefono',
                'Telefono2',
                'Correo_Electronico',
                'Foto_Cedula',
                'Cita_Id',
                'Encargado_Nombre',
                'Fecha_Cita',
                'Seguimiento_Id',
                'Resumen_Cita',
                'Fecha_Correspondiente',
                'Evaluacion_Id',
                'Profesor_Cedula',
                'Profesor_Nombre',
                'Observacion',
              ];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          },
          (error) => {
            this.msj.error(error);
          }
        );
        break;
      case 'Por edad':
        this.srvReportes.getEdad().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              //this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.displayedColumns = [
                'Fecha_Nacimiento',
                'Telefono',
                'Telefono2',
                'Correo_Electronico',
                'Cita_Id',
                'Encargado_Nombre',
                'Fecha_Cita',
                'Seguimiento_Id',
                'Resumen_Cita',
                'Fecha_Correspondiente',
                'Evaluacion_Id',
                'Profesor_Cedula',
                'Profesor_Nombre',
                'Observacion',
              ];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          },
          (error) => {
            this.msj.error(error);
          }
        );
        break;
      case 'Por zona de procedencia':
        this.srvReportes.getZonaProcedencia().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              //this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.displayedColumns = [
                'Distrito_Id',
                'Telefono',
                'Telefono2',
                'Correo_Electronico',
                'Cita_Id',
                'Encargado_Nombre',
                'Fecha_Cita',
                'Seguimiento_Id',
                'Resumen_Cita',
                'Fecha_Correspondiente',
                'Evaluacion_Id',
                'Profesor_Cedula',
                'Profesor_Nombre',
                'Observacion',
              ];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          },
          (error) => {
            this.msj.error(error);
          }
        );
        break;
      case 'Por rango de fecha':
        this.srvReportes.getRangoFecha().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              //this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.displayedColumns = [
                'Boleta_Matricula',
                'Telefono',
                'Telefono2',
                'Correo_Electronico',
                'Cita_Id',
                'Encargado_Nombre',
                'Fecha_Cita',
                'Seguimiento_Id',
                'Resumen_Cita',
                'Fecha_Correspondiente',
                'Evaluacion_Id',
                'Profesor_Cedula',
                'Profesor_Nombre',
                'Observacion',
              ];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          },
          (error) => {
            this.msj.error(error);
          }
        );
        break;
      case 'Recursos invertidos, como apoyos tecnicos':
        this.srvReportes.getRecursosInvertidos().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              this.displayedColumns = [
                'Cita_Id',
                'Estudiante_Id',
                'Encargado_Nombre',
                'Aprobacion_Cita',
                'Fecha_Cita',
                'Seguimiento_Id',
                'Cita_Id',
                'Agenda_Cita',
                'Resumen_Cita',
                'Fecha_Correspondiente',
                'Profesor_Cedula',
                'Profesor_Nombre',
                'Nombre_Curso',
                'Observacion',
              ];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          },
          (error) => {
            this.msj.error(error);
          }
        );
        break;
      case 'Combinacion de todos los anteriores':
        this.srvReportes.getCombinacion().subscribe(
          (reportes: Reportes[]) => {
            if (reportes && reportes.length > 0) {
              //this.displayedColumns = ['Estudiantes', 'Citas', 'Seguimientos', 'Evaluaciones', 'Bitacoras'];
              this.displayedColumns = [
                'Estudiante_Id',
                'Genero',
                'Fecha_Nacimiento',
                'Telefono',
                'Telefono2',
                'Correo_Electronico',
                'Distrito_Id',
                'Direccion_Exacta_Procedencia',
                'Direccion_Exacta_Tiempo_Lectivo',
                'Nacionalidad',
                'Colegio_Procedencia',
                'Ano_Graduacion_Secundaria',
                'Boleta_Matricula',
                'Foto_Cedula',
                'Cita_Id',
                'Estudiante_Id',
                'Encargado_Nombre',
                'Aprobacion_Cita',
                'Fecha_Cita',
                'Seguimiento_Id',
                'Cita_Id',
                'Agenda_Cita',
                'Resumen_Cita',
                'Fecha_Correspondiente',
                'Evaluacion_Id',
                'Estudiante_Id',
                'Bitacora_Id',
                'Estudiante_Id',
                'Profesor_Cedula',
                'Profesor_Nombre',
                'Nombre_Curso',
                'Fecha',
                'Observacion',
              ];
              this.dataSource = new MatTableDataSource(reportes);
              this.datosCargados = true;
            } else {
              this.msj.info('No hay datos disponibles para mostrar');
            }
          },
          (error) => {
            this.msj.error(error);
          }
        );
        break;
      default:
        this.msj.warning('Opción de reporte no reconocida.');
        break;
    }
  }

  exportToCSV() {
    const csvData = this.dataSource.data.map((item) => {
      return this.displayedColumns.map((col) => item[col]).join(',');
    });

    const csvString = csvData.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'reporte.csv');
  }

  exportPDF(): void {
    const datos = this.dataSource.data.map((reporte: Reportes) => {
      const row = [
        reporte.Estudiantes,
        reporte.Citas,
        reporte.Seguimientos,
        reporte.Evaluaciones,
        reporte.Bitacoras,
      ];
      return row;
    });

    this.srvReportes.getPDF(
      this.dataSource.data,
      'Lista de reportes',
      'Reportes',
      datos
    );
  }
}
