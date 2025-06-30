FROM php:8.3

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    git \
    unzip \
    curl \
    npm
RUN docker-php-ext-install pcntl
# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd pdo pdo_mysql zip exif bcmath opcache
# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Set working directory
RUN composer global require laravel/installer
# RUN npm install && npm run build
# npm install
# php artisan key:generate
RUN php artisan storage:link
