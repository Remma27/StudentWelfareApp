import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient, private handler: UsuariosService) { }

  /*getTipoDeProblema(): Observable<> {
    return this.http.get<>('http://localhost:3000/Reportes').
      pipe(catchError(this.handler.handleError));
  }
  
  getGenero(): Observable<> {
    return this.http.get<>('http://localhost:3000/Reportes').
      pipe(catchError(this.handler.handleError));
  }

  getEdad(): Observable<> {
    return this.http.get<>('http://localhost:3000/Reportes').
      pipe(catchError(this.handler.handleError));
  }

  getZonaProcedencia(): Observable<> {
    return this.http.get<>('http://localhost:3000/Reportes').
      pipe(catchError(this.handler.handleError));
  }

  getRangoFecha(): Observable<> {
    return this.http.get<>('http://localhost:3000/Reportes').
      pipe(catchError(this.handler.handleError));
  }

  getRecursosCompartidos(): Observable<> {
    return this.http.get<>('http://localhost:3000/Reportes').
      pipe(catchError(this.handler.handleError));
  }

  getCombinacion(): Observable<> {
    return this.http.get<>('http://localhost:3000/Reportes').
      pipe(catchError(this.handler.handleError));
  }*/
}
