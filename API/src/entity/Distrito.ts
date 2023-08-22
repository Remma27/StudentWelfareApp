import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Provincia } from './Provincia';
import { Canton } from './Canton';

@Entity()
export class Distrito {
  @PrimaryColumn()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Distrito_Id: number;

  @ManyToOne(() => Provincia, (provincia) => provincia.distritos)
  @JoinColumn({ name: 'Provincia_Id' })
  provincia: Provincia;

  @ManyToOne(() => Canton, (canton) => canton.distritos)
  @JoinColumn({ name: 'Canton_Id' })
  canton: Canton;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Nombre: string;
}
