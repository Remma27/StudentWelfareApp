import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguridadComponent } from './seguridad.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';

const routes: Routes = [
  { path: '', component: SeguridadComponent },
  { path: 'Registrarse', component: RegistrarseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule {}
