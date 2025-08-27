FROM php:8.3-fpm

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    zip \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Instala Node.js 20 e npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Instala extensões PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip exif bcmath opcache pcntl

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

# Copia o código da aplicação
COPY . .

# Instala dependências PHP (sem dev) e otimiza autoloader
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Instala dependências JS e faz build de produção do frontend
RUN npm ci && npm run build

# Remove node_modules para produção (opcional, se não precisar de npm em runtime)
RUN rm -rf node_modules

# Permissões (ajuste conforme sua necessidade)
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Entrypoint customizado (opcional)
COPY .docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Comando padrão: serve Laravel (ajuste para php-fpm/nginx se preferir)
CMD ["php-fpm"]
