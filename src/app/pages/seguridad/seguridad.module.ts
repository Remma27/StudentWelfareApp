import { NgModule } from '@angular/core';
import { SeguridadComponent } from './seguridad.component';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SeguridadComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
  ],
})
export class SeguridadModule {}
