// routes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('./controllers/feedbackController');

// Route to fetch feedback for admin panel
router.get('/admin/feedback', feedbackController.fetchAllFeedbackForAdmin);

module.exports = router;
