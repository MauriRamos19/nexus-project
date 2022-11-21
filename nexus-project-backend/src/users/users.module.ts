import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, USER_MODEL } from 'src/schemas/user/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})

export class UsersModule {}
