
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
 

@Controller('company')
export class CompanyController {

constructor(private companyService: CompanyService) {}

  @Post()
  create(@Body() createUserDto: CreateCompanyDto) {
    return this.companyService.create(createUserDto)
  }


  @Get()
  findOne(@Body() data: any) {
    return this.companyService.findOne(data.email);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
