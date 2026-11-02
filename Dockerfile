FROM node:22-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM python:3.12-slim

COPY --from=ghcr.io/astral-sh/uv:0.13.6 /uv /uvx /bin/

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

WORKDIR /app

COPY backend/pyproject.toml backend/uv.lock ./
COPY backend/src ./src
RUN uv sync --locked --no-dev

COPY --from=frontend-build /frontend/dist/calculator/browser /app/src/calculator_api/static

ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8000

CMD ["uvicorn", "calculator_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
