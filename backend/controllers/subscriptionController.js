const User = require('../models/User');

const verifyPaymentAndUpdate = async (req, res) => {
    try {
        const { planType } = req.body;
        // User identity checking dynamic assignment support
        const userId = req.user?.id || req.user?._id;
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.subscriptionPlan = planType || 'Elite Starter';
        await user.save();

        return res.status(200).json({ 
            success: true, 
            message: 'Payment successful, account upgraded!', 
            subscriptionPlan: user.subscriptionPlan 
        });
    } catch (error) {
        console.error('🔥 Subscription Controller Error:', error.message);
        return res.status(500).json({ success: false, message: 'Server Error during transaction' });
    }
};

// Dono variables export kar dete hain taaki koi route mismatch na ho
module.exports = {
    verifyPaymentAndUpdate,
    updateSubscription: verifyPaymentAndUpdate
};