import mongoose, { Document } from "mongoose";

export interface CompanyDoc extends Document{
    RTN:String;
    phone: string;
    password: string;
    products: any;
    comparePassword(password: string): Promise<boolean>;
    generateToken(): string;
}