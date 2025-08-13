// backend/test-startup.js
console.log('🔍 Testing backend startup...');

try {
    console.log('1. Loading environment variables...');
    require('dotenv').config();
    console.log(`✅ Environment loaded. PORT: ${process.env.PORT}, NODE_ENV: ${process.env.NODE_ENV}`);

    console.log('2. Testing basic dependencies...');
    const express = require('express');
    const cors = require('cors');
    const helmet = require('helmet');
    console.log('✅ Basic dependencies loaded');

    console.log('3. Testing middleware...');
    const errorHandler = require('./middleware/errorHandler');
    console.log('✅ Error handler loaded');

    console.log('4. Testing controllers...');
    const aiController = require('./controllers/aiController');
    console.log('✅ AI controller loaded');

    console.log('5. Testing routes...');
    const aiRoutes = require('./routes/aiRoutes');
    const storyRoutes = require('./routes/storyRoutes');
    const userRoutes = require('./routes/userRoutes');
    const generateTitleRoutes = require('./routes/generateTitleRoutes');
    console.log('✅ All routes loaded');

    console.log('6. Creating test Express app...');
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    // Test routes
    app.use('/api/ai', aiRoutes);
    app.use('/api/stories', storyRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/generate-title', generateTitleRoutes);
    app.use(errorHandler);

    console.log('✅ Express app configured successfully');

    console.log('7. Testing health endpoint...');
    app.get('/api/health', (req, res) => {
        res.json({
            status: 'OK',
            message: 'Story Weaver API is running',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development'
        });
    });

    console.log('🎉 Backend startup test completed successfully!');
    console.log('Ready to start server with: npm run dev');

} catch (error) {
    console.error('❌ Backend startup test failed:', error.message);
    console.error('Full error:', error);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Make sure all dependencies are installed: npm install');
    console.log('2. Check that all files exist in the correct locations');
    console.log('3. Verify your .env file has the correct variables');
    console.log('4. Run: node test-startup.js to test again');
    process.exit(1);
}