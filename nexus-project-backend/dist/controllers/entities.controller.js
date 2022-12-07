"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntity = exports.getCompany = exports.getUsers = void 0;
const business_entity_schema_1 = require("../models/business-entity.schema");
const company_schema_1 = require("../models/company.schema");
const user_schema_1 = require("../models/user.schema");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_schema_1.User.find().exec();
        res.status(201).send(users);
    }
    catch (error) {
        res.status(400).send({ 'msg': 'Algo salio mal' });
    }
});
exports.getUsers = getUsers;
const getCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield company_schema_1.Company.find().exec();
        res.status(201).send(company);
    }
    catch (error) {
        res.status(400).send({ 'msg': 'Algo salio mal' });
    }
});
exports.getCompany = getCompany;
const getEntity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entity = req.entity;
    try {
        const bussinessEnitity = yield business_entity_schema_1.BusinessEntity.findById(entity.id).select('-password').exec();
        return res.status(201).send(bussinessEnitity);
    }
    catch (error) {
        return res.status(400).send({ 'msg': "Ha ocurrido un error" });
    }
});
exports.getEntity = getEntity;
//# sourceMappingURL=entities.controller.js.map