import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryColumn()
  @IsNotEmpty({ message: 'Debe ingresar valores' })
  Usuario_Id: number;

  @Column()
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
}
