"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("../controllers/feedback.controller");
const router = express_1.default.Router();
// POST route for submitting feedback
router.post('/submit', feedback_controller_1.submitFeedback);
router.get('/getfeedback', feedback_controller_1.fetchAllFeedback);
exports.default = router;
