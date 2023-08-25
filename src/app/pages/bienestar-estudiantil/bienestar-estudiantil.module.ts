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
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
//import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { ReportesService } from 'src/app/shared/services/reportes.service';
import { AdminReportesComponent } from './reportes/admin-reportes/admin-reportes.component';
import { CitaComponent } from './cita/cita.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    BienestarEstudiantilComponent,
    InformacionPersonalComponent,
    AdecuacionCurricularComponent,
    AtencionPsicologicaComponent,
    BitacoraProfesorComponent,
    ReportesComponent,
    HeaderComponent,
    //MenuComponent,
    FooterComponent,
    AdminReportesComponent,
    CitaComponent,
    SeguimientoComponent
    MenuComponent,
  ],
  imports: [
    CommonModule,
    BienestarEstudiantilRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    /*ReportesService*/
  ],
})
export class BienestarEstudiantilModule {}
