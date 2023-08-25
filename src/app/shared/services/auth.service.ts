import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/enviroments';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  constructor(
    private http: HttpClient,
    private srvUsuarios: UsuariosService,
    private handler: UsuariosService
  ) { }

  loginToken(usuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${environments.API_URL}/Auth`, usuario).
      pipe(catchError(this.handler.handleError));
  }

  login(Usuario_Id: string, Contrasena: string): Observable<boolean> {
    return this.srvUsuarios.comparePassword(Usuario_Id, Contrasena).pipe(
      map((response) => {
        if (response.success) {
          this.isAuthenticated = true;
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}



