# Video 2: Quick Tour - Starter Repo & Script Structure

## Objective

Familiarize with the repository structure and available TypeScript scripts for each video exercise.

## Repository Structure

```text
.
├── video-1-environment-setup/       # Node.js & TypeScript environment setup
├── video-2-quick-tour/              # This quick tour documentation
├── video-3-exact-knn/               # Exact k-NN search example
... (rest of video folders will be generated)
```

## Available npm Scripts

Run `npm run` to list all scripts. Key scripts include:

- `build`: Compile all TypeScript code.
- `test`: Run tests.
- `start:video-3`: Execute exact k-NN example.
- `start:video-4`: Execute ANN indexing and tuning example.
- `start:video-5`: Execute hybrid search example.
- `start:video-6`: Execute batching and incremental updates example.
- `start:video-7`: Execute benchmark harness.
- `start:video-8`: Execute cloud demo template.

## Dry-Run

To perform a dry-run of the benchmark harness without side effects:

```bash
npm run start:video-7 -- --mode single --num_queries 1 --dry-run
```

This will print planned parameters without executing queries.
