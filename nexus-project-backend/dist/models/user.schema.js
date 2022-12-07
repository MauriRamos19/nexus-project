"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const business_entity_schema_1 = require("./business-entity.schema");
const user_model_1 = require("./user.model");
const userSchema = new mongoose_1.default.Schema({
    lastname: {
        type: String,
        required: true
    },
    roleType: {
        type: String,
        enum: user_model_1.Role,
        default: user_model_1.Role.CLIENT
    }
});
exports.User = business_entity_schema_1.BusinessEntity.discriminator('User', userSchema);
//# sourceMappingURL=user.schema.js.map