import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { SeguridadComponent } from './seguridad.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SeguridadComponent, RegistrarseComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class SeguridadModule {}
