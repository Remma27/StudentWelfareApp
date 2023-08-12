import { NgModule } from '@angular/core';
import { SeguridadComponent } from './seguridad.component';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [SeguridadComponent, LoginComponent, SignupComponent, PasswordComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    //MatFormFieldModule,
    RouterModule,
  ],
})
export class SeguridadModule { }
