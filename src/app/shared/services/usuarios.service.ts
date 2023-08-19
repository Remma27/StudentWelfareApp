import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuarios } from '../models/usuarios';
import { environments } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuarios[]> {
    return this.http
      .get<Usuarios[]>(`${environments.API_URL}/Usuarios/`)
      .pipe(catchError(this.handleError));
  }

  getById(Usuario_Id: number): Observable<Usuarios> {
    return this.http
      .get<Usuarios>(`${environments.API_URL}/Usuarios/` + Usuario_Id)
      .pipe(catchError(this.handleError));
  }

  insert(usuario: Usuarios): Observable<Usuarios> {
    return this.http
      .post<Usuarios>(`${environments.API_URL}/Usuarios`, usuario)
      .pipe(catchError(this.handleError));
  }

  comparePassword(
    usuarioId: string,
    password: string
  ): Observable<{ success: boolean }> {
    const data = { Usuario_Id: usuarioId, Contrasena: password };

    return this.http
      .post<{ success: boolean }>(
        `${environments.API_URL}/Usuarios/compare-password`,
        data
      )
      .pipe(catchError(this.handleError));
  }

  update(usuario: Usuarios): Observable<Usuarios> {
    return this.http
      .patch<Usuarios>(`${environments.API_URL}/Usuarios/`, +usuario.Usuario_Id)
      .pipe(catchError(this.handleError));
  }

  delete(Usuario_Id: number): Observable<Usuarios> {
    return this.http
      .delete<Usuarios>(`${environments.API_URL}/Usuarios/` + Usuario_Id)
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
