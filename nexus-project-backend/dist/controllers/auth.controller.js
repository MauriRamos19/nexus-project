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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.signIn = exports.signUpCompany = exports.signUpUser = void 0;
const user_schema_1 = require("../models/user.schema");
const company_schema_1 = require("../models/company.schema");
const business_entity_schema_1 = require("../models/business-entity.schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_schema_1.User(req.body);
        const entity = yield business_entity_schema_1.BusinessEntity.findOne({ email: req.body.email }).exec();
        if (entity) {
            return res.status(400).send({
                'msg': 'El correo ya esta en uso'
            });
        }
        yield user.save().then((result) => {
            res.send(result);
            res.end();
        }).catch((error) => {
            res.send({ message: 'Hubo un error al guardar', error });
            res.end();
        });
    }
    catch (error) {
        return res.status(400).send({ 'msg': 'Algo salio mal' });
    }
});
exports.signUpUser = signUpUser;
const signUpCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = new company_schema_1.Company(req.body);
        const entity = yield business_entity_schema_1.BusinessEntity.findOne({ email: req.body.email }).exec();
        if (entity) {
            return res.status(400).send({
                'msg': 'El correo ya esta en uso'
            });
        }
        yield company.save().then((result) => {
            res.send(result);
            res.end();
        }).catch((error) => {
            res.send({ message: 'Hubo un error al guardar', error });
            res.end();
        });
    }
    catch (error) {
        return res.status(400).send({ 'msg': 'Algo salio mal' });
    }
});
exports.signUpCompany = signUpCompany;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const entity = yield business_entity_schema_1.BusinessEntity.findOne({ email: email }).exec();
        if (!entity) {
            return res.status(400).json({ message: "User or company not found" });
        }
        if (!(yield entity.comparePassword(password))) {
            return res.status(400).json({ message: "Password is incorrect" });
        }
        const token = yield entity.generateToken();
        return res.status(201).send({ access_token: token });
    }
    catch (error) {
        return res.status(400).send({ "msg": "Hubo un error al iniciar sesion" });
    }
});
exports.signIn = signIn;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.status(400).send({ 'msg': 'Not auth' });
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).send({ 'msg': 'Not found token' });
        }
        const entity = yield jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        req.entity = entity;
        next();
    }
    catch (error) {
        return res.status(400).send({ 'msg': 'Not auth' });
    }
});
exports.protect = protect;
//# sourceMappingURL=auth.controller.js.map