#!/bin/bash

# Скрипт настройки SSL и Nginx для Django API с Certbot

DOMAIN="api.alkhimiyadushi.ru"
EMAIL="www.anton40.ru@mail.ru"  # Замените на ваш email

echo "🔧 Настройка SSL и Nginx для Django API с Certbot..."

# 1. Установка Nginx (если не установлен)
echo "🌐 Проверка установки Nginx..."
if ! command -v nginx &> /dev/null; then
    echo "Устанавливаем Nginx..."
    sudo apt update
    sudo apt install -y nginx
else
    echo "Nginx уже установлен"
fi

# 2. Временная конфигурация Nginx для прохождения проверки Certbot
echo "⚙️ Создание временной конфигурации Nginx для Certbot..."
sudo tee /etc/nginx/sites-available/django-api-temp > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    location / {
        return 200 'Certbot validation server';
        add_header Content-Type text/plain;
    }
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
}
EOF

# Активация временной конфигурации
sudo ln -sf /etc/nginx/sites-available/django-api-temp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 3. Установка Certbot
echo "📦 Установка Certbot..."
if ! command -v certbot &> /dev/null; then
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
else
    echo "Certbot уже установлен"
fi

# 4. Создание директории для проверки Certbot
echo "📁 Подготовка директории для проверки Certbot..."
sudo mkdir -p /var/www/certbot
sudo chown -R www-data:www-data /var/www/certbot
sudo chmod -R 755 /var/www/certbot

# 5. Получение SSL сертификата
echo "📜 Получение SSL сертификата от Let's Encrypt..."
sudo certbot certonly --webroot \
    --webroot-path /var/www/certbot \
    -d $DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --non-interactive