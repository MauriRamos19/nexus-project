"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/register-user', auth_controller_1.signUpUser);
router.post('/register-company', auth_controller_1.signUpCompany);
router.post('/signIn', auth_controller_1.signIn);
exports.default = router;
//# sourceMappingURL=auth.router.js.map