"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
class Database {
    constructor() {
        this.conect();
    }
    conect() {
        mongoose_1.default
            .connect(config_1.default.mongo_uri) //Asincrona
            .then(result => console.log('Se conecto a mongodb'))
            .catch(error => console.log(error));
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map