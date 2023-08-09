import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UsuariosForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      Usuario_Id: ['', [Validators.required, Validators.maxLength(9)]],
      Usuario: ['', [Validators.required, Validators.email]],
      Perfil: [''],
      Contrasena: ['', [Validators.required, Validators.minLength(8)]], // Moví Validators.minLength(8) aquí
      Estado: true,
    });
  }
}
