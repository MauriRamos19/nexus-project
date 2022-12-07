import { Response, Request, NextFunction} from 'express'
import { User } from '../models/user.schema';
import bcrypt from 'bcrypt';
import { Company } from '../models/company.schema';
import { BusinessEntity } from '../models/business-entity.schema';
import jwt, { Secret } from 'jsonwebtoken'
import config from '../config';


declare module 'express' {
    interface Request {
      entity?: any;
    }
  }

export const signUpUser = async(req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        
        const entity = await BusinessEntity.findOne({email: req.body.email}).exec()

        if(entity) {
            return res.status(400).send({
                'msg': 'El correo ya esta en uso'
            })
        }

        await user.save().then((result:any) => {
            res.send(result);
            res.end()
        }).catch((error:any) => {
            res.send({message: 'Hubo un error al guardar', error})
            res.end();
        })
    } catch (error) {
        return res.status(400).send({'msg': 'Algo salio mal'});
    }
}

export const signUpCompany = async(req: Request, res: Response) => {
    try {
        const company = new Company(req.body);
        
        const entity = await BusinessEntity.findOne({email: req.body.email}).exec()

        if(entity) {
            return res.status(400).send({
                'msg': 'El correo ya esta en uso'
            })
        }

        await company.save().then((result:any) => {
            res.send(result);
            res.end()
        }).catch((error:any) => {
            res.send({message: 'Hubo un error al guardar', error})
            res.end();
        })
    } catch (error) {
        return res.status(400).send({'msg': 'Algo salio mal'});
    }
}

export const signIn = async(req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const entity = await BusinessEntity.findOne({email: email}).exec()

        if (!entity) {
            return res.status(400).json({ message: "User or company not found" });
        }

        if (!(await entity.comparePassword(password))) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        const token = await entity.generateToken()

        return res.status(201).send({access_token:token})

    } catch (error) {
        return res.status(400).send({"msg": "Hubo un error al iniciar sesion"})
    }

}


export const protect = async(req: Request, res: Response, next: NextFunction) => {
    
    if(!req.headers.authorization) {
        return res.status(400).send({'msg': 'Not auth'})
    }
    
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(403).send({'msg': 'Not found token'})
        }
        const entity = await jwt.verify(token, config.jwt_secret as Secret)
        req.entity = entity
        next() 
    } catch (error) {
        return res.status(400).send({'msg': 'Not auth'})
    }
    
    
}

