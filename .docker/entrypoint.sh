#!/bin/sh
set -e

# Cria .env se não existir
if [ ! -f /app/.env ]; then
  cp /app/.env.example /app/.env
fi

if [ "${APP_ENV}" = "production" ]; then
    rm -f /app/public/hot
fi

# Se montou volume e não tem vendor, instala
if [ ! -f /app/vendor/autoload.php ]; then
  composer install --no-interaction --prefer-dist
fi

# Gera chave se necessário
if ! grep -q "APP_KEY=" /app/.env || grep -q "APP_KEY=$" /app/.env; then
  php artisan key:generate --force
fi

# Execute migrations e optimize
php artisan migrate --force
php artisan optimize

exec "$@"
