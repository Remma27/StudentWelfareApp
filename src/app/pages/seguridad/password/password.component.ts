import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosForm } from 'src/app/shared/formsModels/usuariosForms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  constructor(
    public usuarioForm: UsuariosForm,
    private srvUsuarios: UsuariosService,
    private mensajeria: ToastrService,
    private route: Router
  ) {}

  //En este metodo modificar estamos haciendo uso de todo el update de la entidad usuario, sin embargo
  //Solo estamos actualizando la contrasena.
  ModificarContrasena() {
    if (this.contrasenasNoCoinciden) {
      this.mensajeria.error('Las contraseñas no coinciden');
      return;
    }

    const Usuario_Id = this.usuarioForm.baseForm.get('Usuario_Id')?.value;
    const nuevaContrasena = this.usuarioForm.baseForm.get('Contrasena')?.value;

    this.srvUsuarios.getById(Usuario_Id).subscribe(
      (usuario) => {
        if (usuario) {
          const usuarioActualizado = {
            Usuario_Id: usuario.Usuario_Id,
            Correo: usuario.Correo,
            Contrasena: nuevaContrasena,
            Estado: usuario.Estado,
          };

          this.srvUsuarios.update(usuarioActualizado).subscribe(
            () => {
              this.usuarioForm.baseForm.reset();
              this.route.navigate(['/']);
              this.mensajeria.success('Contraseña modificada correctamente');
            },
            (error) => {
              this.mensajeria.error(error);
            }
          );
        } else {
          this.mensajeria.error('Usuario no encontrado');
        }
      },
      (error) => {
        this.mensajeria.error(error);
      }
    );
  }

  //En este metodo lo que estamos haciendo es comparar la contrasena encriptada en la base de datos
  //Con la contrasena que esta escribiendo el usuario, por seguridad no tenemos que desencriptar
  //Si no, encriptar y comparar las dos contrasenas encripatas, esto devuelve un true o false
  get contrasenasNoCoinciden() {
    const contrasena = this.usuarioForm.baseForm.get('Contrasena')?.value;
    const repetirContrasena =
      this.usuarioForm.baseForm.get('RepetirContrasena')?.value;
    return contrasena !== repetirContrasena;
  }
}
