import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'BienestarEstudiantil',
    loadChildren: () =>
      import('./pages/bienestar-estudiantil/bienestar-estudiantil.module').then(
        (m) => m.BienestarEstudiantilModule
      ),
  },
  {
    path: 'registrarse',
    loadChildren: () =>
      import('./pages/seguridad/seguridad.module').then(
        (m) => m.SeguridadModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
