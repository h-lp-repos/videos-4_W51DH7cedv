# Video 1: Environment & Starter Repo Setup

## Objective

Have a reproducible Node.js and TypeScript environment and starter repository ready for subsequent exercises.

## Prerequisites

- Node.js >= 14 installed
- npm or yarn available

## Steps

1. Clone this repository and navigate to its root:
   ```bash
git clone <repo_url>
cd videos-4-w51dh7cedv
```
2. Install dependencies:
   ```bash
npm install
# or
yarn install
```
3. Build the TypeScript projects:
   ```bash
npm run build
```
4. Verify the build completes without errors. A `dist/` directory should be created.
5. (Optional) Run a sample script to check setup (ensure video-3 is available):
   ```bash
npm run start:video-3
```

## Troubleshooting

- If TypeScript errors occur, ensure correct Node.js version and reinstall dependencies.
- For environment variable issues, check `.env.example` and copy to `.env`.
