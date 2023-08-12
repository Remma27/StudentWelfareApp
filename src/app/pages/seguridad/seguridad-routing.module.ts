import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SeguridadComponent } from './seguridad.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  //{ path: '', component: SeguridadComponent },
  { path: '', component: LoginComponent },
  { path: 'SignUp', component: SignupComponent },
  { path: 'Password', component: PasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule { }
