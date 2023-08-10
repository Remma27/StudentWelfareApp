import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosForm } from 'src/app/shared/formsModels/usuariosForms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  titulo = 'Informacion Personal';
  isCreate: boolean = true;
  data: any;
  constructor(
    public usuarioForm: UsuariosForm,
    private srvUsuarios: UsuariosService,
    private mensajeria: ToastrService
  ) {}

  guardar() {
    this.srvUsuarios.insert(this.usuarioForm.baseForm.value).subscribe(
      (dato) => {
        this.usuarioForm.baseForm.reset();
        this.mensajeria.success('¡Guardado correctamente!');
      },
      (error) => {
        this.mensajeria.error('Error al guardar');
      }
    );
  }
}
