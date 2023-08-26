import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Bitacora } from '../models/bitacora';
import { environments } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class BitacoraServices {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Bitacora[]> {
    return this.http
      .get<Bitacora[]>(`${environments.API_URL}/Bitacoras`)
      .pipe(catchError(this.handlerError));
  }

  guardar(bitacora: Bitacora): Observable<Bitacora> {
    return this.http
      .post<Bitacora>(`${environments.API_URL}/Bitacoras`, bitacora)
      .pipe(catchError(this.handlerError));
  }

  getById(Bitacora_Id: number): Observable<Bitacora> {
    return this.http
      .get<Bitacora>(`${environments.API_URL}/Bitacoras/` + Bitacora_Id)
      .pipe(catchError(this.handlerError));
  }
  insert(bitacora: Bitacora): Observable<Bitacora> {
    console.log(bitacora);
    return this.http
      .post<Bitacora>(`${environments.API_URL}/Bitacoras`, bitacora)
      .pipe(catchError(this.handlerError));
  }
  update(bitacora: Bitacora): Observable<Bitacora> {
    return this.http
      .patch<Bitacora>(`${environments.API_URL}/Bitacoras/`, bitacora)
      .pipe(catchError(this.handlerError));
  }

  delete(Bitacora_Id: number): Observable<Bitacora> {
    return this.http
      .delete<Bitacora>(`${environments.API_URL}/Bitacoras/` + Bitacora_Id)
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
