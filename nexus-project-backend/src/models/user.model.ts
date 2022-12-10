import mongoose, { Document } from "mongoose";

export enum Role {
    ADMIN = 'admin',
    CLIENT = 'client'
}

export interface UserDoc extends Document {
    name: string;
    lastname: string;
    country: string;
    city: string;
    email: string;
    password: string
    roleType: Role;
    comparePassword(password: string): Promise<boolean>;
    generateToken(): string;
    cart: any,
    products: any
  }