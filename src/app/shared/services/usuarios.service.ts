import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Usuarios[]> {
    return this.http
      .get<Usuarios[]>('http://localhost:3000/Usuarios')
      .pipe(catchError(this.handlerError));
  }
  getById(Usuario_Id: number): Observable<Usuarios> {
    return this.http
      .get<Usuarios>('http://localhost:3000/Usuarios/' + Usuario_Id)
      .pipe(catchError(this.handlerError));
  }
  insert(Usuario_Id: Usuarios): Observable<Usuarios> {
    return this.http
      .post<Usuarios>('http://localhost:3000/Usuarios', Usuario_Id)
      .pipe(catchError(this.handlerError));
  }
  update(Usuario_Id: Usuarios): Observable<Usuarios> {
    return this.http
      .patch<Usuarios>('http://localhost:3000/Usuarios', Usuario_Id)
      .pipe(catchError(this.handlerError));
  }

  delete(Usuario_Id: number): Observable<Usuarios> {
    return this.http
      .delete<Usuarios>('http://localhost:3000/Usuarios/' + Usuario_Id)
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
