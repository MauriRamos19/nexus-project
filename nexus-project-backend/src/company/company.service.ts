import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/schemas/company/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {

    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const createCompany = new this.companyModel(createCompanyDto);
        return createCompany.save();
    }

    async findAll(): Promise<Company[]> { 
        return this.companyModel.find().exec();
    }
    
    async findOne(email: any): Promise<Company> { 
        return this.companyModel.findOne({ email: email }).exec(); 
    }


 
    async remove(id: string) { 
    return this.companyModel.findByIdAndRemove({ _id: id }).exec(); 
    }
    
}
