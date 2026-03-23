require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins and parse incoming JSON request bodies
app.use(cors());
app.use(express.json());

// Calls the Anthropic API with the given company name and returns the raw response JSON
async function callAnthropicAPI(companyName) {
    const prompt = `Produce a competitive intelligence brief for: ${companyName}

Return ONLY valid JSON in exactly this structure:
{
  "company": "company name",
  "snapshot": "2-3 sentence overview",
  "positioning": "market positioning and differentiation",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "recent_moves": ["development 1", "development 2"],
  "opportunities": "where a competitor could gain ground",
  "watch_items": ["watch item 1", "watch item 2"],
  "confidence": "High | Medium | Low",
  "disclaimer": "one sentence about knowledge cutoff"
}`;

    const requestBody = {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: 'You are a competitive intelligence analyst. Return ONLY valid JSON. No preamble, no markdown.',
        messages: [
            { role: 'user', content: prompt }
        ]
    };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(requestBody)
    });

    return response;
}

// Handles POST /api/analyse — validates input, calls the AI, and returns a structured brief
app.post('/api/analyse', async (req, res) => {
    const { company } = req.body;

    if (!company) {
        return res.status(400).json({ error: 'Company name is required' });
    }

    let apiResponse;
    try {
        apiResponse = await callAnthropicAPI(company);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to reach Anthropic API' });
    }

    if (!apiResponse.ok) {
        return res.status(500).json({ error: `API error: ${apiResponse.status}` });
    }

    let data;
    try {
        data = await apiResponse.json();
    } catch (err) {
        return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    let brief;
    try {
        const rawText = data.content[0].text;
        brief = JSON.parse(rawText);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    return res.json(brief);
});

// Starts the Express server on the configured port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
