import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosForm } from 'src/app/shared/formsModels/usuariosForms';
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
    private router: Router
  ) {}

  IniciarSesion() {
    const Usuario_Id = this.usuarioForm.baseForm.get('Usuario_Id')?.value;
    const Contrasena = this.usuarioForm.baseForm.get('Contrasena')?.value;

    // Enviar la solicitud al servidor para comparar contraseñas
    this.srvUsuarios.comparePassword(Usuario_Id, Contrasena).subscribe(
      (response) => {
        if (response.success) {
          // El inicio de sesión fue exitoso en el servidor
          // Realiza otras operaciones de inicio de sesión y redirección
          this.usuarioForm.baseForm.reset();
          this.mensajeria.success('Inicio de sesión exitoso');
          this.router.navigate(['/BienestarEstudiantil/Menu']);
        } else {
          // El inicio de sesión falló en el servidor
          this.mensajeria.error('Cédula o contraseña incorrectos');
        }
      },
      (error) => {
        this.mensajeria.error('Error al iniciar sesión');
      }
    );
  }
}
