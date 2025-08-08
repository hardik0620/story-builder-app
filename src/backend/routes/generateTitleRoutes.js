const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// POST /generate-title
router.post('', async (req, res) => {
    const { theme } = req.body;
    if (!theme) {
        return res.status(400).json({ error: 'Theme is required' });
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const prompt = `Suggest a creative, magical, and kid-friendly story title for a story with the theme "${theme}". Only reply with the title.`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }]
    };
    console.log('🔍 Generating title for theme:', theme);
    try {
        const geminiRes = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const geminiData = await geminiRes.json();
        console.log('Gemini response:', geminiData);
        const title = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        res.status(200).json({ title });
    } catch (error) {
        console.error('Gemini API error:', error);
        res.status(500).json({ error: 'Failed to generate title' });
    }
});

module.exports = router;
