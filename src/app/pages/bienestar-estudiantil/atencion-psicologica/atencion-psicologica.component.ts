import { Component } from '@angular/core';
interface Sede {
  value: string;
  viewValue: string;
}

interface Horario {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-atencion-psicologica',
  templateUrl: './atencion-psicologica.component.html',
  styleUrls: ['./atencion-psicologica.component.scss']
})
export class AtencionPsicologicaComponent {
  Sede: Sede[] = [
    { value: '1', viewValue: 'Sede Central' },
    { value: '2', viewValue: 'Sede de San Carlos' },
    { value: '3', viewValue: 'Sede del pacifico' },
    {value:'4', viewValue:'Sede de Atenas'},
    {value:'5', viewValue:'Sede de Guanacaste'},
    {value:'6', viewValue:'Centro de Formación Pedagógia y Tecnologica educativa'}
  ];

  Horario: Horario[] = [
    { value: '1', viewValue: 'Mañana' },
    { value: '2', viewValue: 'Tarde' },
    { value: '2', viewValue: 'Noche' }

  ];
}
