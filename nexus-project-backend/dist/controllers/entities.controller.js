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
exports.getProductsFromUser = exports.deleteProductFromCart = exports.addProductToCart = exports.getProductById = exports.getCompanyProductsById = exports.deleteProduct = exports.getProducts = exports.addProduct = exports.getEntity = exports.getCompany = exports.getUsers = void 0;
const business_entity_schema_1 = require("../models/business-entity.schema");
const company_schema_1 = require("../models/company.schema");
const product_schema_1 = require("../models/product.schema");
const user_schema_1 = require("../models/user.schema");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
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
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entity = req.entity;
    try {
        if (!entity) {
            return res.status(403).send({ 'msg': 'Not Auth' });
        }
        const { name, description, price } = req.body;
        const file = req.file;
        const product = new product_schema_1.Product({ name, description, price, companyId: entity.id });
        if (file) {
            const { secure_url } = yield cloudinary_1.default.uploader.upload(file.path, {
                upload_preset: 'ml_default',
                folder: 'companiesProducts'
            });
            product.img = secure_url;
        }
        product.save().then((saveRes) => {
            // Company.findByIdAndUpdate(entity.id, { $push: { products : { productId: saveRes._id }}}, { new: true }).exec()
            res.send(saveRes);
            res.end();
        }).catch(err => {
            res.send({ 'msg': 'Ha ocurrido un error ' + err });
            res.end();
        });
    }
    catch (error) {
        return res.status(400).send({ 'msg': "Ha ocurrido un error" + error });
    }
});
exports.addProduct = addProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entity = req.entity;
    try {
        if (!entity) {
            return res.status(403).send({ 'msg': 'Not Auth' });
        }
        const products = yield product_schema_1.Product.find({ companyId: entity.id }).exec();
        res.status(201).send({ products });
    }
    catch (error) {
        return res.status(400).send({ 'msg': "Ha ocurrido un error" + error });
    }
});
exports.getProducts = getProducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entity = req.entity;
    try {
        if (!entity) {
            return res.status(403).send({ 'msg': 'Not Auth' });
        }
        yield product_schema_1.Product.findByIdAndDelete({ _id: req.params.id }, { new: true }).exec();
        res.status(201).send({ 'msg': 'Producto eliminado' });
    }
    catch (error) {
        return res.status(400).send({ 'msg': "Ha ocurrido un error" + error });
    }
});
exports.deleteProduct = deleteProduct;
const getCompanyProductsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_schema_1.Product.find({ companyId: req.params.id }).exec();
        res.status(201).send({ products });
    }
    catch (error) {
        return res.status(400).send({ 'msg': "Ha ocurrido un error" + error });
    }
});
exports.getCompanyProductsById = getCompanyProductsById;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_schema_1.Product.findById(req.params.productId).exec();
        res.status(201).send(product);
    }
    catch (error) {
        return res.status(400).send({ 'msg': "Ha ocurrido un error" + error });
    }
});
exports.getProductById = getProductById;
const addProductToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entity = req.entity;
    try {
        const user = yield user_schema_1.User.findById(entity.id);
        user.cart.push(req.params.productId);
        user.save();
        res.status(201).send({ 'msg': 'Producto agregado al carrito' });
    }
    catch (error) {
        return res.status(400).send({ 'msg': "Ha ocurrido un error" + error });
    }
});
exports.addProductToCart = addProductToCart;
const deleteProductFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entity = req.entity;
    const productId = req.params.productId;
    try {
        const user = yield user_schema_1.User.findById(entity.id);
        user.cart = user.cart.filter((id) => id.toString() !== productId);
        yield user.save();
        res.status(201).send({ 'msg': 'Producto eliminado al carrito' });
    }
    catch (error) {
        return res.status(400).send({ 'msg': "Ha ocurrido un error" + error });
    }
});
exports.deleteProductFromCart = deleteProductFromCart;
const getProductsFromUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entity = req.entity;
    try {
        const user = yield user_schema_1.User.findById(entity.id).populate('cart');
        res.status(201).send(user.cart);
    }
    catch (error) {
        return res.status(400).send({ 'msg': "Ha ocurrido un error" + error });
    }
});
exports.getProductsFromUser = getProductsFromUser;
//# sourceMappingURL=entities.controller.js.map