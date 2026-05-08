#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE_NAME="${IMAGE_NAME:-diasanta-resume-site}"
IMAGE_TAG="${IMAGE_TAG:-dev}"
HOST_PORT="${PORT:-3000}"
CONTAINER_PORT=3000
CONTAINER_NAME="${CONTAINER_NAME:-diasanta-resume-site-dev}"
NODE_MODULES_VOLUME="${NODE_MODULES_VOLUME:-${CONTAINER_NAME}-node_modules}"
NEXT_CACHE_VOLUME="${NEXT_CACHE_VOLUME:-${CONTAINER_NAME}-next}"

cd "$SCRIPT_DIR"

TTY_ARGS=()
if [[ -t 0 && -t 1 ]]; then
  TTY_ARGS=(-it)
fi

echo "Building dev image ${IMAGE_NAME}:${IMAGE_TAG}..."
docker build --target deps -t "${IMAGE_NAME}:${IMAGE_TAG}" .

echo "Running hot-reload dev server at http://localhost:${HOST_PORT}"
docker run --rm \
  "${TTY_ARGS[@]}" \
  --name "$CONTAINER_NAME" \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  -e NODE_ENV=development \
  -e NEXT_TELEMETRY_DISABLED=1 \
  -e WATCHPACK_POLLING=true \
  -e CHOKIDAR_USEPOLLING=true \
  -v "${SCRIPT_DIR}:/app" \
  -v "${NODE_MODULES_VOLUME}:/app/node_modules" \
  -v "${NEXT_CACHE_VOLUME}:/app/.next" \
  -w /app \
  "${IMAGE_NAME}:${IMAGE_TAG}" \
  npm run dev -- --hostname 0.0.0.0 --port "${CONTAINER_PORT}"
