# Draft Assistant (Lean Demo)

A lightweight fantasy football draft helper built with React + TypeScript + Vite + Tailwind.

This project is intentionally scoped as a lean demo to highlight:
- clean data modeling and normalization
- fast, decision-focused draft UX
- simple, readable frontend architecture

## Features
- Load NFL players from the Sleeper public API
- Position filter (All / QB / RB / WR / TE / Flex)
- Drafted toggle + optional “Hide drafted”
- Name search
- Sorting (Pos → Name, Name, Team → Name)

## Architecture
- `api/` – external API calls
- `models/` – app domain types
- `hooks/` – data loading + normalization
- `components/` – reusable UI pieces
- `pages/` – page composition

## Run locally
```bash
npm install
npm run dev
