"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const entities_controller_1 = require("../controllers/entities.controller");
const multer = require('multer');
const storage = multer.diskStorage({});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
const router = (0, express_1.Router)();
router.get('/users', auth_controller_1.protect, entities_controller_1.getUsers);
router.get('/company', entities_controller_1.getCompany);
router.get('/company/products', auth_controller_1.protect, entities_controller_1.getProducts);
router.post('/company/products', auth_controller_1.protect, upload.single('img'), entities_controller_1.addProduct);
router.delete('/company/products/:id', auth_controller_1.protect, entities_controller_1.deleteProduct);
router.get('/', auth_controller_1.protect, entities_controller_1.getEntity);
router.get('/user/company/:id/products', entities_controller_1.getCompanyProductsById);
router.get('/user/company/:id/products/:productId', entities_controller_1.getProductById);
router.post('/user/company/:id/products/:productId', auth_controller_1.protect, entities_controller_1.addProductToCart);
router.get('/user/cart', auth_controller_1.protect, entities_controller_1.getProductsFromUser);
router.put('/user/cart/:productId', auth_controller_1.protect, entities_controller_1.deleteProductFromCart);
exports.default = router;
//# sourceMappingURL=entities.router.js.map