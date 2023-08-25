import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'BienestarEstudiantil',
  
    loadChildren: () =>
      import('./pages/bienestar-estudiantil/bienestar-estudiantil.module').
      then((b) => b.BienestarEstudiantilModule)
  },
  {
    path: '',
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
