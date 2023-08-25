import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pregunta } from './Pregunta';
import { Cuestionario } from './Cuestionario';
import { EvaluacionServicio } from './EvaluacionServicio';
import { Estudiante } from './Estudiante';
@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn()
  Respuesta_Id: number;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.respuesta)
  @JoinColumn({ name: 'Pregunta_Id' })
  pregunta: Pregunta;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.respuestas)
  @JoinColumn({ name: 'Estudiante_Id' })
  estudiante: Estudiante;

  @ManyToOne(
    () => EvaluacionServicio,
    (evaluacionServicio) => evaluacionServicio.respuesta
  )
  @JoinColumn({ name: 'Evaluacion_Id' })
  evaluacionServicio: EvaluacionServicio;

  @ManyToOne(() => Cuestionario, (cuestionario) => cuestionario.respuesta)
  @JoinColumn({ name: 'Cuestionario_Id' })
  cuestionario: Cuestionario;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Respuesta_Cuestionario: string;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Estado: boolean;
}
