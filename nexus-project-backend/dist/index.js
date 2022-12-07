"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const entities_router_1 = __importDefault(require("./routes/entities.router"));
const database_1 = __importDefault(require("./db/database"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const PORT = config_1.default.port;
const database = new database_1.default();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/auth', auth_router_1.default);
app.use('/api/entity', entities_router_1.default);
app.listen(PORT, () => {
    console.log(`El servidor se levanto en el puerto ${PORT}`);
});
//# sourceMappingURL=index.js.map