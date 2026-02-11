FROM php:8.3-fpm

# Системные зависимости
RUN apt-get update && apt-get install -y \
    zip unzip git curl libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring

# Рабочая директория
WORKDIR /var/www