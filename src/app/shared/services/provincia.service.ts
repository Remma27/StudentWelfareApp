import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Provincia } from '../models/provincia';

@Injectable({
  providedIn: 'root',
})
export class ProvinciaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Provincia[]> {
    return this.http
      .get<Provincia[]>('http://localhost:3000/Provincia')
      .pipe(catchError(this.handlerError));
  }

  getById(Provincia_Id: number): Observable<Provincia> {
    return this.http
      .get<Provincia>('http://localhost:3000/Provincia/' + Provincia_Id)
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
