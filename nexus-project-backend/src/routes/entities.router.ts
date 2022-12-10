import { Router } from "express";
import { protect } from "../controllers/auth.controller";
import { addProduct, addProductToCart, deleteProduct, deleteProductFromCart, getCompany, getCompanyProductsById, getEntity, getProductById, getProducts, getProductsFromUser, getUsers } from "../controllers/entities.controller";


const multer = require('multer');



const storage = multer.diskStorage({});


var upload = multer({
    storage: storage,
    fileFilter: (req:any, file:any, cb:any) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const router = Router()

router.get('/users', protect, getUsers)
router.get('/company', getCompany)
router.get('/company/products', protect, getProducts)
router.post('/company/products', protect, upload.single('img'), addProduct)
router.get('/',protect, getEntity)
router.get('/user/company/:id/products', getCompanyProductsById)
router.get('/user/company/:id/products/:productId', getProductById)
router.post('/user/company/:id/products/:productId',protect, addProductToCart)
router.get('/user/cart', protect, getProductsFromUser)
router.put('/user/cart/:productId', protect, deleteProductFromCart)

export default router;