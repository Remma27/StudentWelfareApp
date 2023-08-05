import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Pregunta } from "./Pregunta";
import { Cuestionario } from "./Cuestionario";
import { EvaluacionServicio } from "./EvaluacionServicio";

@Entity()
export class Respuesta {
  @PrimaryColumn()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Respuesta_Id: number;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.respuesta)
  @JoinColumn({ name: "Pregunta_Id" })
  pregunta: Pregunta;

  @ManyToOne(
    () => EvaluacionServicio,
    (evaluacionServicio) => evaluacionServicio.respuesta
  )
  @JoinColumn({ name: "Evaluacion_Id" })
  evaluacionServicio: EvaluacionServicio;

  @ManyToOne(() => Cuestionario, (cuestionario) => cuestionario.respuesta)
  @JoinColumn({ name: "Cuestionario_Id" })
  cuestionario: Cuestionario;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Respuesta_Cuestionario: string;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Estado: boolean;
}
