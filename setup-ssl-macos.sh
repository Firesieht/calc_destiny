#!/bin/bash

# Скрипт настройки SSL и Nginx для Django API на macOS

echo "🍎 Настройка SSL и Nginx для Django API на macOS..."

# Проверка установки Homebrew
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew не установлен!"
    echo "Установите Homebrew сначала: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    exit 1
fi

# 1. Установка OpenSSL и Nginx через Homebrew
echo "🌐 Проверка установки OpenSSL и Nginx..."
if ! command -v openssl &> /dev/null; then
    echo "Устанавливаем OpenSSL..."
    brew install openssl
fi

if ! command -v nginx &> /dev/null; then
    echo "Устанавливаем Nginx..."
    brew install nginx
else
    echo "Nginx уже установлен"
fi

# 2. Создание директорий для SSL сертификатов
echo "📜 Создание SSL сертификата..."
mkdir -p /usr/local/etc/ssl/certs
mkdir -p /usr/local/etc/ssl/private

# 3. Генерация приватного ключа
openssl genrsa -out /usr/local/etc/ssl/private/django-api.key 2048

# 4. Генерация самоподписанного сертификата
openssl req -new -x509 -key /usr/local/etc/ssl/private/django-api.key \
    -out /usr/local/etc/ssl/certs/django-api.crt -days 365 \
    -subj "/C=RU/ST=Moscow/L=Moscow/O=Django API/CN=194.146.242.64"

# 5. Установка правильных прав доступа
chmod 600 /usr/local/etc/ssl/private/django-api.key
chmod 644 /usr/local/etc/ssl/certs/django-api.crt

# 6. Создание конфигурации Nginx
echo "⚙️ Создание конфигурации Nginx..."
cp nginx-ssl-macos.conf /usr/local/etc/nginx/servers/django-api-ssl.conf

# 7. Создание директории для логов
mkdir -p /usr/local/var/log/nginx

# 8. Проверка конфигурации Nginx
echo "✅ Проверка конфигурации Nginx..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Конфигурация Nginx корректна"
    
    # 9. Остановка Nginx если запущен
    echo "🛑 Остановка текущего Nginx..."
    brew services stop nginx 2>/dev/null || true
    
    # 10. Запуск Nginx
    echo "🔄 Запуск Nginx..."
    brew services start nginx
    
    echo ""
    echo "🎉 Настройка завершена!"
    echo ""
    echo "📋 Что было сделано:"
    echo "  ✅ Установлены OpenSSL и Nginx через Homebrew"
    echo "  ✅ Создан SSL сертификат для 194.146.242.64"
    echo "  ✅ Настроен Nginx для HTTPS на порту 2000"
    echo "  ✅ Настроено проксирование на 127.0.0.1:2000"
    echo "  ✅ Добавлены CORS заголовки"
    echo ""
    echo "🔗 Теперь доступны:"
    echo "  • HTTPS API: https://194.146.242.64:2000/api/"
    echo "  • Локальный Django: http://127.0.0.1:2000/"
    echo ""
    echo "📂 Важные пути macOS:"
    echo "  • Конфигурация Nginx: /usr/local/etc/nginx/"
    echo "  • Логи Nginx: /usr/local/var/log/nginx/"
    echo "  • SSL сертификаты: /usr/local/etc/ssl/"
    echo ""
    echo "🔧 Управление Nginx:"
    echo "  • Запуск: brew services start nginx"
    echo "  • Остановка: brew services stop nginx"
    echo "  • Перезапуск: brew services restart nginx"
    echo "  • Статус: brew services list | grep nginx"
    echo ""
    echo "⚠️  Важно:"
    echo "  1. Убедитесь что Django запущен на 127.0.0.1:2000"
    echo "  2. В браузере может появиться предупреждение о самоподписанном сертификате"
    echo "  3. Для продакшена рекомендуется использовать Let's Encrypt"
    
else
    echo "❌ Ошибка в конфигурации Nginx!"
    echo "Проверьте файл /usr/local/etc/nginx/servers/django-api-ssl.conf"
    exit 1
fi 