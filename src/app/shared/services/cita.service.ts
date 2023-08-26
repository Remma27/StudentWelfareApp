import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Citas } from '../models/citas';
import { environments } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Citas[]> {
    return this.http
      .get<Citas[]>(`${environments.API_URL}/Citas`)
      .pipe(catchError(this.handlerError));
  }
  getById(Cita_Id: number): Observable<Citas> {
    return this.http
      .get<Citas>(`${environments.API_URL}/Citas/` + Cita_Id)
      .pipe(catchError(this.handlerError));
  }

  getByEstado(Estado: string): Observable<Citas[]> {
    return this.http
      .get<Citas[]>(`${environments.API_URL}/Citas/getEstado/` + Estado)
      .pipe(catchError(this.handlerError));
  }
  insert(cita: Citas): Observable<Citas> {
    return this.http
      .post<Citas>(`${environments.API_URL}/Citas`, cita)
      .pipe(catchError(this.handlerError));
  }
  update(cita: Citas): Observable<Citas> {
    return this.http
      .patch<Citas>(`${environments.API_URL}/Citas`, cita)
      .pipe(catchError(this.handlerError));
  }

  delete(Cita_Id: number): Observable<Citas> {
    return this.http
      .delete<Citas>(`${environments.API_URL}/Citas/` + Cita_Id)
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
