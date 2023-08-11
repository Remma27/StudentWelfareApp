import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import * as bcr from "bcryptjs";


@Entity()
export class Usuario {
  @PrimaryColumn()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Usuario_Id: number;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Correo: string;

  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Contrasena: string;
  /*
  @Column()
  Perfil: string;
*/
  @Column()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Estado: boolean;

  hash(): void {
    const salt = bcr.genSaltSync(20);
    this.Contrasena = bcr.hashSync(this.Contrasena);
  }
  check(contra: string): boolean {
    return bcr.compareSync(contra, this.Contrasena);
  }
}

