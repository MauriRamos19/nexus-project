import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private readonly userModule: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto) {
        const createUser = new this.userModule(createUserDto);
        return createUser.save();
    }

    async findAll(): Promise<User[]> { 
        return this.userModule.find().exec();
    }
    
    async findOne(email: any): Promise<User> { 
        return this.userModule.findOne({ email: email }).exec(); 
    }

    async findById(id: string): Promise<User> { 
        return this.userModule.findById(id).exec(); 
    }

 
    async remove(id: string) { 
    return this.userModule.findByIdAndRemove({ _id: id }).exec(); 
    }
    
}
