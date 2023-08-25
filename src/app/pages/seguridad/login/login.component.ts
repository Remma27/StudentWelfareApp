import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosForm } from 'src/app/shared/formsModels/usuariosForms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

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
    private router: Router,
    private srvAuth: AuthService
  ) { }

  /*IniciarSesion() {
    const Usuario_Id = this.usuarioForm.baseForm.get('Usuario_Id')?.value;
    const Contrasena = this.usuarioForm.baseForm.get('Contrasena')?.value;

    //El inico de sesion lo estamos haciendo mediante un servicio que recibe
    //El usuario y la contrasena, esto es un constructor desde el API
    //Que lo que hace el controller es, primero verificar si el usuario existe,
    //Luego, comparar la contrasena sin encriptar que recibe, con la contrasena encriptada,
    //Si las contrasenas coinciden devuelve un true o un fase.
    this.srvUsuarios.comparePassword(Usuario_Id, Contrasena).subscribe(
      (response) => {
        //Si es true, osea si las contrasenas coinciden, entra al if y permite iniciar sesion.
        if (response.success) {
          this.usuarioForm.baseForm.reset();
          this.mensajeria.success('Inicio de sesión exitoso');
          this.router.navigate(['/BienestarEstudiantil']);
        } else {
          this.mensajeria.error('Cédula o contraseña incorrectos');
        }
      },
      (error) => {
        this.mensajeria.error(error);
      }
    );
  }*/

  IniciarSesion() {
    const Usuario_Id = this.usuarioForm.baseForm.get('Usuario_Id')?.value;
    const Contrasena = this.usuarioForm.baseForm.get('Contrasena')?.value;

    this.srvAuth.login(Usuario_Id, Contrasena).subscribe(
      (loginSuccess) => {
        if (loginSuccess) {
          this.usuarioForm.baseForm.reset();
          this.mensajeria.success('Inicio de sesión exitoso');
          this.router.navigate(['/BienestarEstudiantil/Menu']);
        } else {
          this.mensajeria.error('Cédula o contraseña incorrectos');
        }
      },
      (error) => {
        console.log(error);
        this.mensajeria.error('Error al iniciar sesión');
      }
    );
  }
}
