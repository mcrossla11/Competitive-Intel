# Competitive Intelligence Brief Generator

## What this project is
A multi-file web tool with an Express.js backend and HTML frontend. Users enter a company name and receive a structured competitive intelligence brief powered by the Anthropic API. The API key is stored server-side only — never exposed to the browser.

## Architecture
- server.js — Express backend, runs on port 3000, proxies all Anthropic API calls
- index.html — Single-file frontend, calls backend at /api/analyse
- .env — API key storage (never committed)
- package.json — Node dependencies (express, dotenv, cors)

## Standards
- Add a # comment above every function explaining what it does
- All error handling must return JSON with an "error" field — never plain text
- CORS must be enabled on the backend so the frontend can call it
- API key is read from process.env.ANTHROPIC_API_KEY — never hardcoded
- Keep all code readable by a non-developer — avoid clever one-liners

## Constraints
- Do not use TypeScript — plain JavaScript only
- Do not add a database or session management
- Do not install packages beyond express, dotenv, and cors
- Do not split server.js into multiple files
