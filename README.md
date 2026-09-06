# NLAMS

National Land Acquisition Monitoring System frontend.

## Project Layout

The runnable app lives in [`frontend/`](./frontend).

## Run Locally

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open the app at:

```bash
http://127.0.0.1:5173
```

## Checks

Run these from `frontend/`:

```bash
npm run typecheck
npm run lint
npm run build
```

## Common Commands

```bash
cd frontend
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Preview Production Build

```bash
cd frontend
npm run build
npm run preview
```

## Notes

- The repo is structured for team contribution under `frontend/`.
- Demo login and route guards are wired into the current phase.
