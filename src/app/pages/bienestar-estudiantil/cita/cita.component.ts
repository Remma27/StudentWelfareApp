import { Component } from '@angular/core';
import { CitaForm } from 'src/app/shared/formsModels/citaForms';
import { CitaService } from 'src/app/shared/services/cita.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
})
export class CitaComponent {
  constructor(
    public citaForm: CitaForm,
    private srvCitas: CitaService,
    private mensajeria: ToastrService
  ) {}

  guardar() {
    console.log(this.citaForm.baseForm.value);
    console.log(this.citaForm.baseForm.valid);
    if (this.citaForm.baseForm.valid) {
      this.srvCitas.insert(this.citaForm.baseForm.value).subscribe(
        () => {
          this.citaForm.baseForm.reset();
          this.mensajeria.success(
            'Los datos de la cita se guardaron correctamente'
          );
        },
        (error) => {
          this.mensajeria.error(error);
        }
      );
    } else {
      this.mensajeria.error('Se produjo un error');
    }
  }
}
