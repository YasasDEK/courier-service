"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "courier_service_db",
    password: "Dilshan@123",
    port: 8000,
});
exports.default = pool;
//# sourceMappingURL=db.js.map