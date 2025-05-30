# Freight Delay Notifier

A Temporal TypeScript app that monitors traffic route delays using Google Maps
API and notifies customers via SendGrid with AI-generated message using OpenAI,
if delays exceed a threshold.

## Features

- Fetches traffic delay data from Google Maps API
- Compares delays against a configured threshold
- Generates customer-facing delay messages using OpenAI API
- Orchestrates logic using Temporal workflows and activities
- Send email notification to customer via SendGrid

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
GOOGLE_MAPS_API_KEY=your-google-api-key
OPENAI_API_KEY=your-openai-api-key
SENDGRID_API_KEY=your-sendgrid-api-key
NOTIFY_EMAIL_FROM=your-verified-sendgrid-email@example.com
NOTIFY_EMAIL_TO=recipient@example.com
DELAY_THRESHOLD_MINUTES=30
```

## Docker Services

- **postgres**: PostgreSQL database for Temporal
- **temporal**: Temporal Server
- **temporal-ui**: Web UI for Temporal - http://localhost:8080

## Examples

- Delay bellow threshold:

```
[freightDelayWorkflow(freight-delay-1748601284349)] [Workflow] Starting freight delay check for route: {
  origin: 'Copenhagen, Denmark',
  destination: 'Aarhus, Denmark',
  delayThreshold: 30
}
[Traffic] Estimated delay: 14 minutes.
[freightDelayWorkflow(freight-delay-1748601284349)] { estimatedDelayMinutes: 14, status: 'OK' }
[freightDelayWorkflow(freight-delay-1748601284349)] [Workflow] Delay is 14 min.
[freightDelayWorkflow(freight-delay-1748601284349)] [Workflow] Delay under threshold. No notification needed.
```

- Delay above the threshold:

```
[freightDelayWorkflow(freight-delay-1748603830196)] [Workflow] Starting freight delay check for route: {
  origin: 'Copenhagen, Denmark',
  destination: 'Aarhus, Denmark',
  delayThreshold: 3
}
[Traffic] Estimated delay: 45 minutes.
[freightDelayWorkflow(freight-delay-1748603830196)] { estimatedDelayMinutes: 45, status: 'OK' }
[freightDelayWorkflow(freight-delay-1748603830196)] [Workflow] Delay is 45 min.
[Notification] Sending message...
[SendGrid] Email sent
[freightDelayWorkflow(freight-delay-1748603830196)] [Workflow] Notification sent via sendgrid
```
