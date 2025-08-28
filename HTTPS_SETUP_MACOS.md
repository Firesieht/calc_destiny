# 🍎 Настройка HTTPS для Django API на macOS

## 📋 Пошаговая инструкция для macOS

### 1️⃣ Подготовка системы

Убедитесь, что у вас установлен **Homebrew**:
```bash
# Проверка установки Homebrew
brew --version

# Если Homebrew не установлен:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2️⃣ Подготовка файлов
Убедитесь, что у вас есть файлы:
- `nginx-ssl-macos.conf` - конфигурация Nginx для macOS
- `setup-ssl-macos.sh` - скрипт настройки SSL
- `start-django-macos.sh` - скрипт запуска Django

### 3️⃣ Настройка SSL и Nginx
```bash
# Делаем скрипт исполняемым
chmod +x setup-ssl-macos.sh

# Запускаем настройку
./setup-ssl-macos.sh
```

### 4️⃣ Запуск Django backend
```bash
# Делаем скрипт исполняемым
chmod +x start-django-macos.sh

# Запускаем Django
./start-django-macos.sh
```

### 5️⃣ Проверка работы

#### Локальные URL (для разработки):
- Django: `http://127.0.0.1:2000/`
- API: `http://127.0.0.1:2000/api/`
- Админ: `http://127.0.0.1:2000/admin/`

#### Внешние URL (через Nginx):
- API: `https://194.146.242.64:2000/api/`
- Статус: `https://194.146.242.64:2000/api/status/`

## 🔧 Особенности macOS

### Пути файлов в macOS
- **Конфигурация Nginx**: `/usr/local/etc/nginx/`
- **SSL сертификаты**: `/usr/local/etc/ssl/`
- **Логи Nginx**: `/usr/local/var/log/nginx/`
- **Homebrew**: `/usr/local/` (Intel) или `/opt/homebrew/` (Apple Silicon)

### Управление сервисами через Homebrew
```bash
# Управление Nginx
brew services start nginx      # Запуск
brew services stop nginx       # Остановка
brew services restart nginx    # Перезапуск
brew services list | grep nginx # Статус

# Управление другими сервисами
brew services list             # Все сервисы
```

## 🛠️ Ручная настройка (если нужно)

### Установка зависимостей
```bash
# Установка через Homebrew
brew install nginx
brew install openssl
brew install python3
```

### SSL сертификат для macOS
```bash
# Создание директорий
mkdir -p /usr/local/etc/ssl/certs
mkdir -p /usr/local/etc/ssl/private

# Генерация ключа
openssl genrsa -out /usr/local/etc/ssl/private/django-api.key 2048

# Генерация сертификата
openssl req -new -x509 -key /usr/local/etc/ssl/private/django-api.key \
    -out /usr/local/etc/ssl/certs/django-api.crt -days 365 \
    -subj "/C=RU/ST=Moscow/L=Moscow/O=Django API/CN=194.146.242.64"

# Права доступа
chmod 600 /usr/local/etc/ssl/private/django-api.key
chmod 644 /usr/local/etc/ssl/certs/django-api.crt
```

### Nginx конфигурация для macOS
```bash
# Копирование конфигурации
cp nginx-ssl-macos.conf /usr/local/etc/nginx/servers/django-api-ssl.conf

# Создание директории логов
mkdir -p /usr/local/var/log/nginx

# Проверка и перезапуск
nginx -t
brew services restart nginx
```

### Django настройки для macOS
```bash
cd backend

# Создание виртуального окружения
python3 -m venv venv
source venv/bin/activate

# Установка зависимостей
pip install --upgrade pip
pip install -r requirements.txt

# Запуск на нужном хосте
python manage.py runserver 127.0.0.1:2000
```

## 🔍 Проверка и отладка на macOS

### Проверка статуса сервисов
```bash
# Статус Nginx
brew services list | grep nginx

# Проверка конфигурации Nginx
nginx -t

# Логи Nginx
tail -f /usr/local/var/log/nginx/django-api-error.log
tail -f /usr/local/var/log/nginx/django-api-access.log

# Все логи сразу
tail -f /usr/local/var/log/nginx/*.log
```

### Проверка портов
```bash
# Какие процессы используют порт 2000
lsof -i :2000

# Все активные соединения
netstat -an | grep 2000

# Процессы Python/Django
ps aux | grep python
```

### Проверка SSL сертификата
```bash
# Информация о сертификате
openssl x509 -in /usr/local/etc/ssl/certs/django-api.crt -text -noout

# Проверка соединения
openssl s_client -connect 194.146.242.64:2000
```

### Тестирование API
```bash
# Проверка статуса (локально)
curl http://127.0.0.1:2000/api/status/

# Проверка статуса (через HTTPS)
curl -k https://194.146.242.64:2000/api/status/

# Проверка CORS
curl -k -H "Origin: https://alkhimiyadushi.ru" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS https://194.146.242.64:2000/api/status/
```

## 🚨 Устранение проблем на macOS

### Проблемы с Homebrew
```bash
# Обновление Homebrew
brew update
brew upgrade

# Переустановка Nginx
brew uninstall nginx
brew install nginx

# Проверка конфликтов
brew doctor
```

### Проблемы с правами доступа
```bash
# Исправление прав на SSL файлы
sudo chown $(whoami) /usr/local/etc/ssl/private/django-api.key
sudo chown $(whoami) /usr/local/etc/ssl/certs/django-api.crt

# Проверка прав
ls -la /usr/local/etc/ssl/private/
ls -la /usr/local/etc/ssl/certs/
```

### Проблемы с Python/Django
```bash
# Переустановка виртуального окружения
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Проверка Python версии
python3 --version
which python3
```

### Конфликты портов
```bash
# Убить процесс на порту 2000
lsof -ti:2000 | xargs kill -9

# Или использовать другой порт для Django
python manage.py runserver 127.0.0.1:2001
```

## 📊 Мониторинг на macOS

### Системные ресурсы
```bash
# Использование CPU и памяти
top -o cpu

# Мониторинг процессов Django
top -p $(pgrep -f "python.*manage.py")

# Дисковое пространство
df -h
```

### Автозапуск при загрузке системы
Для автоматического запуска Django при загрузке macOS:

1. **Создание LaunchAgent**:
```bash
mkdir -p ~/Library/LaunchAgents
```

2. **Создание файла конфигурации**:
```xml
<!-- ~/Library/LaunchAgents/com.django.api.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.django.api</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/python3</string>
        <string>/path/to/your/project/backend/manage.py</string>
        <string>runserver</string>
        <string>127.0.0.1:2000</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/path/to/your/project/backend</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

3. **Активация**:
```bash
launchctl load ~/Library/LaunchAgents/com.django.api.plist
launchctl start com.django.api
```

## ✅ Результат для macOS

После успешной настройки:
- ✅ Django API доступен по HTTPS через Nginx
- ✅ Решена проблема Mixed Content
- ✅ CORS настроен правильно  
- ✅ SSL сертификат работает
- ✅ Логи ведутся в стандартных местах macOS
- ✅ Удобное управление через Homebrew
- ✅ Совместимость с Apple Silicon и Intel Mac 