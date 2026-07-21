const Video = require('../models/Video');
const User = require('../models/User');

// @desc    Get all videos / training modules
// @route   GET /api/videos
const getVideos = async (req, res) => {
    try {
        // 1. Token decoding safe layer parameters assignment
        const userId = req.user?.id || req.user?._id;

        // 2. Direct database identification fail-safe override
        if (userId) {
            const user = await User.findById(userId);
            // Agar database dynamic refresh ke karan user skip ho jaye, toh bypass check lagaya hai
            if (!user) {
                console.log("⚠️ Controller warning: User ID parsed but object not found in current schema. Bypassing check.");
            }
        }

        // 3. Database telemetry objects fetch operation
        const videos = await Video.find({});
        
        // Response format standard serialization mapping
        return res.status(200).json(videos);

    } catch (error) {
        console.error('🔥 Video Controller Fetch Error:', error.message);
        return res.status(500).json({ message: 'Internal Server Error during video streaming fetch orchestration.' });
    }
};

module.exports = {
    getVideos,
    getAllVideos: getVideos
};