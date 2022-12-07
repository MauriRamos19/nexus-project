import mongoose from "mongoose";
import config from "../config";

class Database {

    constructor(){
        this.conect()
    }

    conect(){
        mongoose
        .connect(config.mongo_uri as string) //Asincrona
        .then(result=>console.log('Se conecto a mongodb'))
        .catch(error=>console.log(error));
    }
}

export default Database;