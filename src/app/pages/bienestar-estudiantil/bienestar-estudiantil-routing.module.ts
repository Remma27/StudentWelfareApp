import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienestarEstudiantilComponent } from './bienestar-estudiantil.component';

const routes: Routes = [{ path: '', component: BienestarEstudiantilComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienestarEstudiantilRoutingModule { }
