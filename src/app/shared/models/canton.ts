import { Distrito } from './distrito';
import { Provincia } from './provincia';

export interface Canton {
  Canton_Id: number;
  Provincia_Id: Provincia;
  Nombre: string;

  distritos: Distrito[];
}
