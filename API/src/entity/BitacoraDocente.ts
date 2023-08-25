import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estudiante } from './Estudiante';

@Entity()
export class BitacoraDocente {
  @PrimaryGeneratedColumn()
  Bitacora_Id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.bitacora)
  @JoinColumn({ name: 'Estudiante_Id' })
  estudiante: Estudiante;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Profesor_Cedula: number;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Profesor_Nombre: string;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Nombre_Curso: string;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Fecha: Date;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Observacion: string;

  @Column({ default: true })
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Estado: boolean;
}
