import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @Transform(({value})=>value.trim())
  @IsString()
  name: string;

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
