const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

// Check validation matrix to avoid single named destructure failure
const upgradeHandler = subscriptionController.verifyPaymentAndUpdate || 
                       subscriptionController.updateSubscription || 
                       subscriptionController.default ||
                       subscriptionController;

// Dynamic check layer to gracefully fallback
router.post('/upgrade', protect, upgradeHandler);
router.post('/verify', protect, upgradeHandler);

module.exports = router;