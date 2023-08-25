import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Injectable({ providedIn: 'root' })
export class BitacoraForm {
    baseForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            Bitacora_Id: [0, [Validators.required, Validators.maxLength(9)]],
            Estudiante_Id: [0, [Validators.required, Validators.maxLength(9)]],
            Profesor_Cedula: [0, [Validators.required, Validators.maxLength(9)]],
            Profesor_Nombre: ['', [Validators.required]],
            Nombre_Curso: ['', [Validators.required]],
            Fecha: [
                formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
                [Validators.required],
            ],
            Observacion: ['', Validators.required],
            Estado: [true]
        })
    }

}