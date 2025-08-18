// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('🚨 Error Handler Middleware:', err.message);
    console.error('Stack:', err.stack);

    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = { message, status: 404 };
    }

    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = { message, status: 400 };
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = { message, status: 400 };
    }

    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token';
        error = { message, status: 401 };
    }

    if (err.status === 429) {
        const message = 'Too many requests, please try again later';
        error = { message, status: 429 };
    }

    if (err.type === 'entity.parse.failed') {
        const message = 'Invalid JSON in request body';
        error = { message, status: 400 };
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        const message = 'File too large';
        error = { message, status: 400 };
    }

    if (err.message && err.message.includes('Gemini')) {
        const message = 'AI service temporarily unavailable';
        error = { message, status: 503 };
    }

    const statusCode = error.status || err.statusCode || 500;
    const message = error.message || 'Server Error';

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            originalError: err.message
        })
    });
};

module.exports = errorHandler;
