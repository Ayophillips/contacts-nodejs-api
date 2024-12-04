// middleware/errorLogger.js
const logger = require('../utils/logger');

const errorLogger = (err, req, res, next) => {
    logger.error({
        type: 'ERROR',
        requestId: req.requestId,
        error: {
            message: err.message,
            stack: err.stack,
            name: err.name
        },
        path: req.path,
        method: req.method,
        statusCode: res.statusCode,
        timestamp: new Date().toISOString()
    });
    next(err);
};

module.exports = errorLogger;

