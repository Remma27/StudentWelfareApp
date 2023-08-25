import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BitacoraDocente } from './BitacoraDocente';
import { Cita } from './CIta';
import { EvaluacionServicio } from './EvaluacionServicio';
import { Distrito } from './Distrito';
import { Respuesta } from './Respuesta';

@Entity()
export class Estudiante {
  @PrimaryColumn()
  Estudiante_Id: number;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  @IsIn(['M', 'F'], { message: 'El género debe ser M o F' })
  Genero: string;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Fecha_Nacimiento: Date;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Telefono: number;

  @Column()
  Telefono2: number;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  @IsEmail({}, { message: 'No cumple con el formato de correo electronico' })
  Correo_Electronico: string;

  @ManyToOne(() => Distrito, (distrito) => distrito.estudiantes)
  @JoinColumn({ name: 'Distrito_Id' })
  distrito: Distrito;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Direccion_Exacta_Procedencia: string;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Direccion_Exacta_Tiempo_Lectivo: string;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  @IsIn(['C', 'E'], { message: 'La nacionalidad debe ser C o E' })
  Nacionalidad: string;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Colegio_Procedencia: string;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Ano_Graduacion_Secundaria: number;

  @OneToMany(() => BitacoraDocente, (bitacora) => bitacora.estudiante)
  bitacora: BitacoraDocente[];

  @OneToMany(() => Cita, (cita) => cita.estudiante)
  cita: Cita[];

  @OneToMany(() => Respuesta, (respuesta) => respuesta.estudiante)
  evaluacionServicio: EvaluacionServicio[];

  @OneToMany(() => Respuesta, (respuesta) => respuesta.estudiante)
  respuestas: Respuesta[];

  @Column({ default: true })
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Estado: boolean;
}
