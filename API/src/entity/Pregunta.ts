import { IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Respuesta } from "./Respuesta";
import { EvaluacionServicio } from "./EvaluacionServicio";
import { Cuestionario } from "./Cuestionario";
import { RespuestaDocumento } from "./RespuestaDocumento";

@Entity()
export class Pregunta {
  @PrimaryColumn()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Pregunta_Id: number;

  @ManyToOne(() => Cuestionario, (cuestionario) => cuestionario.pregunta)
  @JoinColumn({ name: "Cuestionario_Id" })
  cuestionario: Cuestionario;

  @ManyToOne(
    () => EvaluacionServicio,
    (evaluacionServicio) => evaluacionServicio.pregunta
  )
  @JoinColumn({ name: "Evaluacion_Id" })
  evaluacionServicio: EvaluacionServicio;

  @OneToMany(() => Respuesta, (respuesta) => respuesta.pregunta)
  respuesta: Respuesta[];

  @OneToMany(() => RespuestaDocumento, (respuestaDocumento) => respuestaDocumento.pregunta)
  respuestaDocumento: RespuestaDocumento[];

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Pregunta_Cuestionario: string;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Estado: boolean;
}
