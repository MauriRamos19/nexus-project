import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterAuthUserDto } from "./dto/registerUser-auth.dto";
import { RegisterAuthCompanyDto } from "./dto/registerCompany-auth.dto";


@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService){}

    @Post('register-user')
    signUpUser(@Body() userObject: RegisterAuthUserDto) {
        this.authService.registerUser(userObject)
    }

    @Post('register-company')
    signUpCompany(@Body() companyObject: RegisterAuthCompanyDto) {
        this.authService.registerCompany(companyObject)
    }
}