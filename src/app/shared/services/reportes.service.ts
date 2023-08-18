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

  /*private rutaPorOpcion: { [opcion: string]: string } = {
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
  }*/

  getTipoDeProblema(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>('http://localhost:3000/Reportes/tipoDeProblema').
      pipe(catchError(this.handler.handleError));
  }
  getEdad(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>('http://localhost:3000/Reportes/edad').
      pipe(catchError(this.handler.handleError));
  }
  getGenero(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>('http://localhost:3000/Reportes/genero').
      pipe(catchError(this.handler.handleError));
  }
  getZonaProcedencia(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>('http://localhost:3000/Reportes/zonaProcedencia').
      pipe(catchError(this.handler.handleError));
  }
  getRangoFecha(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>('http://localhost:3000/Reportes/rangoFecha').
      pipe(catchError(this.handler.handleError));
  }
  getRecursosInvertidos(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>('http://localhost:3000/Reportes/recursosInvertidos').
      pipe(catchError(this.handler.handleError));
  }
  getCombinacion(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>('http://localhost:3000/Reportes/combinacion').
      pipe(catchError(this.handler.handleError));
  }

}
