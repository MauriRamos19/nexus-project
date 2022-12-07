
import mongoose from 'mongoose'
import { BusinessEntity } from './business-entity.schema'
import { Role, UserDoc } from './user.model'


const userSchema = new mongoose.Schema<UserDoc>({
    lastname: {
        type: String,
        required: true
    },
    roleType: {
        type: String,
        enum: Role,
        default: Role.CLIENT
    }
})


export const User =  BusinessEntity.discriminator('User', userSchema) 