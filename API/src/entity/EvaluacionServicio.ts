import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Estudiante } from './Estudiante';
import { Respuesta } from './Respuesta';

@Entity()
export class EvaluacionServicio {
  @PrimaryColumn()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Evaluacion_Id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.evaluacionServicio)
  @JoinColumn({ name: 'Estudiante_Id' })
  estudiante: Estudiante;

  @OneToMany(() => Respuesta, (respuesta) => respuesta.evaluacionServicio)
  respuesta: Respuesta[];

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Estado: boolean;
}
