"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
router.post('/register', auth_controller_1.default.register);
router.post('/login', auth_controller_1.default.login);
router.get('/getname/:userId', auth_controller_1.default.getUsernameById);
exports.default = router;
