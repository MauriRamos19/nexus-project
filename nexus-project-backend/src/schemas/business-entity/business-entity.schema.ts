import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BusinessEntityDocument = HydratedDocument<BusinessEntity>;


@Schema({ discriminatorKey: 'entityType' })
export class BusinessEntity {

  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  password: string

}


export const BUSINESS_ENTITY_MODEL = BusinessEntity.name;
export const BusinessEntitySchema = SchemaFactory.createForClass(BusinessEntity);
