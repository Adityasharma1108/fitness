const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');

// Check controller structure dynamically to avoid undefined handler function crash
const getVideosHandler = videoController.getVideos || 
                         videoController.getAllVideos || 
                         videoController.default || 
                         videoController;

// Safely map the endpoint route
router.get('/', protect, getVideosHandler);

module.exports = router;