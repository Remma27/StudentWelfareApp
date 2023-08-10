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
  isCreate = true;
  data: any;
  constructor(
    public usuarioForm: UsuariosForm,
    private srvUsuarios: UsuariosService,
    private mensajeria: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isCreate = false;
        this.titulo = 'Modificar datos';
        this.cargarDatosForm(params['id']);
      } else {
        this.isCreate = true;
        this.titulo = 'Registrarse';
      }
    });
  }

  cargarDatosForm(usuario_Id: number) {
    this.srvUsuarios.getById(usuario_Id).subscribe(
      (datosUsuario) => {
        this.usuarioForm.baseForm.patchValue({
          Usuario_Id: datosUsuario.Usuario_Id,
          Usuario: datosUsuario.Usuario,
          Perfil: datosUsuario.Perfil,
          Contrasena: datosUsuario.Contrasena,
          Estado: datosUsuario.Estado,
        });
      },
      (error) => {
        this.mensajeria.error('Error al cargar los datos del usuario');
      }
    );
  }

  guardar() {
    if (this.usuarioForm.baseForm.valid) {
      if (this.isCreate) {
        this.srvUsuarios.insert(this.usuarioForm.baseForm.value).subscribe(
          (dato) => {
            this.usuarioForm.baseForm.reset();
            this.mensajeria.success('Se guardó correctamente');
          },
          (error) => {
            //console.log(error);
            this.mensajeria.error('Error al guardar');
          }
        );
      } else {
        this.srvUsuarios.update(this.usuarioForm.baseForm.value).subscribe(
          (dato) => {
            this.usuarioForm.baseForm.reset();
            this.mensajeria.success('Se modificó correctamente');
          },
          (error) => {
            this.mensajeria.error('Error al modificar');
          }
        );
      }
    }
  }
}
