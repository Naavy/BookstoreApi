import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from '../role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  readonly role: RoleType;
}
