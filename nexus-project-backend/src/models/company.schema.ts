
import mongoose from 'mongoose'
import { BusinessEntity } from './business-entity.schema'
import { CompanyDoc } from './company.model'


const companySchema = new mongoose.Schema<CompanyDoc>({
    RTN: {
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        default: []
    }
})

export const Company =  BusinessEntity.discriminator('Company', companySchema) 