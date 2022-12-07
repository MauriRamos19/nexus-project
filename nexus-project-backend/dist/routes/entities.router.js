"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const entities_controller_1 = require("../controllers/entities.controller");
const router = (0, express_1.Router)();
router.get('/users', auth_controller_1.protect, entities_controller_1.getUsers);
router.get('/company', entities_controller_1.getCompany);
router.get('/', auth_controller_1.protect, entities_controller_1.getEntity);
exports.default = router;
//# sourceMappingURL=entities.router.js.map