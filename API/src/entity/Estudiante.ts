import { IsEmail, IsIn, IsInt, IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BitacoraDocente } from './BitacoraDocente';
import { Cita } from './CIta';
import { EvaluacionServicio } from './EvaluacionServicio';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  Estudiante_Id: number;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Cedula: number;

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

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Distrito_Id: number;

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

  /*
  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Boleta_Matricula: string;
  */

  /*
  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Foto_Cedula: string;
  */

  @OneToMany(() => BitacoraDocente, (bitacora) => bitacora.estudiante)
  bitacora: BitacoraDocente[];

  @OneToMany(() => Cita, (cita) => cita.estudiante)
  cita: Cita[];

  @OneToMany(
    () => EvaluacionServicio,
    (evaluacionServicio) => evaluacionServicio.estudiante
  )
  evaluacionServicio: EvaluacionServicio[];

  @Column({ default: true })
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Estado: boolean;
}
