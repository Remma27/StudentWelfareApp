import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Pregunta } from "./Pregunta";
import { Respuesta } from "./Respuesta";
import { RespuestaDocumento } from "./RespuestaDocumento";

@Entity()
export class Cuestionario {
  @PrimaryColumn()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Cuestionario_Id: number;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Nombre_Cuestionario: string;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.cuestionario)
  pregunta: Pregunta[];

  @OneToMany(() => Respuesta, (respuesta) => respuesta.cuestionario)
  respuesta: Respuesta[];

  @OneToMany(() => RespuestaDocumento, (respuestaDocumento) => respuestaDocumento.cuestionario)
  respuestaDocumento: RespuestaDocumento[];

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Estado: boolean;
}
