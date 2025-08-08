// backend/test-imports.js
console.log('Testing imports...');

try {
    console.log('1. Testing dotenv...');
    require('dotenv').config();
    console.log('✅ dotenv loaded');

    console.log('2. Testing express...');
    const express = require('express');
    console.log('✅ express loaded');

    console.log('3. Testing aiController...');
    const aiController = require('./controllers/aiController');
    console.log('✅ aiController loaded');

    console.log('4. Testing routes...');
    const aiRoutes = require('./routes/aiRoutes');
    const storyRoutes = require('./routes/storyRoutes');
    const userRoutes = require('./routes/userRoutes');
    console.log('✅ All routes loaded');

    console.log('🎉 All imports successful!');
} catch (error) {
    console.error('❌ Import failed:', error.message);
    console.error('Full error:', error);
}