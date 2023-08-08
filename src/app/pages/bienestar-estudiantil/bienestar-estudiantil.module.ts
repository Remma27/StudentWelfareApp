import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienestarEstudiantilRoutingModule } from './bienestar-estudiantil-routing.module';
import { BienestarEstudiantilComponent } from './bienestar-estudiantil.component';
import { InformacionPersonalComponent } from './informacion-personal/informacion-personal.component';
import { AdecuacionCurricularComponent } from './adecuacion-curricular/adecuacion-curricular.component';
import { AtencionPsicologicaComponent } from './atencion-psicologica/atencion-psicologica.component';
import { BitacoraProfesorComponent } from './bitacora-profesor/bitacora-profesor.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BienestarEstudiantilComponent,
    InformacionPersonalComponent,
    AdecuacionCurricularComponent,
    AtencionPsicologicaComponent,
    BitacoraProfesorComponent,
    ReportesComponent,
  ],
  imports: [
    CommonModule,
    BienestarEstudiantilRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class BienestarEstudiantilModule { }
