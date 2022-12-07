
import mongoose, { Document } from "mongoose";
import bcrypt, { hash } from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import config from "../config";


const baseOptions = {
    discriminatorKey: 'entitytype', // our discriminator key, could be anything
    collection: 'entities', // the name of our collection
  };


interface BusinessEntity extends Document {
  name: string;
  country: string;
  city: string;
  email:string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
}

const businessEntitySchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    country: {
      type: String,
      trim: true,
      required: true
    },
    city: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    }
}, baseOptions) 


businessEntitySchema.pre("save", function(next) {
  if(this.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

businessEntitySchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
}

businessEntitySchema.methods.generateToken = function (): Promise<Object> {
  return new Promise((resolve, reject) => {
    jwt.sign({id: this._id}, config.jwt_secret as Secret, { expiresIn: '1h'}, (err:any, token:any) => {
      if(err) reject(err)
      resolve(token)
    })
  })
}

export const BusinessEntity =  mongoose.model<BusinessEntity>('BusinessEntity', businessEntitySchema)