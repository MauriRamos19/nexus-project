import { Document } from "mongoose";

export interface CompanyDoc extends Document{
    RTN:String;
    phone: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
    generateToken(): string;
}