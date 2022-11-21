import { PartialType } from '@nestjs/swagger'
import { IsEmail, MaxLength, MinLength, isEmpty, IsNotEmpty, IsOptional} from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';


export class RegisterAuthCompanyDto{
    name: string;
    
    @IsOptional()
    RTN:string;

    @IsOptional()
    phone:string;

    country: string
    city: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    @MaxLength(12)
    @IsNotEmpty()
    password: string;

    
    
    
    

}
