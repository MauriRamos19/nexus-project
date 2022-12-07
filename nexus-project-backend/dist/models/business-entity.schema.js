"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const baseOptions = {
    discriminatorKey: 'entitytype',
    collection: 'entities', // the name of our collection
};
const businessEntitySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
}, baseOptions);
businessEntitySchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt_1.default.genSalt(10, (err, salt) => {
            bcrypt_1.default.hash(this.password, salt, (err, hash) => {
                this.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
businessEntitySchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compare(password, this.password);
};
businessEntitySchema.methods.generateToken = function () {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ id: this._id }, config_1.default.jwt_secret, { expiresIn: '1h' }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
};
exports.BusinessEntity = mongoose_1.default.model('BusinessEntity', businessEntitySchema);
//# sourceMappingURL=business-entity.schema.js.map