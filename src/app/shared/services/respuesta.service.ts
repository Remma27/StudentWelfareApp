import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Respuesta } from '../models/respuesta';

@Injectable({
  providedIn: 'root',
})
export class RespuestaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Respuesta[]> {
    return this.http
      .get<Respuesta[]>('http://localhost:3000/Respuestas')
      .pipe(catchError(this.handlerError));
  }
  getById(Respuesta_Id: number): Observable<Respuesta> {
    return this.http
      .get<Respuesta>('http://localhost:3000/Respuestas/' + Respuesta_Id)
      .pipe(catchError(this.handlerError));
  }
  insert(respuesta: Respuesta): Observable<Respuesta> {
    return this.http
      .post<Respuesta>('http://localhost:3000/Respuestas', respuesta)
      .pipe(catchError(this.handlerError));
  }
  update(respuesta: Respuesta): Observable<Respuesta> {
    return this.http
      .patch<Respuesta>('http://localhost:3000/Respuestas', respuesta)
      .pipe(catchError(this.handlerError));
  }

  delete(Respuesta_Id: number): Observable<Respuesta> {
    return this.http
      .delete<Respuesta>('http://localhost:3000/Estudiantes/' + Respuesta_Id)
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
