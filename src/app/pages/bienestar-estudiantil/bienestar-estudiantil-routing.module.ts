import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienestarEstudiantilComponent } from './bienestar-estudiantil.component';
import { AdecuacionCurricularComponent } from './adecuacion-curricular/adecuacion-curricular.component';
import { AtencionPsicologicaComponent } from './atencion-psicologica/atencion-psicologica.component';
import { BitacoraProfesorComponent } from './bitacora-profesor/bitacora-profesor.component';
import { InformacionPersonalComponent } from './informacion-personal/informacion-personal.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'Menu', component: MenuComponent },
  {
    path: '',
    component: BienestarEstudiantilComponent, // cargar el componente bienestar estudiantil en todas sus subrutas
    children: [
      { path: 'AdecuacionCurricular', component: AdecuacionCurricularComponent },
      { path: 'AtencionPsicologica', component: AtencionPsicologicaComponent },
      { path: 'BitacoraProfesor', component: BitacoraProfesorComponent },
      { path: 'InformacionPersonal', component: InformacionPersonalComponent },
      { path: 'Reportes', component: ReportesComponent },
      { path: '', redirectTo: 'AdecuacionCurricular', pathMatch: 'full' }, //ruta por defecot
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BienestarEstudiantilRoutingModule { }
