# Freight Delay Notifier

A Temporal TypeScript app that monitors freight route delays using Google Maps
API and notifies customers with AI-generated messages using OpenAI.

## Tech Stack

- Temporal (TypeScript SDK)
- PostgreSQL (for Temporal server)
- Google Maps API (traffic data)
- OpenAI API (message generation)
- Docker + Docker compose
- TypeScript

## Getting Started

### 1. Install dependencies

`npm install`

### 2. Start Temporal services

`docker-compose up -d`

Temporal Server runs on port 7233

Temporal Web UI runs on port 8080

### 3. Build the project

`npm run build`

### 4. Start the worker

`npm run worker`

### 5. Trigger the workflow client

`npm run client`

## Environment Variables

Create a `.env` file in the root with:

```
DELAY_THRESHOLD_MINUTES=30
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
OPENAI_API_KEY=your_openai_api_key
```

## Docker Services

- **postgres**: PostgreSQL database for Temporal
- **temporal**: Temporal Server
- **temporal-ui**: Web UI for Temporal - http://localhost:8080

## Features

- Fetches traffic delay data from Google Maps API
- Compares delays against a configured threshold
- Generates customer-facing delay messages using OpenAI API
- Orchestrates logic using Temporal workflows and activities

## TODO

- Send notifications via SendGrid or Twilio
