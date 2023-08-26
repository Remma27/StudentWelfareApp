import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/environments/enviroments';
import { Seguimientos } from '../models/seguimientos';

@Injectable({
  providedIn: 'root',
})
export class SeguimientoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Seguimientos[]> {
    return this.http
      .get<Seguimientos[]>(`${environments.API_URL}/Seguimientos`)
      .pipe(catchError(this.handlerError));
  }
  getById(Seguimiento_Id: number): Observable<Seguimientos> {
    return this.http
      .get<Seguimientos>(
        `${environments.API_URL}/Seguimientos/` + Seguimiento_Id
      )
      .pipe(catchError(this.handlerError));
  }
  insert(seguimiento: Seguimientos): Observable<Seguimientos> {
    return this.http
      .post<Seguimientos>(`${environments.API_URL}/Seguimientos`, seguimiento)
      .pipe(catchError(this.handlerError));
  }
  update(seguimiento: Seguimientos): Observable<Seguimientos> {
    return this.http
      .patch<Seguimientos>(`${environments.API_URL}/Seguimientos`, seguimiento)
      .pipe(catchError(this.handlerError));
  }

  delete(Seguimiento_Id: number): Observable<Seguimientos> {
    return this.http
      .delete<Seguimientos>(
        `${environments.API_URL}/Seguimientos/` + Seguimiento_Id
      )
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: HttpErrorResponse) {
    let mensaje = 'Error desconocido, reporte al administrador.';
    if (error?.error) {
      mensaje = error?.error?.mensaje;
    }
    return throwError(() => new Error(mensaje));
  }
}
