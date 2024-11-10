// feedbackController.js
"use strict";
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const feedback_models_1 = __importDefault(require("../models/feedback.models"));

// Fetch all feedback for the admin panel
const fetchAllFeedbackForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all feedback and populate userId if references exist
        const feedbacks = yield feedback_models_1.default.find({}).populate('userId', 'username email');
        res.status(200).json(feedbacks);
    }
    catch (error) {
        console.error('Error fetching feedback for admin:', error);
        res.status(500).json({ message: 'Failed to fetch feedback for admin panel.' });
    }
});

exports.fetchAllFeedbackForAdmin = fetchAllFeedbackForAdmin;
