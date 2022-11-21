import { PartialType } from '@nestjs/swagger'
import { IsEmail, MaxLength, MinLength, isEmpty, IsNotEmpty, IsOptional} from 'class-validator';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';


export class RegisterAuthDto extends PartialType(LoginAuthDto) {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    country:string

    @IsNotEmpty()
    city:string

}
