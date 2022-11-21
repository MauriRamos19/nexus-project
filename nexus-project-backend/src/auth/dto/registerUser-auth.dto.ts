import { PartialType } from '@nestjs/swagger'
import { IsEmail, MaxLength, MinLength, isEmpty, IsNotEmpty, IsOptional} from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';


export class RegisterAuthUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    @MaxLength(12)
    @IsNotEmpty()
    password: string;

    name: string;
    country: string
    city: string;
    
    @IsOptional()
    lastname:string;
    
    @IsOptional()
    roleType:string;

}
