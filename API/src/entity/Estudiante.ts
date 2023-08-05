import { IsDate, IsEmail, IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { BitacoraDocente } from "./BitacoraDocente";
import { Cita } from "./CIta";
import { EvaluacionServicio } from "./EvaluacionServicio";
import * as bcrypt from "bcryptjs";


@Entity()
export class Estudiante {

  @PrimaryColumn()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Estudiante_Id: number;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Genero: string;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Fecha_Nacimiento: Date;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Telefono: number;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Telefono2: number;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  @IsEmail({}, { message: "No cumple con el formato de correo electronico" })
  Correo_Electronico: string;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Distrito_Id: number;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Direccion_Exacta_Procedencia: string;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Direccion_Exacta_Tiempo_Lectivo: string;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Nacionalidad: string;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Colegio_Procedencia: string;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Ano_Graduacion_Secundaria: number;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Boleta_Matricula: string;

  @Column()
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Foto_Cedula: string;

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
  @IsNotEmpty({ message: "Debe ingresar valores" })
  Estado: boolean;

  hash(): void {
    const salt = bcrypt.genSaltSync(10);
    this.Telefono = bcrypt.hashSync(this.Telefono, salt);
    this.Telefono2 = bcrypt.hashSync(this.Telefono2, salt);
    this.Correo_Electronico = bcrypt.hashSync(this.Correo_Electronico, salt);
    this.Foto_Cedula = bcrypt.hashSync(this.Foto_Cedula, salt);
    this.Direccion_Exacta_Procedencia = bcrypt.hashSync(this.Direccion_Exacta_Procedencia, salt);
    this.Direccion_Exacta_Tiempo_Lectivo = bcrypt.hashSync(this.Direccion_Exacta_Tiempo_Lectivo, salt);
  }

  check(tele: number, tele2: number, correo: string,
    fotoCedula: string, direccionPro: string,
    direccionTiem: string): boolean {
    return bcrypt.compareSync(
      tele, this.Telefono,
      tele2, this.Telefono2,
      correo, this.Correo_Electronico,
      fotoCedula, this.Foto_Cedula,
      direccionPro, this.Direccion_Exacta_Procedencia,
      direccionTiem, this.Direccion_Exacta_Tiempo_Lectivo);
  }
}
