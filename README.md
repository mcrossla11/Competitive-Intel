# Competitive Intelligence Brief Generator

An AI-powered web tool that generates structured competitive intelligence briefs on any company. Users enter a company name and receive a formatted report covering company snapshot, market positioning, strengths, weaknesses, recent strategic moves, opportunities for competitors, and a watch list — all produced in seconds via the Anthropic Claude API. The tool includes a one-click Word document export and runs on a lightweight Express.js backend that keeps the API key server-side and out of the browser.

## Requirements

The Anthropic API key must be set as an environment variable named `ANTHROPIC_API_KEY` on the server before starting the backend. Without it, brief generation will fail.

## Getting started

```bash
npm install
npm start
```

Then open `index.html` in a browser. The backend runs on port 3000 by default.

## Deployment

Set the `BACKEND_URL` variable (e.g. `window.BACKEND_URL = 'https://your-backend.example.com'`) in your hosting environment so the frontend points to the correct server. If `BACKEND_URL` is not set, the frontend falls back to `http://localhost:3000`.
