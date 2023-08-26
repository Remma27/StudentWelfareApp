import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Distrito } from '../models/distrito';
import { environments } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class DistritoService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Distrito[]> {
    return this.http
      .get<Distrito[]>(`${environments.API_URL}/Distrito`)
      .pipe(catchError(this.handlerError));
  }

  getById(Distrito_Id: number): Observable<Distrito> {
    return this.http
      .get<Distrito>(`${environments.API_URL}/Distrito/` + Distrito_Id)
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
