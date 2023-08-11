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
    private router: Router,
  ) { }

  IniciarSesion() {
    const Usuario_Id = this.usuarioForm.baseForm.get('Usuario_Id')?.value;
    const Contrasena = this.usuarioForm.baseForm.get('Contrasena')?.value;

    this.srvUsuarios.getById(Usuario_Id).subscribe(
      (usuario) => {
        if (usuario && usuario.Contrasena === Contrasena) {
          // Inicio de sesión exitoso, realizar redirección u otras acciones
          this.mensajeria.success('Inicio de sesión exitoso');
          this.router.navigate(['/BienestarEstudiantil/Reportes']);
        } else {
          this.mensajeria.error('Cédula o contraseña incorrectos');
        }
      },
      (error) => {
        this.mensajeria.error('Error al iniciar sesión');
      }
    );
  }
}
