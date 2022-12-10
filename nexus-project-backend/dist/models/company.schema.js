"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const business_entity_schema_1 = require("./business-entity.schema");
const companySchema = new mongoose_1.default.Schema({
    RTN: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        default: []
    }
});
exports.Company = business_entity_schema_1.BusinessEntity.discriminator('Company', companySchema);
//# sourceMappingURL=company.schema.js.map