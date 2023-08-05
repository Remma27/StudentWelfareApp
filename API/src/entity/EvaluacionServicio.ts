import { IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Estudiante } from "./Estudiante";
import { Pregunta } from "./Pregunta";
import { Respuesta } from "./Respuesta";
import { RespuestaDocumento } from "./RespuestaDocumento";

@Entity()
export class EvaluacionServicio {
  @PrimaryColumn()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Evaluacion_Id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.evaluacionServicio)
  @JoinColumn({ name: "Estudiante_Id" })
  estudiante: Estudiante;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.evaluacionServicio)
  pregunta: Pregunta[];

  @OneToMany(() => Respuesta, (respuesta) => respuesta.evaluacionServicio)
  respuesta: Respuesta[];

  @OneToMany(() => RespuestaDocumento, (respuestaDocumento) => respuestaDocumento.evaluacionServicio)
  respuestaDocumento: RespuestaDocumento[];

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Estado: boolean;
}
