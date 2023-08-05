import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Estudiante } from "./Estudiante";
import { Seguimiento } from "./Seguimiento";


@Entity()
export class Cita {

    @PrimaryColumn()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Cita_Id: number;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.cita)
    @JoinColumn({ name: 'Estudiante_Id' })
    estudiante: Estudiante;

    @Column()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Encargado_Nombre: string;

    @Column()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Aprobacion_Cita: string;

    @Column()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Fecha_Cita: Date;

    @OneToMany(() => Seguimiento, (seguimiento) => seguimiento.cita)
    seguimiento: Seguimiento[];

    @Column({ default: true })
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Estado: boolean;
}