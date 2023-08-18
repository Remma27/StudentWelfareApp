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
      .get<Usuarios[]>('http://localhost:3000/Usuarios/')
      .pipe(catchError(this.handleError));
  }

  getById(Usuario_Id: number): Observable<Usuarios> {
    return this.http
      .get<Usuarios>('http://localhost:3000/Usuarios/' + Usuario_Id)
      .pipe(catchError(this.handleError));
  }

  insert(usuario: Usuarios): Observable<Usuarios> {
    return this.http
      .post<Usuarios>('http://localhost:3000/Usuarios/', usuario)
      .pipe(catchError(this.handleError));
  }

  comparePassword(
    usuarioId: string,
    password: string
  ): Observable<{ success: boolean }> {
    const data = { Usuario_Id: usuarioId, Contrasena: password };
    return this.http
      .post<{ success: boolean }>(
        'http://localhost:3000/Usuarios/compare-password', // Asegúrate de tener la ruta correcta
        data
      )
      .pipe(catchError(this.handleError));
  }

  update(usuario: Usuarios): Observable<Usuarios> {
    return this.http
      .patch<Usuarios>(
        'http://localhost:3000/Usuarios/' + usuario.Usuario_Id,
        usuario
      )
      .pipe(catchError(this.handleError));
  }

  delete(Usuario_Id: number): Observable<Usuarios> {
    return this.http
      .delete<Usuarios>('http://localhost:3000/Usuarios/' + Usuario_Id)
      .pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    let mensaje = 'Error desconocido, reporte al administrador.';
    if (error.error instanceof ErrorEvent) {
      mensaje = 'Error en el cliente: ' + error.error.message;
    } else if (error.error && error.error.mensaje) {
      mensaje = error.error.mensaje;
    }
    return throwError(() => new Error(mensaje));
  }
}
