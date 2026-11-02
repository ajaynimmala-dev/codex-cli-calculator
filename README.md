# Modular Calculator

A small calculator split into a FastAPI backend and an Angular frontend. The API owns the calculation rules; Angular provides the browser interface.

## Project layout

```text
backend/
  pyproject.toml
  src/calculator_api/
    api/        HTTP routes
    core/       application settings
    schemas/    request and response models
    services/  calculator business logic
    main.py     FastAPI application entry point
frontend/
  src/app/
    models/     API data types
    services/   HTTP client for the API
    app.component.ts
```

## Run the backend

From the project root, create and activate a virtual environment, then install the backend from its project metadata:

```bash
python3 -m venv .venv
source .venv/bin/activate
cd backend
pip install -e .
uvicorn calculator_api.main:app --reload
```

The API is available at `http://localhost:8000`; interactive API documentation is at `http://localhost:8000/docs`.

## Run the frontend

In a second terminal, from the project root:

```bash
cd frontend
nvm install
nvm use
npm install
npm start
```

Open `http://localhost:4200`. The Angular development server proxies API requests to FastAPI.

## Run the production app with Docker Compose

From the project root:

```bash
docker compose up --build
```

Open `http://localhost:8000`. FastAPI serves the Angular production build and the API from the same origin; interactive API documentation is at `/docs`. Set `APP_PORT` if port 8000 is already in use. Stop the service with `docker compose down`.

## Deploy to Render

The root `render.yaml` defines a Docker web service with `/health` as its health check. In the Render Dashboard, choose **New > Blueprint**, connect this GitHub repository, and deploy the detected Blueprint. Render supplies `PORT`; the container binds to it and serves both Angular and the API from the same origin.

## GitHub Container Registry

The Docker workflow builds the image on pull requests and publishes it to `ghcr.io/<owner>/<repository>` for pushes to `main`, version tags (`v*`), and manual runs. Published images receive branch or version tags, a commit SHA tag, and `latest` for the default branch. GitHub Actions uses the repository's `GITHUB_TOKEN`; no separate registry secret is needed.

Set `CORS_ORIGINS` to a comma-separated list of allowed browser origins when deploying (the defaults are `http://localhost:4200` and `http://127.0.0.1:4200`). Set `APP_NAME` to customize the API title.

## API

`POST /api/calculate`

```json
{
  "first_number": 12,
  "second_number": 4,
  "operation": "/"
}
```

Returns both operands, the operation, and the result. Unsupported operations and division by zero produce a clear HTTP 400 response. `GET /health` provides a basic health check.
