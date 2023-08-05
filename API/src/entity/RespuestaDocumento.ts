import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Pregunta } from "./Pregunta";
import { EvaluacionServicio } from "./EvaluacionServicio";
import { Cuestionario } from "./Cuestionario";


@Entity()
export class RespuestaDocumento {

    @PrimaryColumn()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Respuesta_Id_Documento: number;

    @ManyToOne(() => Pregunta, (pregunta) => pregunta.respuestaDocumento)
    @JoinColumn({ name: 'Pregunta_Id' })
    pregunta: Pregunta;

    @ManyToOne(() => EvaluacionServicio, (evaluacionServicio) => evaluacionServicio.respuestaDocumento)
    @JoinColumn({ name: 'Evaluacion_Id' })
    evaluacionServicio: EvaluacionServicio;

    @ManyToOne(() => Cuestionario, (cuestionario) => cuestionario.respuestaDocumento)
    @JoinColumn({ name: 'Cuestionario_Id' })
    cuestionario: Cuestionario;

    @Column()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Respuesta_Documento: string;

    @Column({ default: true })
    Estado: boolean;
}