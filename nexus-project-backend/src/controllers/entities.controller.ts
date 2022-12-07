import { Response, Request} from 'express'
import { BusinessEntity } from '../models/business-entity.schema';
import { Company } from '../models/company.schema';
import { User } from '../models/user.schema';

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


