import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
