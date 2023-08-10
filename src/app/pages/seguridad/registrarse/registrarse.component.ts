import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsuariosForm } from 'src/app/shared/formsModels/usuariosForms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss'],
})
export class RegistrarseComponent {
  titulo = 'Informacion Personal';
  isCreate: boolean = true;
  constructor(
    public usuarioForm: UsuariosForm,
    private srvUsuarios: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: any },
    private mensajeria: ToastrService
  ) {}

  ngOnInit() {
    if (this.data?.usuario) {
      this.isCreate = false;
      this.titulo = 'Modificar datos';
      this.cargarDatosForm();
    } else {
      this.isCreate = true;
      this.titulo = 'Registrarse';
    }
  }

  cargarDatosForm() {
    this.usuarioForm.baseForm.patchValue({
      Usuario_Id: this.data.usuario.Usuario_Id,
      Usuario: this.data.usuario.Usuario,
      Contasena: this.data.usuario.Contasena,
      estado: true,
    });
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
