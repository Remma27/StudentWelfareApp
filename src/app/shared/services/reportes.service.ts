import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Observable, catchError } from 'rxjs';
import { Reportes } from '../models/reportes';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient, private handler: UsuariosService,) { }

  private rutaPorOpcion: { [opcion: string]: string } = {
    'Por tipo de problema atendido': 'tipoDeProblema',
    'Por genero': 'genero',
    'Por edad': 'edad',
    'Por zona de procedencia': 'zonaProcedencia',
    'Por rango de fecha': 'rangoFecha',
    'Recursos invertidos, como apoyos tecnicos': 'recursosInvertidos',
    'Combinacion de todos los anteriores': 'combinacion'
  };

  getReporte(opcion: string): Observable<Reportes[]> {
    const ruta = this.rutaPorOpcion[opcion];
    if (ruta) {
      return this.http.get<Reportes[]>(`http://localhost:3000/Reportes/${ruta}`).
        pipe(catchError(this.handler.handleError));
    } else {
      throw new Error('Opción no válida');
    }
  }
}
