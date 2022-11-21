import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BUSINESS_ENTITY_MODEL, BusinessEntitySchema } from "./business-entity/business-entity.schema";
import { UserSchema, USER_MODEL } from "./user/user.schema";
import { CompanySchema, COMPANY_MODEL } from "./company/company.schema";

const MODELS = [
  {
    name: BUSINESS_ENTITY_MODEL,
    schema: BusinessEntitySchema,
    discriminators: [
      { name: USER_MODEL, schema: UserSchema },
      { name: COMPANY_MODEL, schema: CompanySchema },
    ],
  }
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}