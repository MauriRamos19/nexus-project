import { Response, Request} from 'express'
import { BusinessEntity } from '../models/business-entity.schema';
import { Company } from '../models/company.schema';
import { Product } from '../models/product.schema';
import { User } from '../models/user.schema';
import mongoose, {ObjectId} from 'mongoose';
import cloudinary from '../utils/cloudinary' 



declare module 'express' {
    interface Request {
        file?: any;
    }
  }

export const getUsers = async(req: Request, res: Response) => {
    try {
        const users = await User.find().exec();


        res.status(201).send(users)
    } catch (error) {
        res.status(400).send({'msg': 'Algo salio mal'});
    }
}

export const getCompany = async(req: Request, res: Response) => {
    try {
        const company = await Company.find().exec();


        res.status(201).send(company)
    } catch (error) {
        res.status(400).send({'msg': 'Algo salio mal'});
    }
}


export const getEntity = async(req: Request, res: Response) => {
    const entity = req.entity

    try {
        const bussinessEnitity = await BusinessEntity.findById(entity.id).select('-password').exec()

        return res.status(201).send(bussinessEnitity)
    } catch (error) {
        return res.status(400).send({'msg': "Ha ocurrido un error"});
    }
}


export const addProduct = async(req: Request, res: Response) => {
    const entity = req.entity

    try {

        if(!entity) {
            return res.status(403).send({'msg': 'Not Auth'})
        }

        const { name, description, price  } = req.body
        const file = req.file

        const product = new Product({ name, description, price, companyId: entity.id })
        
        if( file ) {
            const { secure_url } = await cloudinary.uploader.upload(file.path, {
                upload_preset: 'ml_default',
                folder: 'companiesProducts'
            })
            product.img = secure_url
        }

        product.save().then((saveRes:any)=> {
            // Company.findByIdAndUpdate(entity.id, { $push: { products : { productId: saveRes._id }}}, { new: true }).exec()
            res.send(saveRes);
            res.end()
        }).catch(err => {
            res.send({'msg': 'Ha ocurrido un error '+err});
            res.end()
        })
        
    } catch (error) {
        return res.status(400).send({'msg': "Ha ocurrido un error"+error});
    }
}

export const getProducts = async(req: Request, res: Response) => {
    const entity = req.entity

    try {

        if(!entity) {
            return res.status(403).send({'msg': 'Not Auth'})
        }

        const products = await Product.find({companyId: entity.id}).exec();

        res.status(201).send({products})
    } catch (error) {
        return res.status(400).send({'msg': "Ha ocurrido un error"+error});
    }
}

export const deleteProduct = async(req: Request, res: Response) => {
    const entity = req.entity

    try {

        if(!entity) {
            return res.status(403).send({'msg': 'Not Auth'})
        }
        await Product.findByIdAndDelete({_id: req.params.id},{new:true}).exec();
        res.status(201).send({'msg': 'Producto eliminado'})
    } catch (error) {
        return res.status(400).send({'msg': "Ha ocurrido un error"+error});
    }
}

export const getCompanyProductsById = async(req: Request, res: Response) => {
    try {

        const products = await Product.find({companyId: req.params.id}).exec();
        res.status(201).send({products})
    } catch (error) {
        return res.status(400).send({'msg': "Ha ocurrido un error"+error});
    }
}

export const getProductById = async(req: Request, res: Response) => {
    try {

        const product = await Product.findById(req.params.productId).exec();
        res.status(201).send(product)
    } catch (error) {
        return res.status(400).send({'msg': "Ha ocurrido un error"+error});
    }
}

export const addProductToCart = async(req: Request, res: Response) => {
    const entity = req.entity;
    try {

        const user = await User.findById(entity.id);
        user.cart.push(req.params.productId);
        user.save()
        res.status(201).send({'msg':'Producto agregado al carrito'})
    } catch (error) {
        return res.status(400).send({'msg': "Ha ocurrido un error"+error});
    }
}

export const deleteProductFromCart = async(req: Request, res: Response) => {
    const entity = req.entity;
    const productId = req.params.productId
    try {

        const user = await User.findById(entity.id)
        user.cart = user.cart.filter( (id:any) => id.toString() !== productId)
        await user.save()
        res.status(201).send({'msg':'Producto eliminado al carrito'})
    } catch (error) {
        return res.status(400).send({'msg': "Ha ocurrido un error"+error});
    }
}


export const getProductsFromUser = async(req: Request, res: Response) => {
    const entity = req.entity;
    try {

        const user = await User.findById(entity.id).populate('cart')
    
        res.status(201).send(user.cart)
    } catch (error) {
        return res.status(400).send({'msg': "Ha ocurrido un error"+error});
    }
}
