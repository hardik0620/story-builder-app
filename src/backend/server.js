// backend/server.js - Enhanced with port checking
console.log('🚀 Starting Story Weaver server...');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const net = require('net');

console.log('📦 Loading environment variables...');
require('dotenv').config();

console.log('🔧 Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL
});

// Create Express app
console.log('🏗️  Creating Express app...');
const app = express();
const PORT = process.env.PORT || 5001;

// Function to check if port is available
const checkPort = (port) => {
    return new Promise((resolve, reject) => {
        const server = net.createServer();

        server.listen(port, () => {
            server.once('close', () => {
                resolve(port);
            });
            server.close();
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                reject(new Error(`Port ${port} is already in use`));
            } else {
                reject(err);
            }
        });
    });
};

// Function to find available port
const findAvailablePort = async (startPort) => {
    for (let port = startPort; port <= startPort + 10; port++) {
        try {
            await checkPort(port);
            return port;
        } catch (error) {
            console.log(`⚠️ Port ${port} is in use, trying next...`);
            continue;
        }
    }
    throw new Error(`No available ports found between ${startPort} and ${startPort + 10}`);
};

// Security middleware
console.log('🔒 Setting up security middleware...');
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Rate limiting
console.log('⏱️  Setting up rate limiting...');
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.',
    },
});

app.use('/api/', limiter);

// CORS configuration
console.log('🌐 Setting up CORS...');
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parsing middleware
console.log('📝 Setting up body parsing...');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    console.log('📊 Setting up Morgan logging...');
    app.use(morgan('combined'));
}

// Health check endpoint
console.log('💓 Setting up health check endpoint...');
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Story Weaver API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        port: PORT
    });
});

// API Routes
console.log('🛤️  Setting up API routes...');
try {
    // Load routes one by one with error handling
    console.log('📁 Loading AI routes...');
    const aiRoutes = require('./routes/aiRoutes');
    app.use('/api/ai', aiRoutes);
    console.log('✅ AI routes loaded');

    console.log('📁 Loading story routes...');
    const storyRoutes = require('./routes/storyRoutes');
    app.use('/api/stories', storyRoutes);
    console.log('✅ Story routes loaded');

    console.log('📁 Loading user routes...');
    const userRoutes = require('./routes/userRoutes');
    app.use('/api/users', userRoutes);
    console.log('✅ User routes loaded');
    console.log('📁 Loading generate title routes...');
    const generateTitleRoutes = require('./routes/generateTitleRoutes');
    app.use('/api/generate-title', generateTitleRoutes)

    console.log('✅ All API routes configured successfully');
} catch (error) {
    console.error('❌ Error setting up routes:', error.message);
    console.error('Full error:', error);
    process.exit(1);
}

// Serve static files from the React app (in production)
if (process.env.NODE_ENV === 'production') {
    console.log('🏭 Setting up production static files...');
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        error: 'API endpoint not found',
        message: `The requested endpoint ${req.originalUrl} does not exist.`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            error: 'Validation Error',
            message: errors
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid token',
            message: 'Please log in again'
        });
    }

    // Default error response
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Enhanced server startup with port checking
const startServer = async () => {
    try {
        console.log('🎬 Starting server...');

        let finalPort = PORT;

        try {
            await checkPort(PORT);
            console.log(`✅ Port ${PORT} is available`);
        } catch (error) {
            console.log(`⚠️ Port ${PORT} is in use, finding alternative...`);
            finalPort = await findAvailablePort(parseInt(PORT) + 1);
            console.log(`🔄 Using alternative port: ${finalPort}`);
        }

        const server = app.listen(finalPort, () => {
            console.log(`🚀 Story Weaver API server running on port ${finalPort}`);
            console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
            console.log(`🔗 API Health Check: http://localhost:${finalPort}/api/health`);
            console.log('');
            console.log('🎯 Available endpoints:');
            console.log(`  GET  http://localhost:${finalPort}/api/health`);
            console.log(`  GET  http://localhost:${finalPort}/api/ai/test`);
            console.log(`  POST http://localhost:${finalPort}/api/ai/chat`);
            console.log(`  POST http://localhost:${finalPort}/api/ai/writing-suggestions`);
            console.log(`  GET  http://localhost:${finalPort}/api/stories/propp-functions`);
            console.log(`  GET  http://localhost:${finalPort}/api/users/profile`);
            console.log('');
            console.log('✅ Server is ready to accept connections!');

            if (finalPort !== parseInt(PORT)) {
                console.log('');
                console.log('⚠️  IMPORTANT: Server is running on a different port!');
                console.log(`   Update your frontend API URL to: http://localhost:${finalPort}/api`);
                console.log('   Or kill the process using the original port and restart.');
            }
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('🛑 SIGTERM received, shutting down gracefully...');
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            console.log('🛑 SIGINT received, shutting down gracefully...');
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error('Unhandled Promise Rejection:', err.message);
    // Close server & exit process
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1);
});

// Start the server
startServer();

module.exports = app;