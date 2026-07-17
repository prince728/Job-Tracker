const redis = require('../config/redis');

const rateLimiterMiddleware = async (req, res, next) => {
    try {
        const ip = req.ip;
        const key = `rateLimit:${ip}`;
        const limit = 100; 


        const currentRequests = await redis.incr(key);

        if (currentRequests === 1) {
            await redis.expire(key, 60);
        }

        if (currentRequests > limit) {
            return res.status(429).json({
                success: false,
                message: "Too many requests. Please try again later."
            });
        }

        next();

    } catch (error) {
        console.error("Rate limiter error:", error.message);
        next(); 
    }
};

module.exports = rateLimiterMiddleware;
