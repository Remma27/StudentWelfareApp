import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguridadComponent } from 'src/app/pages/seguridad/seguridad.component';
import { BienestarEstudiantilComponent } from './pages/bienestar-estudiantil/bienestar-estudiantil.component';

const routes: Routes = [
  {
    path: 'BienestarEstudiantil',
    component: BienestarEstudiantilComponent,
  },
  {
    path: 'Seguridad',
    component: SeguridadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
