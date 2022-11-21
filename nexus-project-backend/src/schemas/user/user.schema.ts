import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLE_TYPE } from '../../constants/role.constants'
import { BusinessEntity } from '../business-entity/business-entity.schema';

export type UserDocument = HydratedDocument<User>;


@Schema({discriminatorKey: 'entityType'})
export class User extends BusinessEntity{
  
  @Prop()
  lastname: string;

  @Prop({
    type: String,
    default: ROLE_TYPE.CLIENT
  })
  roleType: ROLE_TYPE;

}

export const USER_MODEL = User.name
export const UserSchema = SchemaFactory.createForClass(User);
