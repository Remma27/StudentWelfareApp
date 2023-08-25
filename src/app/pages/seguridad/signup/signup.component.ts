import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuariosForm } from 'src/app/shared/formsModels/usuariosForms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  titulo = 'Informacion Personal';
  isCreate: boolean = true;
  data: any;
  constructor(
    public usuarioForm: UsuariosForm,
    private srvUsuarios: UsuariosService,
    private mensajeria: ToastrService,
    private router: Router
  ) {}

  Registrarse() {
    if (this.contrasenasNoCoinciden) {
      this.mensajeria.error('Las contraseñas no coinciden');
      return;
    }

    this.srvUsuarios.insert(this.usuarioForm.baseForm.value).subscribe(
      () => {
        this.usuarioForm.baseForm.reset();
        this.mensajeria.success('¡Guardado correctamente!');
        this.router.navigate(['/']);
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
