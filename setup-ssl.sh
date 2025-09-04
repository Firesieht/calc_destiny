#!/bin/bash

# Скрипт настройки SSL и Nginx для Django API

echo "🔧 Настройка SSL и Nginx для Django API..."

# 1. Создание самоподписанного SSL сертификата
echo "📜 Создание SSL сертификата для api.alkhimiyadushi.ru..."
sudo mkdir -p /etc/ssl/certs /etc/ssl/private

# Генерация приватного ключа
sudo openssl genrsa -out /etc/ssl/private/django-api.key 2048

# Генерация самоподписанного сертификата для домена
sudo openssl req -new -x509 -key /etc/ssl/private/django-api.key \
    -out /etc/ssl/certs/django-api.crt -days 365 \
    -subj "/C=RU/ST=Moscow/L=Moscow/O=Django API/CN=api.alkhimiyadushi.ru"

# Установка правильных прав доступа
sudo chmod 600 /etc/ssl/private/django-api.key
sudo chmod 644 /etc/ssl/certs/django-api.crt

# 2. Установка Nginx (если не установлен)
echo "🌐 Проверка установки Nginx..."
if ! command -v nginx &> /dev/null; then
    echo "Устанавливаем Nginx..."
    sudo apt update
    sudo apt install -y nginx
else
    echo "Nginx уже установлен"
fi

# 3. Создание конфигурации Nginx
echo "⚙️ Создание конфигурации Nginx..."
sudo cp nginx-ssl.conf /etc/nginx/sites-available/django-api-ssl

# 4. Активация конфигурации
echo "🔗 Активация конфигурации..."
sudo ln -sf /etc/nginx/sites-available/django-api-ssl /etc/nginx/sites-enabled/

# 5. Проверка конфигурации Nginx
echo "✅ Проверка конфигурации Nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Конфигурация Nginx корректна"
    
    # 6. Перезапуск Nginx
    echo "🔄 Перезапуск Nginx..."
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    echo ""
    echo "🎉 Настройка завершена!"
    echo ""
    echo "📋 Что было сделано:"
    echo "  ✅ Создан SSL сертификат для api.alkhimiyadushi.ru"
    echo "  ✅ Настроен Nginx для HTTPS на порту 2000"
    echo "  ✅ Настроено проксирование на 127.0.0.1:2000"
    echo "  ✅ Добавлены CORS заголовки"
    echo ""
    echo "🔗 Теперь доступны:"
    echo "  • HTTPS API: https://api.alkhimiyadushi.ru:2000/api/"
    echo "  • Локальный Django: http://127.0.0.1:2000/"
    echo ""
    echo "⚠️  Важно:"
    echo "  1. Убедитесь что Django запущен на 127.0.0.1:2000"
    echo "  2. Убедитесь что домен api.alkhimiyadushi.ru указывает на IP сервера"
    echo "  3. В браузере может появиться предупреждение о самоподписанном сертификате"
    echo "  4. Для продакшена рекомендуется использовать Let's Encrypt"
    
else
    echo "❌ Ошибка в конфигурации Nginx!"
    echo "Проверьте файл /etc/nginx/sites-available/django-api-ssl"
    exit 1
fi