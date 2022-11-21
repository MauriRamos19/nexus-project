import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthUserDto } from './dto/registerUser-auth.dto';
import { RegisterAuthCompanyDto } from './dto/registerCompany-auth.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from 'src/schemas/company/company.schema';
import { JwtService } from '@nestjs/jwt'
import { connect } from 'http2';

@Injectable()
export class AuthService {

    constructor(
      @InjectModel(User.name) private readonly userModel: Model<UserDocument>, 
      @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>,
      private jwtService: JwtService) {}

  async validateUser(email: any, password: string): Promise<any> {
    const user = await this.userModel.findOne({email: email}) || await this.companyModel.findOne({email: email});

    const checkPassword = await bcrypt.compare(password, user.password)

    if (user && checkPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(userObjectLogin: LoginAuthDto) {
    
  //     const { email, password } = userObjectLogin;
  //     const userDB =  await this.userModel.findOne({email: email}) || await this.companyModel.findOne({email: email});


  //     if(!userDB) throw new HttpException('USER_NOT_FOUND', 404);

  //     const checkPassword = await bcrypt.compare(password, userDB.password)

  //     if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

  //     return userDB;
    
  // }

  async login({_doc: user}: any) {
    const payload = { username: user.name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(user: RegisterAuthUserDto) {
    const { password } = user;
    const hashPassword = await bcrypt.hash(password, 10);
    
    user = {...user, password:hashPassword}

    return this.userModel.create(user)
  }

  

  async registerCompany(company: RegisterAuthCompanyDto) {
    const { password } = company;
    const hashPassword = await bcrypt.hash(password, 10);
    
    company = {...company, password:hashPassword}

    return this.companyModel.create(company)
  }
}
