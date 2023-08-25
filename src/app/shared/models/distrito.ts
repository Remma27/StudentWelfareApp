import { Canton } from './canton';
import { Provincia } from './provincia';

export interface Distrito {
  Distrito_Id: number;
  Provincia_Id: Provincia;
  Canton_Id: Canton;
  Nombre: string;
}
