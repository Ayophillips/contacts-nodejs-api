const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
    // Generate a unique request ID
    const requestId = require('crypto').randomUUID();
    req.requestId = requestId;

    logger.info({
        type: 'REQUEST',
        requestId,
        method: req.method,
        path: req.path,
        query: req.query,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        timestamp: new Date().toISOString()
    });

    res.on('finish', () => {
        logger.info({
            type: 'RESPONSE',
            requestId,
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            responseTime: Date.now() - req.startTime,
            timestamp: new Date().toISOString()
        });
    });

    req.startTime = Date.now();
    next();
};

module.exports = requestLogger;
