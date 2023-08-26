import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Respuesta } from '../models/respuesta';
import { environments } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class RespuestaService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Respuesta[]> {
    return this.http
      .get<Respuesta[]>(`${environments.API_URL}/Respuestas`)
      .pipe(catchError(this.handlerError));
  }
  getById(Respuesta_Id: number): Observable<Respuesta> {
    return this.http
      .get<Respuesta>(`${environments.API_URL}/Respuestas/` + Respuesta_Id)
      .pipe(catchError(this.handlerError));
  }
  insert(respuesta: Respuesta): Observable<Respuesta> {
    return this.http
      .post<Respuesta>(`${environments.API_URL}/Respuestas`, respuesta)
      .pipe(catchError(this.handlerError));
  }
  update(respuesta: Respuesta): Observable<Respuesta> {
    return this.http
      .patch<Respuesta>(`${environments.API_URL}/Respuestas`, respuesta)
      .pipe(catchError(this.handlerError));
  }

  delete(Respuesta_Id: number): Observable<Respuesta> {
    return this.http
      .delete<Respuesta>(`${environments.API_URL}/Respuestas/` + Respuesta_Id)
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
