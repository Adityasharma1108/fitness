const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    try {
        // Token dono format mein check karega (Standard aur Custom)
        let token = req.header('x-auth-token') || req.headers.authorization;

        // Agar Bearer token hai, toh sirf actual token nikalega
        if (token && token.startsWith('Bearer')) {
            token = token.split(' ')[1];
        }

        if (!token || token === 'null' || token === 'undefined') {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Token verify karega (ENV file wale secret se ya direct key se)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretfitnesskey123');
        
        // Verified user details set kar dega
        req.user = decoded.user || decoded; 
        next();
        
    } catch (error) {
        console.error('🔥 Token Verification Error:', error.message);
        return res.status(401).json({ message: 'Token is not valid!' });
    }
};

module.exports = { protect };