import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provincia } from './Provincia';
import { Distrito } from './Distrito';

@Entity()
export class Canton {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Canton_Id: number;

  @ManyToOne(() => Provincia, (provincia) => provincia.cantones)
  @JoinColumn({ name: 'Provincia_Id' })
  provincia: Provincia;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Nombre: string;

  @OneToMany(() => Distrito, (distrito) => distrito.canton)
  distritos: Distrito[];
}
