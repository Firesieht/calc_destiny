# API Документация - Calcul

## Обзор
REST API для управления расчетами пользователей с моделью Calcul.

## Базовый URL
```
http://localhost:8000/api/
```

## Модель Calcul
```python
{
    "id": int,           # Автоинкремент ID
    "login": str,        # Логин пользователя
    "data": str,         # Данные расчета
    "created_at": datetime,  # Дата создания
    "updated_at": datetime   # Дата обновления
}
```

## Endpoints

### 1. Получить все расчеты + Создать новый
**GET/POST** `/api/calculs/`

#### GET - Получить список всех расчетов
**Ответ:**
```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "login": "user1",
            "data": "некоторые данные",
            "created_at": "2023-12-07T10:30:00Z",
            "updated_at": "2023-12-07T10:30:00Z"
        }
    ]
}
```

#### POST - Создать новый расчет
**Тело запроса:**
```json
{
    "login": "user1",
    "data": "данные расчета"
}
```

**Ответ (201):**
```json
{
    "id": 3,
    "login": "user1",
    "data": "данные расчета",
    "created_at": "2023-12-07T10:30:00Z",
    "updated_at": "2023-12-07T10:30:00Z"
}
```

### 2. Операции с расчетом по ID
**GET/PUT/PATCH/DELETE** `/api/calculs/{id}/`

#### GET - Получить расчет по ID
**Ответ (200):**
```json
{
    "id": 1,
    "login": "user1",
    "data": "данные расчета",
    "created_at": "2023-12-07T10:30:00Z",
    "updated_at": "2023-12-07T10:30:00Z"
}
```

#### DELETE - Удалить расчет по ID
**Ответ (204):** Пустой ответ

### 3. Получить расчеты по логину
**GET** `/api/calculs/by-login/{login}/`

**Ответ (200):**
```json
{
    "login": "user1",
    "count": 2,
    "calculs": [
        {
            "id": 1,
            "login": "user1",
            "data": "данные расчета 1",
            "created_at": "2023-12-07T10:30:00Z",
            "updated_at": "2023-12-07T10:30:00Z"
        },
        {
            "id": 2,
            "login": "user1",
            "data": "данные расчета 2",
            "created_at": "2023-12-07T11:00:00Z",
            "updated_at": "2023-12-07T11:00:00Z"
        }
    ]
}
```

### 4. Удалить все расчеты по логину
**DELETE** `/api/calculs/delete-by-login/{login}/`

**Ответ (200):**
```json
{
    "message": "Удалено 2 расчетов для пользователя 'user1'"
}
```

**Ответ (404) если расчеты не найдены:**
```json
{
    "message": "Расчеты для пользователя 'user1' не найдены"
}
```

### 5. Проверка статуса API
**GET** `/api/status/`

**Ответ (200):**
```json
{
    "status": "OK",
    "message": "Calcul API работает корректно",
    "total_calculs": 5
}
```

## Коды ошибок

### 400 Bad Request
```json
{
    "login": ["Поле login не может быть пустым"],
    "data": ["Поле data не может быть пустым"]
}
```

### 404 Not Found
```json
{
    "detail": "Не найдено."
}
```

### 500 Internal Server Error
```json
{
    "detail": "Внутренняя ошибка сервера"
}
```

## Примеры использования

### cURL команды

#### Создать новый расчет:
```bash
curl -X POST http://localhost:8000/api/calculs/ \
  -H "Content-Type: application/json" \
  -d '{
    "login": "user1",
    "data": "мои данные расчета"
  }'
```

#### Получить расчет по ID:
```bash
curl http://localhost:8000/api/calculs/1/
```

#### Получить все расчеты пользователя:
```bash
curl http://localhost:8000/api/calculs/by-login/user1/
```

#### Удалить все расчеты пользователя:
```bash
curl -X DELETE http://localhost:8000/api/calculs/delete-by-login/user1/
```

### JavaScript (fetch)

#### Создать расчет:
```javascript
const response = await fetch('http://localhost:8000/api/calculs/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        login: 'user1',
        data: 'данные расчета'
    })
});
const calcul = await response.json();
```

#### Получить расчеты пользователя:
```javascript
const response = await fetch('http://localhost:8000/api/calculs/by-login/user1/');
const data = await response.json();
console.log(`Найдено ${data.count} расчетов для ${data.login}`);
```

## Запуск сервера

1. Установить зависимости:
```bash
cd backend
pip install -r requirements.txt
```

2. Выполнить миграции:
```bash
python manage.py makemigrations
python manage.py migrate
```

3. Создать суперпользователя (опционально):
```bash
python manage.py createsuperuser
```

4. Запустить сервер:
```bash
python manage.py runserver
```

Сервер будет доступен по адресу: http://localhost:8000/

## Админ-панель
Доступ к админ-панели: http://localhost:8000/admin/
Там можно управлять расчетами через веб-интерфейс. 