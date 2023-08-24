import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosForm } from 'src/app/shared/formsModels/usuariosForms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import * as bcr from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    public usuarioForm: UsuariosForm,
    private srvUsuarios: UsuariosService,
    private mensajeria: ToastrService,
    private router: Router
  ) {}

  IniciarSesion() {
    const Usuario_Id = this.usuarioForm.baseForm.get('Usuario_Id')?.value;
    const Contrasena = this.usuarioForm.baseForm.get('Contrasena')?.value;

    this.srvUsuarios.getById(Usuario_Id).subscribe(
      (usuario) => {
        if (usuario && usuario.Contrasena === Contrasena) {
          const usuarioActualizado = {
            Usuario_Id: usuario.Usuario_Id,
            Correo: usuario.Correo,
            Contrasena: usuario.Contrasena,
            Perfil: usuario.Perfil,
            EstaEnSesion: true,
            Estado: usuario.Estado,
          };

          this.srvUsuarios.update(usuarioActualizado).subscribe(
            () => {
              this.usuarioForm.baseForm.reset();
              this.mensajeria.success('Inicio de sesión exitoso');
              this.router.navigate(['/BienestarEstudiantil/Menu']);
            },
            (error) => {
              this.mensajeria.error('Error al iniciar sesión');
            }
          );
        } else {
          this.mensajeria.error('Cédula o contraseña incorrectos');
        }
      },
      (error) => {
        this.mensajeria.error('Error al iniciar sesión');
      }
    );
  }



  Registrarse() {
    if (this.contrasenasNoCoinciden) {
      this.mensajeria.error('Las contraseñas no coinciden');
      return;
    }

    this.srvUsuarios.insert(this.usuarioForm.baseForm.value).subscribe(
      (dato) => {
        this.usuarioForm.baseForm.reset();
        this.mensajeria.success('¡Guardado correctamente!');
        this.router.navigate(['/']);
      },
      (error) => {
        this.mensajeria.error('Error al guardar');
      }
    );
  }

  get contrasenasNoCoinciden() {
    const contrasena = this.usuarioForm.baseForm.get('Contrasena')?.value;
    const repetirContrasena =
      this.usuarioForm.baseForm.get('RepetirContrasena')?.value;
    return contrasena !== repetirContrasena;
  }

}
