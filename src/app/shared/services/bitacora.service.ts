import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Bitacora } from '../models/bitacora';


@Injectable({
  providedIn: 'root',
})
export class BitacoraServices {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Bitacora[]> {
    return this.http
      .get<Bitacora[]>('http://localhost:3000/Bitacoras')
      .pipe(catchError(this.handlerError));

  }

  guardar(bitacora: Bitacora): Observable<Bitacora> {
    return this.http
      .post<Bitacora>('http://localhost:3000/Bitacoras', bitacora)
      .pipe(catchError(this.handlerError));
  }


  getById(Bitacora_Id: number): Observable<Bitacora> {
    return this.http
      .get<Bitacora>('http://localhost:3000/Bitacoras/' + Bitacora_Id)
      .pipe(catchError(this.handlerError));
  }
  insert(bitacora: Bitacora): Observable<Bitacora> {
    return this.http
      .post<Bitacora>('http://localhost:3000/Bitacoras', bitacora)
      .pipe(catchError(this.handlerError));
  }
  update(bitacora: Bitacora): Observable<Bitacora> {
    return this.http
      .patch<Bitacora>('http://localhost:3000/Bitacoras/', bitacora)
      .pipe(catchError(this.handlerError));
  }

  delete(Bitacora_Id: number): Observable<Bitacora> {
    return this.http
      .delete<Bitacora>('http://localhost:3000/Bitacoras/' + Bitacora_Id)
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
