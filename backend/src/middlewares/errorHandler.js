import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    logger.error(err.message);

    const status = err.statusCode || 500;

    res.status(status).json({
        error: err.message || 'Internal Server Error'
    })
}