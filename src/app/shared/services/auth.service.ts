import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Observable, catchError } from 'rxjs';
import { Usuarios } from '../models/usuarios';
import { environments } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private handler: UsuariosService) { }

  login(usuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${environments.API_URL}/Auth`, usuario).
      pipe(catchError(this.handler.handleError));
  }
}
