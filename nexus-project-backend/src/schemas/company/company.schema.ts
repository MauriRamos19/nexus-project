import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { BusinessEntity } from '../business-entity/business-entity.schema';

export type CompanyDocument = HydratedDocument<Company>;


@Schema({discriminatorKey: 'entityType'})
export class Company extends BusinessEntity{
  @Prop()
  RTN: string;

  @Prop()
  phone: string;
}

export const COMPANY_MODEL = Company.name;
export const CompanySchema = SchemaFactory.createForClass(Company);
