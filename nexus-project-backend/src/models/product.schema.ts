
import mongoose, { model } from 'mongoose'
import { Company } from './company.schema';
import { ProductDoc } from './product.model'


const productSchema = new mongoose.Schema<ProductDoc>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: String,
    price: {
        type: Number,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
})


productSchema.pre('remove', function(next) {
    let companyId = this.getQuery()['companyId']
    let _id = this.getQuery()['_id']
    Company.updateOne({_id: companyId }, { $pull: { products: {productId: _id} } }, { multi:true }).exec();
    next();
});



export const Product =  model('Product', productSchema) 