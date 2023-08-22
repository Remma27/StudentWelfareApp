import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Canton } from './Canton';
import { Distrito } from './Distrito';

@Entity()
export class Provincia {
  @PrimaryColumn()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Provincia_Id: number;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Nombre: string;

  @OneToMany(() => Canton, (canton) => canton.provincia)
  cantones: Canton[];

  @OneToMany(() => Distrito, (distrito) => distrito.provincia)
  distritos: Distrito[];
}
