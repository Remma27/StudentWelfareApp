import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Canton } from '../models/canton';

@Injectable({
  providedIn: 'root',
})
export class CantonService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Canton[]> {
    return this.http
      .get<Canton[]>('http://localhost:3000/Canton')
      .pipe(catchError(this.handlerError));
  }

  getById(Canton_Id: number): Observable<Canton> {
    return this.http
      .get<Canton>('http://localhost:3000/Canton/' + Canton_Id)
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
