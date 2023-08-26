import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Estudiantes } from '../models/estudiantes';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Estudiantes[]> {
    return this.http
      .get<Estudiantes[]>('http://localhost:3000/Estudiantes')
      .pipe(catchError(this.handlerError));
  }
  getById(Estudiante_Id: number): Observable<Estudiantes> {
    return this.http
      .get<Estudiantes>('http://localhost:3000/Estudiantes/' + Estudiante_Id)
      .pipe(catchError(this.handlerError));
  }
  insert(estudiante: Estudiantes): Observable<Estudiantes> {
    console.log(estudiante);
    return this.http
      .post<Estudiantes>('http://localhost:3000/Estudiantes', estudiante)
      .pipe(catchError(this.handlerError));
  }
  update(estudiante: Estudiantes): Observable<Estudiantes> {
    return this.http
      .patch<Estudiantes>('http://localhost:3000/Estudiantes', estudiante)
      .pipe(catchError(this.handlerError));
  }

  delete(Estudiante_Id: number): Observable<Estudiantes> {
    return this.http
      .delete<Estudiantes>('http://localhost:3000/Estudiantes/' + Estudiante_Id)
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
