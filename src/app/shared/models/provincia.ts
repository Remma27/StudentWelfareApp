import { Canton } from './canton';
import { Distrito } from './distrito';

export interface Provincia {
  Provincia_Id: number;
  Nombre: string;

  cantones: Canton[];
  distritos: Distrito[];
}
