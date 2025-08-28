#!/bin/bash

# Скрипт запуска Django backend для macOS

echo "🍎 Запуск Django backend на macOS..."

# Переход в директорию backend
cd backend

# Проверка наличия Python3
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 не установлен!"
    echo "Установите Python3 через Homebrew: brew install python"
    exit 1
fi

# Проверка наличия виртуального окружения
if [ ! -d "venv" ]; then
    echo "📦 Создание виртуального окружения..."
    python3 -m venv venv
fi

# Активация виртуального окружения
echo "🔧 Активация виртуального окружения..."
source venv/bin/activate

# Обновление pip
echo "⬆️ Обновление pip..."
pip install --upgrade pip

# Установка зависимостей
echo "📥 Установка зависимостей..."
pip install -r requirements.txt

# Проверка переменных окружения Django
if [ ! -f ".env" ]; then
    echo "⚙️ Создание файла .env..."
    cat > .env << EOF
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=127.0.0.1,localhost,194.146.242.64
CORS_ALLOWED_ORIGINS=https://alkhimiyadushi.ru,http://127.0.0.1:8000,http://localhost:8000
EOF
fi

# Применение миграций
echo "🗃️ Применение миграций..."
python manage.py makemigrations
python manage.py migrate

# Создание суперпользователя (если нужно)
echo "👤 Проверка суперпользователя..."
python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('✅ Создан суперпользователь: admin/admin123')
else:
    print('ℹ️ Суперпользователь уже существует')
"

# Сбор статических файлов (если нужно)
echo "📦 Сбор статических файлов..."
python manage.py collectstatic --noinput --clear

echo ""
echo "🌟 Django настроен на macOS!"
echo ""
echo "📋 Доступные URL:"
echo "  🔥 Django сервер:     http://127.0.0.1:2000/"
echo "  📊 Админ панель:      http://127.0.0.1:2000/admin/"
echo "  🔌 API эндпоинты:     http://127.0.0.1:2000/api/"
echo "  🔐 HTTPS API:         https://194.146.242.64:2000/api/"
echo ""
echo "🔑 Данные для входа в админку:"
echo "  👤 Логин: admin"
echo "  🔒 Пароль: admin123"
echo ""
echo "🛠️ Полезные команды macOS:"
echo "  🔧 Проверка процессов: lsof -i :2000"
echo "  📊 Мониторинг логов: tail -f /usr/local/var/log/nginx/*.log"
echo "  🔄 Перезапуск Nginx: brew services restart nginx"
echo ""
echo "💡 Для запуска сервера выполните:"
echo "   python manage.py runserver 127.0.0.1:2000"
echo ""

# Опционально - автоматический запуск сервера
read -p "🚀 Запустить Django сервер сейчас? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔥 Запуск Django сервера на 127.0.0.1:2000..."
    echo "⚠️  Нажмите Ctrl+C для остановки сервера"
    echo ""
    python manage.py runserver 127.0.0.1:2000
fi 