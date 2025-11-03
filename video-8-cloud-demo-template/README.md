# Video 8: Quick Cloud Vector DB Demo (Pinecone) Template in TypeScript

## Objective

Demonstrate how to connect to a cloud vector database (e.g., Pinecone) using environment variables, upsert vectors, query, and cleanup.

## Setup

1. Copy `.env.example` to `.env` and fill in your Pinecone API information.
   ```bash
   cp .env.example .env
   ```
2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```

## Usage

```bash
npm run start:video-8
```

This will:
1. Initialize the Pinecone client.
2. Create an index if it does not exist.
3. Upsert sample vectors.
4. Perform a query and print results.
5. Delete the index.

## Files

- `src/cloud.ts`: Pinecone demo script.
- `.env.example`: Template for environment variables.
