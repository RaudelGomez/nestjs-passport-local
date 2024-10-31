import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {
  @Transform(({value})=> value.trim())
  @IsEmail()
  @IsNotEmpty()
  email:string;

  @Transform(({value})=> value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}