#!/bin/sh
set -e

# Gera key se não existir
if [ ! -f /app/.env ]; then
  cp /app/.env.example /app/.env
fi

if ! grep -q "APP_KEY=" /app/.env || grep -q "APP_KEY=$" /app/.env; then
  php artisan key:generate --force
fi

php artisan migrate

exec "$@"

