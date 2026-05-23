const rateLimitStore = new Map();

const chatRateLimiter = (maxRequests = 30, windowMs = 60 * 1000) => {
  return (req, res, next) => {
    const key = req.headers['x-session-id'] || req.ip || 'anonymous';
    const now = Date.now();
    const entry = rateLimitStore.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > entry.resetAt) {
      entry.count = 0;
      entry.resetAt = now + windowMs;
    }

    entry.count += 1;
    rateLimitStore.set(key, entry);

    if (entry.count > maxRequests) {
      return res.status(429).json({
        message: 'Too many requests. Please wait a moment before sending more messages.',
      });
    }

    next();
  };
};

module.exports = { chatRateLimiter };
