"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const baseOptions = {
    discriminatorKey: 'entitytype',
    collection: 'entities', // the name of our collection
};
const entitySchema = new mongoose_1.default.Schema({}, baseOptions);
module.exports = mongoose_1.default.model('Entity');
