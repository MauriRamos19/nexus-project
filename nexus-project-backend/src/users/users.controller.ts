
import { Controller, Get, Query, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/schemas/user/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
 

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  
  @Get()
  findOne(@Body() data: any) {
    return this.usersService.findOne(data.email)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) : Promise<User> {
    return this.usersService.findById(id)
  }
}
