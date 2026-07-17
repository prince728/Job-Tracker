const redis = require('../config/redis');

const aiRateLimiterMiddleware = async (req, res, next) => {
    try {
        const ip = req.ip;
        const key = `AIrateLimiter:${ip}`;
        const limit = 10;

        const currentRequests = await redis.incr(key);

        if (currentRequests == 1) {
            await redis.expire(key, 20);
        }

        if (currentRequests > limit) {
            return res.status(429).json({
                success: false,
                message: "Too many requests. Please try again later."
            })
        }
        next();

    } catch (error) {
        console.error("Rate limiter error:", error.message);
        next();
    }

}

module.exports = aiRateLimiterMiddleware