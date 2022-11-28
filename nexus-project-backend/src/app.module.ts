import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    CompanyModule,
    MongooseModule.forRoot('mongodb+srv://admin:TXK0110bpQghbBmV@cluster0.uymtugh.mongodb.net/nexus')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
