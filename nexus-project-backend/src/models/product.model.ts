import mongoose, { Document } from "mongoose";


export interface ProductDoc extends Document {
    name: string;
    description: string;
    img: string;
    price: Number;
    companyId: mongoose.Schema.Types.ObjectId
  }