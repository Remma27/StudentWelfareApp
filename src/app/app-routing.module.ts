import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguridadComponent } from 'src/app/pages/seguridad/seguridad.component';
import { BienestarEstudiantilComponent } from './pages/bienestar-estudiantil/bienestar-estudiantil.component';

const routes: Routes = [
  {
    path: 'BienestarEstudiantil',
    loadChildren: () =>
      import('./pages/bienestar-estudiantil/bienestar-estudiantil.module').
        then((b) => b.BienestarEstudiantilModule)
  },
  {
    path: 'Seguridad',
    loadChildren: () =>
      import('./pages/seguridad/seguridad.module').
        then((s) => s.SeguridadModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
