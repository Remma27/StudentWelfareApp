import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Respuesta } from './Respuesta';
import { Cuestionario } from './Cuestionario';
import { EvaluacionServicio } from './EvaluacionServicio';

@Entity()
export class Pregunta {
  @PrimaryColumn()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Pregunta_Id: number;

  @ManyToOne(() => Cuestionario, (cuestionario) => cuestionario.pregunta)
  @JoinColumn({ name: 'Cuestionario_Id' })
  cuestionario: Cuestionario;

  @OneToMany(() => Respuesta, (respuesta) => respuesta.pregunta)
  respuesta: Respuesta[];

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Pregunta_Cuestionario: string;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Estado: boolean;
}
