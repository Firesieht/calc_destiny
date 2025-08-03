import React, { useState } from 'react';
import './App.css';

// Таблицы стоимости букв
const CYRILLIC_VALUES = {
  'а': 1, 'б': 2, 'в': 3, 'г': 4, 'д': 5, 'е': 6, 'ё': 7, 'ж': 8, 'з': 9,
  'и': 1, 'й': 2, 'к': 3, 'л': 4, 'м': 5, 'н': 6, 'о': 7, 'п': 8, 'р': 9,
  'с': 1, 'т': 2, 'у': 3, 'ф': 4, 'х': 5, 'ц': 6, 'ч': 7, 'ш': 8, 'щ': 9,
  'ъ': 1, 'ы': 2, 'ь': 3, 'э': 4, 'ю': 5, 'я': 6
};

const LATIN_VALUES = {
  'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
  'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
  's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
};

// Таблица родовых программ (оптимизированная - используем Set для быстрого поиска)
const ANCESTRAL_PROGRAMS = {
  '5,15,20': { id: 1, name: 'Бунтарь' },
  '7,12,19': { id: 2, name: 'Воин' },
  '3,7,22': { id: 3, name: 'Узник; несвободная душа' },
  '5,6,17': { id: 4, name: 'Гордыня' },
  '10,16,21': { id: 5, name: 'Духовный жрец' },
  '6,6,18': { id: 6, name: 'Любовная магия' },
  '9,9,18': { id: 7, name: 'Волшебник; не принятие знаний' },
  '3,9,12': { id: 8, name: 'Одинокая женщина' },
  '5,8,15': { id: 9, name: 'Предательства; страсти в семье' },
  '6,8,20': { id: 10, name: 'Разочарование рода' },
  '6,15,18': { id: 11, name: 'Темный маг' },
  '3,9,21': { id: 12, name: 'Надзиратель' },
  '8,11,15': { id: 13, name: 'Физическая агрессия' },
  '6,11,17': { id: 14, name: 'Загубленный талант' },
  '4,12,16': { id: 15, name: 'Император' },
  '4,10,21': { id: 16, name: 'Угнетенная душа' },
  '3,12,18': { id: 17, name: 'Физические страдания' },
  '6,9,15': { id: 18, name: 'Мир страстей и сказок' },
  '6,8,14': { id: 19, name: 'Диктатор' },
  '3,10,13': { id: 20, name: 'Суицид' },
  '3,19,22': { id: 21, name: 'Нерожденное дитя' },
  '7,13,21': { id: 22, name: 'Разрушение; смерть многим душам' },
  '6,14,20': { id: 23, name: 'Душа; которую принесли в жертву' },
  '7,10,21': { id: 24, name: 'Воин веры' },
  '3,10,20': { id: 25, name: 'Обман со стороны женщин; проблемы с материнством' },
  '8,8,18': { id: 26, name: 'Страх разочарования; обмана' },
  '4,9,22': { id: 27, name: 'Тюремная программа' },
  '8,22,22': { id: 28, name: 'Тюремная программа' },
  '5,10,15': { id: 29, name: 'Высокая духовная миссия объединения людей' },
  '5,5,18': { id: 30, name: 'Магические знания' },
  '7,19': { id: 31, name: 'Достаток' },
  '5,11,16': { id: 32, name: 'Обесценивание' },
  '10,11,19': { id: 33, name: 'Выгорание; вспышка' },
  '7,14,21': { id: 34, name: 'Пытки; издевательства' },
  '8,14,22': { id: 35, name: 'Скупость' },
  '9,11,20': { id: 36, name: 'Вырождение рода' },
  '3,11,19': { id: 37, name: 'Бесплодие' },
  '7,13,20': { id: 38, name: 'Опасность в дороге; в движении вперед; в принятии решений' },
  '7,7,18': { id: 39, name: 'Страх карьерной реализации; дороги' },
  '4,11,20': { id: 40, name: 'Укрощение агрессии; дресировщик' },
  '7,8,17': { id: 41, name: 'Особая миссия; эксклюзив' },
  '5,14,19': { id: 42, name: 'Миллионер' },
  '6,15,21': { id: 43, name: 'Разгул' },
  '10,10,18': { id: 44, name: 'Страх доверия Богу' },
  '11,11,18': { id: 45, name: 'Страх принятия магической силы' },
  '6,12,18': { id: 46, name: 'Комплекс зависимых отношений' },
  '9,10,19': { id: 47, name: 'Чистый поток' },
  '7,15,22': { id: 48, name: 'Адреналин' },
  '8,9,17': { id: 49, name: 'Сокрытие истины' },
  '7,9,16': { id: 50, name: 'Молчание' },
  '7,9,20': { id: 51, name: 'Никто не узнает' },
  '8,10,16': { id: 52, name: 'Сговор; заговорщик' },
  '6,7,19': { id: 53, name: 'Кругом виноват' },
  '5,8,21': { id: 54, name: 'Нарушение иерархии' },
  '5,8,13': { id: 55, name: 'Перестановка; чужое место' },
  '8,9,19': { id: 56, name: 'Безнадега' },
  '6,8,16': { id: 57, name: 'Хвастовство' },
  '5,9,14': { id: 58, name: 'Месть' },
  '5,6': { id: 59, name: 'Красота и уют в доме' },
  '3,3,6': { id: 60, name: 'Женское обаяние' },
  '6,7,13': { id: 61, name: 'Физическое насилие и эмоциональное унижение' },
  '7,8,19': { id: 62, name: 'Ловушка' },
  '5,12,17': { id: 63, name: 'Публичный позор' },
  '5,13,18': { id: 64, name: 'Сакральная жертва' },
  '9,13,22': { id: 65, name: 'Неупокоенные души' },
  '9,11,16': { id: 66, name: 'Саморазрушение' },
  '6,11,22': { id: 67, name: 'Манипулирование ребенком' },
  '6,13,19': { id: 68, name: 'Избавление от старого' },
  '5,17,22': { id: 69, name: 'Академические знания' },
  '5,7,20': { id: 70, name: 'Изгнание из системы' },
  '5,10,22': { id: 71, name: 'Инквизиция' },
  '6,10,22': { id: 72, name: 'Холодный расчет' },
  '2,7,9': { id: 73, name: 'Серый кардинал; закулисье' },
  '6,12,21': { id: 74, name: 'Монах-однолюб' },
  '7,11,18': { id: 75, name: 'Боевой маг' },
  '4,11,20': { id: 76, name: 'Сильная воля' },
  '10,11,17': { id: 77, name: 'Упущенный шанс' },
  '5,6,19': { id: 78, name: 'Огонь любви' },
  '3,17,20': { id: 79, name: 'Тайная любовь' },
  '4,9,13': { id: 80, name: 'Конечность бытия' },
  '3,13,17': { id: 81, name: 'Метаморфозы' },
  '3,8,22': { id: 82, name: 'Мнимая любовь' },
  '4,10,14': { id: 83, name: 'Нет веры в себя' },
  '3,6,21': { id: 84, name: 'Любовь без границ' },
  '3,9': { id: 85, name: 'Преодоление' },
  '8,13,21': { id: 86, name: 'Системная ошибка' },
  '6,7,17': { id: 87, name: 'Параллельная любовь' },
  '3,8,11': { id: 88, name: 'Успешный правитель' },
  '5,12,20': { id: 89, name: 'Жертва ради мечты' },
  '8,12,20': { id: 90, name: 'Опустошение' },
  '5,11,21': { id: 91, name: 'Подделка' },
  '8,11,19': { id: 92, name: 'Хозяин своей судьбы' },
  '5,7,16': { id: 93, name: 'Утрата авторитета' },
  '6,10,14': { id: 94, name: 'Поворот судьбы' },
  '6,9,21': { id: 95, name: 'Усыновление' },
  '8,10,20': { id: 96, name: 'Освобождение' },
  '3,15,15': { id: 97, name: 'Стерва' },
  '6,16,22': { id: 98, name: 'Шутка-серьезность' },
  '5,7,12': { id: 99, name: 'Сексуальность' },
  '4,18,22': { id: 100, name: 'Растоптать веру' },
  '3,5,20': { id: 101, name: 'Храм или скверна' },
  '4,11,15': { id: 102, name: 'Амбиции' },
  '6,10,16': { id: 103, name: 'Музей ценностей' },
  '4,6,20': { id: 104, name: 'Энергия страсти' }
};

function App() {
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    patronymic: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    fatherSurname: '',
    motherMaidenName: ''
  });

  const [results, setResults] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [chakras, setChakras] = useState(null);
  const [purposes, setPurposes] = useState(null);
  const [errors, setErrors] = useState({});

  // Функция приведения числа (если >= 23, суммируем цифры)
  const reduceNumber = (num) => {
    while (num >= 23) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  // Валидаторы
  const validators = {
    // Проверка дня
    day: (value) => {
      const day = parseInt(value);
      if (!value) return 'День обязателен';
      if (isNaN(day)) return 'День должен быть числом';
      if (day < 1 || day > 31) return 'День должен быть от 1 до 31';
      return null;
    },

    // Проверка месяца
    month: (value) => {
      const month = parseInt(value);
      if (!value) return 'Месяц обязателен';
      if (isNaN(month)) return 'Месяц должен быть числом';
      if (month < 1 || month > 12) return 'Месяц должен быть от 1 до 12';
      return null;
    },

    // Проверка года
    year: (value) => {
      const year = parseInt(value);
      if (!value) return 'Год обязателен';
      if (isNaN(year)) return 'Год должен быть числом';
      if (year < 1900 || year > new Date().getFullYear()) return `Год должен быть от 1900 до ${new Date().getFullYear()}`;
      return null;
    },

    // Проверка текстовых полей (только буквы, дефисы и пробелы)
    textField: (value, fieldName) => {
      if (!value || value.trim() === '') return `${fieldName} обязательно`;
      
      // Проверяем на наличие цифр
      if (/\d/.test(value)) return `${fieldName} не должно содержать цифры`;
      
      // Проверяем на допустимые символы (буквы, дефисы, пробелы, апострофы)
      if (!/^[a-zA-Zа-яА-ЯёЁ\s\-']+$/.test(value)) {
        return `${fieldName} должно содержать только буквы, пробелы и дефисы`;
      }
      
      // Проверяем минимальную длину
      if (value.trim().length < 2) return `${fieldName} должно содержать минимум 2 символа`;
      
      return null;
    },

    // Проверка пола
    gender: (value) => {
      if (!value) return 'Пол обязателен';
      if (!['male', 'female'].includes(value)) return 'Выберите корректный пол';
      return null;
    }
  };

  // Функция валидации конкретного поля
  const validateField = (field, value) => {
    let error = null;
    
    switch (field) {
      case 'day':
        error = validators.day(value);
        break;
      case 'month':
        error = validators.month(value);
        break;
      case 'year':
        error = validators.year(value);
        break;
      case 'surname':
        error = validators.textField(value, 'Фамилия');
        break;
      case 'name':
        error = validators.textField(value, 'Имя');
        break;
      case 'patronymic':
        error = validators.textField(value, 'Отчество');
        break;
      case 'fatherSurname':
        error = validators.textField(value, 'Фамилия отца');
        break;
      case 'motherMaidenName':
        error = validators.textField(value, 'Фамилия матери');
        break;
      case 'gender':
        error = validators.gender(value);
        break;
      default:
        break;
    }
    
    return error;
  };

  // Функция валидации всей формы
  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Функция проверки корректности даты
  const validateDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() == year && 
           date.getMonth() == month - 1 && 
           date.getDate() == day;
  };

  // Функция подсчета стоимости букв в слове
  const calculateLetterValue = (word) => {
    let sum = 0;
    const lowerWord = word.toLowerCase();
    
    for (let char of lowerWord) {
      if (CYRILLIC_VALUES[char]) {
        sum += CYRILLIC_VALUES[char];
      } else if (LATIN_VALUES[char]) {
        sum += LATIN_VALUES[char];
      }
    }
    
    return reduceNumber(sum);
  };

  // Функция создания ключа для поиска программы (сортированные числа)
  const createProgramKey = (num1, num2, num3 = null) => {
    if (num3 === null) {
      return [num1, num2].sort((a, b) => a - b).join(',');
    }
    return [num1, num2, num3].sort((a, b) => a - b).join(',');
  };

  // Функция поиска программы по ключу
  const findProgram = (key) => {
    return ANCESTRAL_PROGRAMS[key] || null;
  };

  // Функция расчета всех программ
  const calculatePrograms = (values) => {
    const { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, u2, v2, x2, y2, o2, p2, r2, s2 } = values;
    const foundPrograms = [];

    // Функция добавления программы, если она найдена
    const addProgram = (key, source, calculation) => {
      const program = findProgram(key);
      if (program && !foundPrograms.some(p => p.id === program.id)) {
        foundPrograms.push({
          ...program,
          source,
          calculation,
          code: key
        });
      }
    };

    // Расчет программ по Мужскому роду
    if (formData.gender === 'male') {
      // 1 колено
      addProgram(createProgramKey(b, t, reduceNumber(b + t)), 'Мужской род - 1 колено Небо', `${b} - ${t} - ${reduceNumber(b + t)}`);
      addProgram(createProgramKey(a, t, reduceNumber(a + t)), 'Мужской род - 1 колено Земля', `${a} - ${t} - ${reduceNumber(a + t)}`);
      addProgram(createProgramKey(reduceNumber(b + a), reduceNumber(t + t), reduceNumber(b + a + t * 2)), 'Мужской род - 1 колено Целостная', `${reduceNumber(b + a)} - ${reduceNumber(t + t)} - ${reduceNumber(b + a + t * 2)}`);
      
      // 2 колено
      addProgram(createProgramKey(k, v2, reduceNumber(k + v2)), 'Мужской род - 2 колено Небо', `${k} - ${v2} - ${reduceNumber(k + v2)}`);
      addProgram(createProgramKey(j, v2, reduceNumber(j + v2)), 'Мужской род - 2 колено Земля', `${j} - ${v2} - ${reduceNumber(j + v2)}`);
      addProgram(createProgramKey(reduceNumber(k + j), reduceNumber(v2 + v2), reduceNumber(k + j + v2 * 2)), 'Мужской род - 2 колено Целостная', `${reduceNumber(k + j)} - ${reduceNumber(v2 + v2)} - ${reduceNumber(k + j + v2 * 2)}`);
      
      // 3 колено
      addProgram(createProgramKey(g, u2, reduceNumber(g + u2)), 'Мужской род - 3 колено Небо', `${g} - ${u2} - ${reduceNumber(g + u2)}`);
      addProgram(createProgramKey(f, u2, reduceNumber(f + u2)), 'Мужской род - 3 колено Земля', `${f} - ${u2} - ${reduceNumber(f + u2)}`);
      addProgram(createProgramKey(reduceNumber(g + f), reduceNumber(u2 + u2), reduceNumber(g + f + u2 * 2)), 'Мужской род - 3 колено Целостная', `${reduceNumber(g + f)} - ${reduceNumber(u2 + u2)} - ${reduceNumber(g + f + u2 * 2)}`);
      
      // 4 колено
      addProgram(createProgramKey(e, z, reduceNumber(e + z)), 'Мужской род - 4 колено Небо', `${e} - ${z} - ${reduceNumber(e + z)}`);
      addProgram(createProgramKey(e, z, reduceNumber(e + z)), 'Мужской род - 4 колено Земля', `${e} - ${z} - ${reduceNumber(e + z)}`);
      addProgram(createProgramKey(reduceNumber(e + e), reduceNumber(z + z), reduceNumber(e + e + z * 2)), 'Мужской род - 4 колено Целостная', `${reduceNumber(e + e)} - ${reduceNumber(z + z)} - ${reduceNumber(e + e + z * 2)}`);
      
      // 5 колено
      addProgram(createProgramKey(i, x2, reduceNumber(i + x2)), 'Мужской род - 5 колено Небо', `${i} - ${x2} - ${reduceNumber(i + x2)}`);
      addProgram(createProgramKey(h, x2, reduceNumber(h + x2)), 'Мужской род - 5 колено Земля', `${h} - ${x2} - ${reduceNumber(h + x2)}`);
      addProgram(createProgramKey(reduceNumber(i + h), reduceNumber(x2 + x2), reduceNumber(i + h + x2 * 2)), 'Мужской род - 5 колено Целостная', `${reduceNumber(i + h)} - ${reduceNumber(x2 + x2)} - ${reduceNumber(i + h + x2 * 2)}`);
      
      // 6 колено
      addProgram(createProgramKey(m, y2, reduceNumber(m + y2)), 'Мужской род - 6 колено Небо', `${m} - ${y2} - ${reduceNumber(m + y2)}`);
      addProgram(createProgramKey(l, y2, reduceNumber(l + y2)), 'Мужской род - 6 колено Земля', `${l} - ${y2} - ${reduceNumber(l + y2)}`);
      addProgram(createProgramKey(reduceNumber(m + l), reduceNumber(y2 + y2), reduceNumber(m + l + y2 * 2)), 'Мужской род - 6 колено Целостная', `${reduceNumber(m + l)} - ${reduceNumber(y2 + y2)} - ${reduceNumber(m + l + y2 * 2)}`);
      
      // 7 колено
      addProgram(createProgramKey(d, w, reduceNumber(d + w)), 'Мужской род - 7 колено Небо', `${d} - ${w} - ${reduceNumber(d + w)}`);
      addProgram(createProgramKey(c, w, reduceNumber(c + w)), 'Мужской род - 7 колено Земля', `${c} - ${w} - ${reduceNumber(c + w)}`);
      addProgram(createProgramKey(reduceNumber(d + c), reduceNumber(w + w), reduceNumber(d + c + w * 2)), 'Мужской род - 7 колено Целостная', `${reduceNumber(d + c)} - ${reduceNumber(w + w)} - ${reduceNumber(d + c + w * 2)}`);
    }

    // Расчет программ по Женскому роду
    if (formData.gender === 'female') {
      // 1 колено
      addProgram(createProgramKey(b, n, reduceNumber(b + n)), 'Женский род - 1 колено Небо', `${b} - ${n} - ${reduceNumber(b + n)}`);
      addProgram(createProgramKey(a, q, reduceNumber(a + q)), 'Женский род - 1 колено Земля', `${a} - ${q} - ${reduceNumber(a + q)}`);
      addProgram(createProgramKey(reduceNumber(b + a), reduceNumber(n + q), reduceNumber(b + n + a + q)), 'Женский род - 1 колено Целостная', `${reduceNumber(b + a)} - ${reduceNumber(n + q)} - ${reduceNumber(b + n + a + q)}`);
      
      // 2 колено
      addProgram(createProgramKey(k, p2, reduceNumber(k + p2)), 'Женский род - 2 колено Небо', `${k} - ${p2} - ${reduceNumber(k + p2)}`);
      addProgram(createProgramKey(j, s2, reduceNumber(j + s2)), 'Женский род - 2 колено Земля', `${j} - ${s2} - ${reduceNumber(j + s2)}`);
      addProgram(createProgramKey(reduceNumber(k + j), reduceNumber(p2 + s2), reduceNumber(k + j + p2 + s2)), 'Женский род - 2 колено Целостная', `${reduceNumber(k + j)} - ${reduceNumber(p2 + s2)} - ${reduceNumber(k + j + p2 + s2)}`);
      
      // 3 колено
      addProgram(createProgramKey(g, o2, reduceNumber(g + o2)), 'Женский род - 3 колено Небо', `${g} - ${o2} - ${reduceNumber(g + o2)}`);
      addProgram(createProgramKey(f, r2, reduceNumber(f + r2)), 'Женский род - 3 колено Земля', `${f} - ${r2} - ${reduceNumber(f + r2)}`);
      addProgram(createProgramKey(reduceNumber(g + f), reduceNumber(o2 + r2), reduceNumber(g + f + o2 + r2)), 'Женский род - 3 колено Целостная', `${reduceNumber(g + f)} - ${reduceNumber(o2 + r2)} - ${reduceNumber(g + f + o2 + r2)}`);
      
      // 4 колено
      addProgram(createProgramKey(e, z, reduceNumber(e + z)), 'Женский род - 4 колено Небо', `${e} - ${z} - ${reduceNumber(e + z)}`);
      addProgram(createProgramKey(e, z, reduceNumber(e + z)), 'Женский род - 4 колено Земля', `${e} - ${z} - ${reduceNumber(e + z)}`);
      addProgram(createProgramKey(reduceNumber(e + z), reduceNumber(z + z), reduceNumber(e + z + e + z)), 'Женский род - 4 колено Целостная', `${reduceNumber(e + z)} - ${reduceNumber(z + z)} - ${reduceNumber(e + z + e + z)}`);
      
      // 5 колено
      addProgram(createProgramKey(d, q, reduceNumber(d + q)), 'Женский род - 5 колено Небо', `${d} - ${q} - ${reduceNumber(d + q)}`);
      addProgram(createProgramKey(h, o2, reduceNumber(h + o2)), 'Женский род - 5 колено Земля', `${h} - ${o2} - ${reduceNumber(h + o2)}`);
      addProgram(createProgramKey(reduceNumber(d + h), reduceNumber(q + o2), reduceNumber(d + h + q + o2)), 'Женский род - 5 колено Целостная', `${reduceNumber(d + h)} - ${reduceNumber(q + o2)} - ${reduceNumber(d + h + q + o2)}`);
      
      // 6 колено
      addProgram(createProgramKey(m, s2, reduceNumber(m + s2)), 'Женский род - 6 колено Небо', `${m} - ${s2} - ${reduceNumber(m + s2)}`);
      addProgram(createProgramKey(l, p2, reduceNumber(l + p2)), 'Женский род - 6 колено Земля', `${l} - ${p2} - ${reduceNumber(l + p2)}`);
      addProgram(createProgramKey(reduceNumber(m + l), reduceNumber(s2 + p2), reduceNumber(m + l + s2 + p2)), 'Женский род - 6 колено Целостная', `${reduceNumber(m + l)} - ${reduceNumber(s2 + p2)} - ${reduceNumber(m + l + s2 + p2)}`);
      
      // 7 колено
      addProgram(createProgramKey(i, r2, reduceNumber(i + r2)), 'Женский род - 7 колено Небо', `${i} - ${r2} - ${reduceNumber(i + r2)}`);
      addProgram(createProgramKey(c, n, reduceNumber(c + n)), 'Женский род - 7 колено Земля', `${c} - ${n} - ${reduceNumber(c + n)}`);
      addProgram(createProgramKey(reduceNumber(i + c), reduceNumber(r2 + n), reduceNumber(i + c + r2 + n)), 'Женский род - 7 колено Целостная', `${reduceNumber(i + c)} - ${reduceNumber(r2 + n)} - ${reduceNumber(i + c + r2 + n)}`);
    }

    // Прочие источники программ
    // Личный квадрат
    addProgram(createProgramKey(a, j, f), 'Личный квадрат', `${a} - ${j} - ${f}`);
    addProgram(createProgramKey(f, j, a), 'Личный квадрат', `${f} - ${j} - ${a}`);
    addProgram(createProgramKey(b, k, g), 'Личный квадрат', `${b} - ${k} - ${g}`);
    addProgram(createProgramKey(g, k, b), 'Личный квадрат', `${g} - ${k} - ${b}`);
    addProgram(createProgramKey(c, l, h), 'Личный квадрат', `${c} - ${l} - ${h}`);
    addProgram(createProgramKey(h, l, c), 'Личный квадрат', `${h} - ${l} - ${c}`);
    addProgram(createProgramKey(d, m, i), 'Личный квадрат', `${d} - ${m} - ${i}`);
    addProgram(createProgramKey(i, m, d), 'Личный квадрат', `${i} - ${m} - ${d}`);

    // Родовой квадрат
    addProgram(createProgramKey(t, v, u), 'Родовой квадрат', `${t} - ${v} - ${u}`);
    addProgram(createProgramKey(u, v, t), 'Родовой квадрат', `${u} - ${v} - ${t}`);
    addProgram(createProgramKey(n, p, o), 'Родовой квадрат', `${n} - ${p} - ${o}`);
    addProgram(createProgramKey(o, p, n), 'Родовой квадрат', `${o} - ${p} - ${n}`);
    addProgram(createProgramKey(w, y, x), 'Родовой квадрат', `${w} - ${y} - ${x}`);
    addProgram(createProgramKey(x, y, w), 'Родовой квадрат', `${x} - ${y} - ${w}`);
    addProgram(createProgramKey(q, s, r), 'Родовой квадрат', `${q} - ${s} - ${r}`);
    addProgram(createProgramKey(r, s, q), 'Родовой квадрат', `${r} - ${s} - ${q}`);

    // Таблица чакр
    addProgram(createProgramKey(b, a, reduceNumber(b + a)), 'Таблица чакр', `${b} - ${a} - ${reduceNumber(b + a)}`);
    addProgram(createProgramKey(a, b, reduceNumber(a + b)), 'Таблица чакр', `${a} - ${b} - ${reduceNumber(a + b)}`);
    addProgram(createProgramKey(k, j, reduceNumber(k + j)), 'Таблица чакр', `${k} - ${j} - ${reduceNumber(k + j)}`);
    addProgram(createProgramKey(j, k, reduceNumber(j + k)), 'Таблица чакр', `${j} - ${k} - ${reduceNumber(j + k)}`);
    addProgram(createProgramKey(g, f, reduceNumber(g + f)), 'Таблица чакр', `${g} - ${f} - ${reduceNumber(g + f)}`);
    addProgram(createProgramKey(f, g, reduceNumber(f + g)), 'Таблица чакр', `${f} - ${g} - ${reduceNumber(f + g)}`);
    addProgram(createProgramKey(n, q, reduceNumber(n + q)), 'Таблица чакр', `${n} - ${q} - ${reduceNumber(n + q)}`);
    addProgram(createProgramKey(q, n, reduceNumber(q + n)), 'Таблица чакр', `${q} - ${n} - ${reduceNumber(q + n)}`);
    addProgram(createProgramKey(t, w, reduceNumber(t + w)), 'Таблица чакр', `${t} - ${w} - ${reduceNumber(t + w)}`);
    addProgram(createProgramKey(w, t, reduceNumber(w + t)), 'Таблица чакр', `${w} - ${t} - ${reduceNumber(w + t)}`);
    addProgram(createProgramKey(e, z, reduceNumber(e + z)), 'Таблица чакр', `${e} - ${z} - ${reduceNumber(e + z)}`);
    addProgram(createProgramKey(i, h, reduceNumber(i + h)), 'Таблица чакр', `${i} - ${h} - ${reduceNumber(i + h)}`);
    addProgram(createProgramKey(h, i, reduceNumber(h + i)), 'Таблица чакр', `${h} - ${i} - ${reduceNumber(h + i)}`);
    addProgram(createProgramKey(m, l, reduceNumber(m + l)), 'Таблица чакр', `${m} - ${l} - ${reduceNumber(m + l)}`);
    addProgram(createProgramKey(l, m, reduceNumber(l + m)), 'Таблица чакр', `${l} - ${m} - ${reduceNumber(l + m)}`);
    addProgram(createProgramKey(d, c, reduceNumber(d + c)), 'Таблица чакр', `${d} - ${c} - ${reduceNumber(d + c)}`);
    addProgram(createProgramKey(c, d, reduceNumber(c + d)), 'Таблица чакр', `${c} - ${d} - ${reduceNumber(c + d)}`);

    // Двухзначные программы
    addProgram(createProgramKey(7, 19), 'Достаток', `${7} - ${19}`);
    addProgram(createProgramKey(5, 6), 'Красота и уют в доме', `${5} - ${6}`);
    addProgram(createProgramKey(3, 9), 'Преодоление', `${3} - ${9}`);

    return foundPrograms;
  };

  // Функция расчета таблицы чакр
  const calculateChakras = (values) => {
    const { a, b, c, d, e, f, g, h, i, j, k, l, m, n, q, t, w, z } = values;
    
    const chakraData = [
      { name: '9. Родник', energy: b, physics: a, emotions: reduceNumber(b + a) },
      { name: '8. Чело', energy: k, physics: j, emotions: reduceNumber(k + j) },
      { name: '7. Устье', energy: g, physics: f, emotions: reduceNumber(g + f) },
      { name: '6. Леля', energy: n, physics: q, emotions: reduceNumber(n + q) },
      { name: '5. Лада', energy: t, physics: w, emotions: reduceNumber(t + w) },
      { name: '4. Перси', energy: e, physics: z, emotions: reduceNumber(e + z) },
      { name: '3. Живот', energy: i, physics: h, emotions: reduceNumber(i + h) },
      { name: '2. Зарод', energy: m, physics: l, emotions: reduceNumber(m + l) },
      { name: '1. Исток', energy: d, physics: c, emotions: reduceNumber(d + c) }
    ];

    // Расчет итоговых сумм
    const totalEnergy = reduceNumber(chakraData.reduce((sum, chakra) => sum + chakra.energy, 0));
    const totalPhysics = reduceNumber(chakraData.reduce((sum, chakra) => sum + chakra.physics, 0));
    const totalEmotions = reduceNumber(chakraData.reduce((sum, chakra) => sum + chakra.emotions, 0));

    return {
      chakras: chakraData,
      totals: {
        energy: totalEnergy,
        physics: totalPhysics,
        emotions: totalEmotions
      }
    };
  };

  // Функция расчета предназначений
  const calculatePurposes = (values) => {
    const { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z } = values;
    
    // Личное предназначение (задачи перед самим собой)
    const personalSky = b; // Небо
    const personalEarth = a; // Земля
    const personalPurpose = reduceNumber(b + a);
    
    // Социальное предназначение (задачи перед родом и другими людьми)
    const socialMale = t; // M (мужчина)
    const socialFemale = n; // Ж (женщина)
    const socialPurpose = reduceNumber(t + n);
    
    // Духовное предназначение (задача Души)
    const spiritualPurpose = reduceNumber(b + d + a + c + n + q + t + w);
    
    // Планетарное предназначение (задача перед миром)
    const planetaryPurpose = reduceNumber(b + d + a + c + (n + q + t + w) * 2);

    return {
      personal: {
        sky: personalSky,
        earth: personalEarth,
        purpose: personalPurpose
      },
      social: {
        male: socialMale,
        female: socialFemale,
        purpose: socialPurpose
      },
      spiritual: {
        purpose: spiritualPurpose,
        formula: `${b} + ${d} + ${a} + ${c} + ${n} + ${q} + ${t} + ${w}`
      },
      planetary: {
        purpose: planetaryPurpose,
        formula: `${b} + ${d} + ${a} + ${c} + (${n} + ${q} + ${t} + ${w}) * 2`
      }
    };
  };



  // Основная функция расчета
  const calculateMatrix = () => {
    // Сначала валидируем форму
    if (!validateForm()) {
      return;
    }

    const { day, month, year, name, surname, patronymic, gender, fatherSurname, motherMaidenName } = formData;
    
    // Дополнительная проверка корректности даты
    if (!validateDate(parseInt(day), parseInt(month), parseInt(year))) {
      setErrors(prev => ({
        ...prev,
        day: 'Некорректная дата'
      }));
      return;
    }

    // Сохраняем оригинальные значения для расчета кармы
    const originalDay = parseInt(day);
    const originalYear = parseInt(year);
    
    // Основные переменные
    const a = reduceNumber(parseInt(day));
    const b = reduceNumber(parseInt(month));
    const c = reduceNumber(year.split('').reduce((sum, digit) => sum + parseInt(digit), 0));
    
    const d = reduceNumber(a + b + c);
    const e = reduceNumber(a + b + c + d);
    const f = reduceNumber(a + e);
    const g = reduceNumber(b + e);
    const h = reduceNumber(c + e);
    const i = reduceNumber(d + e);
    const j = reduceNumber(a + f);
    const k = reduceNumber(b + g);
    const l = reduceNumber(c + h);
    const m = reduceNumber(d + i);
    
    const n = calculateLetterValue(name);
    const o = reduceNumber(n + e);
    const p = reduceNumber(n + o);
    
    const q = calculateLetterValue(motherMaidenName);
    const r = reduceNumber(q + e);
    const s = reduceNumber(q + r);
    
    const t = calculateLetterValue(surname);
    const u = reduceNumber(t + e);
    const v = reduceNumber(t + u);
    
    // w зависит от пола
    const w = gender === 'male' 
      ? calculateLetterValue(fatherSurname)
      : calculateLetterValue(patronymic);
    
    const x = reduceNumber(w + e);
    const y = reduceNumber(w + x);
    const z = reduceNumber(t + n + w + q);
    
    const u2 = reduceNumber(t + z);
    const v2 = reduceNumber(t + u2);
    const x2 = reduceNumber(w + z);
    const y2 = reduceNumber(w + x2);
    const o2 = reduceNumber(n + z);
    const p2 = reduceNumber(n + o2);
    const r2 = reduceNumber(q + z);
    const s2 = reduceNumber(q + r2);

    const a2 = (originalDay >= 23 && originalDay <= 31) ? a - 22 : null;
    const originalYearSum = originalYear.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const c2 = originalYearSum > 22 ? c - 22 : null;

    const calculatedValues = {
      a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
      u2, v2, x2, y2, o2, p2, r2, s2, a2, c2
    };

    setResults(calculatedValues);
    
    // Расчет программ
    const foundPrograms = calculatePrograms(calculatedValues);
    
    setPrograms(foundPrograms.sort((a, b) => a.id - b.id));

    // Расчет чакр
    const chakraResults = calculateChakras(calculatedValues);
    setChakras(chakraResults);

    // Расчет предназначений
    const purposeResults = calculatePurposes(calculatedValues);
    setPurposes(purposeResults);


    // Очищаем все ошибки после успешного расчета
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    // Ограничения на ввод
    if (field === 'day' || field === 'month' || field === 'year') {
      // Разрешаем только цифры
      if (value && !/^\d+$/.test(value)) return;
    } else if (['surname', 'name', 'patronymic', 'fatherSurname', 'motherMaidenName'].includes(field)) {
      // Для текстовых полей запрещаем цифры в реальном времени
      if (value && /\d/.test(value)) return;
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Функция для отображения ошибок
  const renderError = (field) => {
    if (errors[field]) {
      return (
        <div style={{
          color: '#e74c3c',
          fontSize: '0.85rem',
          marginTop: '4px',
          fontWeight: '500'
        }}>
          {errors[field]}
        </div>
      );
    }
    return null;
  };

  // Проверяем, есть ли ошибки в форме
  const hasErrors = Object.values(errors).some(error => error !== null);
  const isFormValid = Object.keys(formData).every(field => {
    if (['fatherSurname', 'motherMaidenName'].includes(field)) return true; // Эти поля опциональны
    return formData[field] && formData[field].trim() !== '';
  }) && !hasErrors;

  return (
    <div className="App">
      <div className="calculator-container">
        <h1>Калькулятор Матрицы Судьбы</h1>
        
        <div className="form-section">
          <div className="input-group">
            <label>Фамилия:</label>
            <input
              type="text"
              value={formData.surname}
              onChange={(e) => handleInputChange('surname', e.target.value)}
              placeholder="Введите фамилию"
              style={{
                borderColor: errors.surname ? '#e74c3c' : '#e1e8ed'
              }}
            />
            {renderError('surname')}
          </div>

          <div className="input-group">
            <label>Имя:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Введите имя"
              style={{
                borderColor: errors.name ? '#e74c3c' : '#e1e8ed'
              }}
            />
            {renderError('name')}
          </div>

          <div className="input-group">
            <label>Отчество:</label>
            <input
              type="text"
              value={formData.patronymic}
              onChange={(e) => handleInputChange('patronymic', e.target.value)}
              placeholder="Введите отчество"
              style={{
                borderColor: errors.patronymic ? '#e74c3c' : '#e1e8ed'
              }}
            />
            {renderError('patronymic')}
          </div>

          <div className="date-group">
            <div className="input-group">
              <label>День рождения:</label>
              <input
                type="text"
                maxLength="2"
                value={formData.day}
                onChange={(e) => handleInputChange('day', e.target.value)}
                placeholder="ДД"
                style={{
                  borderColor: errors.day ? '#e74c3c' : '#e1e8ed'
                }}
              />
              {renderError('day')}
            </div>

            <div className="input-group">
              <label>Месяц рождения:</label>
              <input
                type="text"
                maxLength="2"
                value={formData.month}
                onChange={(e) => handleInputChange('month', e.target.value)}
                placeholder="ММ"
                style={{
                  borderColor: errors.month ? '#e74c3c' : '#e1e8ed'
                }}
              />
              {renderError('month')}
            </div>

            <div className="input-group">
              <label>Год рождения:</label>
              <input
                type="text"
                maxLength="4"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                placeholder="ГГГГ"
                style={{
                  borderColor: errors.year ? '#e74c3c' : '#e1e8ed'
                }}
              />
              {renderError('year')}
            </div>
          </div>

          <div className="input-group">
            <label>Пол:</label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              style={{
                borderColor: errors.gender ? '#e74c3c' : '#e1e8ed'
              }}
            >
              <option value="">Выберите пол</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
            {renderError('gender')}
          </div>

          <div className="input-group">
            <label>Фамилия отца:</label>
            <input
              type="text"
              value={formData.fatherSurname}
              onChange={(e) => handleInputChange('fatherSurname', e.target.value)}
              placeholder="Введите фамилию отца"
              style={{
                borderColor: errors.fatherSurname ? '#e74c3c' : '#e1e8ed'
              }}
            />
            {renderError('fatherSurname')}
          </div>

          <div className="input-group">
            <label>Фамилия матери (девичья):</label>
            <input
              type="text"
              value={formData.motherMaidenName}
              onChange={(e) => handleInputChange('motherMaidenName', e.target.value)}
              placeholder="Введите девичью фамилию матери"
              style={{
                borderColor: errors.motherMaidenName ? '#e74c3c' : '#e1e8ed'
              }}
            />
            {renderError('motherMaidenName')}
          </div>

          <button 
            className="calculate-btn"
            onClick={calculateMatrix}
            disabled={!isFormValid}
            style={{
              opacity: !isFormValid ? 0.6 : 1,
              cursor: !isFormValid ? 'not-allowed' : 'pointer'
            }}
          >
            Посчитать
          </button>
          
          {hasErrors && (
            <div style={{
              backgroundColor: '#fdf2f2',
              border: '1px solid #f5c6cb',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '15px',
              color: '#721c24'
            }}>
              <strong>Пожалуйста, исправьте ошибки в форме:</strong>
              <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                {Object.entries(errors).map(([field, error]) => 
                  error && <li key={field}>{error}</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {results && (
          <div className="results-section">
            <h2>Результаты расчета:</h2>
            <div className="results-grid">
              <div className="result-item">a = {results.a}</div>
              <div className="result-item">b = {results.b}</div>
              <div className="result-item">c = {results.c}</div>
              <div className="result-item">d = {results.d}</div>
              <div className="result-item">e = {results.e}</div>
              <div className="result-item">f = {results.f}</div>
              <div className="result-item">g = {results.g}</div>
              <div className="result-item">h = {results.h}</div>
              <div className="result-item">i = {results.i}</div>
              <div className="result-item">j = {results.j}</div>
              <div className="result-item">k = {results.k}</div>
              <div className="result-item">l = {results.l}</div>
              <div className="result-item">m = {results.m}</div>
              <div className="result-item">n = {results.n}</div>
              <div className="result-item">o = {results.o}</div>
              <div className="result-item">p = {results.p}</div>
              <div className="result-item">q = {results.q}</div>
              <div className="result-item">r = {results.r}</div>
              <div className="result-item">s = {results.s}</div>
              <div className="result-item">t = {results.t}</div>
              <div className="result-item">u = {results.u}</div>
              <div className="result-item">v = {results.v}</div>
              <div className="result-item">w = {results.w}</div>
              <div className="result-item">x = {results.x}</div>
              <div className="result-item">y = {results.y}</div>
              <div className="result-item">z = {results.z}</div>
              <div className="result-item">u2 = {results.u2}</div>
              <div className="result-item">v2 = {results.v2}</div>
              <div className="result-item">x2 = {results.x2}</div>
              <div className="result-item">y2 = {results.y2}</div>
              <div className="result-item">o2 = {results.o2}</div>
              <div className="result-item">p2 = {results.p2}</div>
              <div className="result-item">r2 = {results.r2}</div>
              <div className="result-item">s2 = {results.s2}</div>
            </div>
          </div>
        )}

        {programs.length > 0 && (
          <div className="results-section">
            <h2>Найденные родовые программы:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              {programs.map((program, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #fff3cd, #ffeaa7)',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '1px solid #f39c12',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#d35400', marginBottom: '5px' }}>
                    №{program.id}. {program.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '3px' }}>
                    Источник: {program.source}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                    Код: {program.calculation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {chakras && (
          <div className="results-section">
            <h2>Таблица чакр:</h2>
            <div style={{ 
              marginTop: '20px', 
              overflowX: 'auto',
              border: '2px solid rgb(127,83,142)',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgb(127,83,142)', color: 'white' }}>
                    <th style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>Энергия</th>
                    <th style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>Физика</th>
                    <th style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>Эмоции</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Названия чакр</th>
                  </tr>
                </thead>
                <tbody>
                  {chakras.chakras.map((chakra, index) => {
                    const colors = [
                      '#B76FAE', 
                      '#7396E6', 
                      '#A8C4F1', 
                      '#97D0C8', 
                      '#D1F978', 
                      '#ACF79A', 
                      '#F0FC79', 
                      '#EAD666', 
                      '#C8644A', 
                    ];
                    const bgColor = colors[index];
                    const textColor =  '#2c3e50' ;
                    
                    return (
                      <tr key={index} style={{ backgroundColor: bgColor, color: textColor }}>
                        <td style={{ 
                          padding: '12px', 
                          textAlign: 'center', 
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          {chakra.energy}
                        </td>
                        <td style={{ 
                          padding: '12px', 
                          textAlign: 'center', 
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          {chakra.physics}
                        </td>
                        <td style={{ 
                          padding: '12px', 
                          textAlign: 'center', 
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          {chakra.emotions}
                        </td>
                        <td style={{ 
                          padding: '12px', 
                          textAlign: 'left',
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          {chakra.name}
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{ 
                    backgroundColor: '#2c3e50', 
                    color: 'white', 
                    borderTop: '3px solid rgb(127,83,142)' 
                  }}>
                    <td style={{ 
                      padding: '15px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}>
                      {chakras.totals.energy}
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}>
                      {chakras.totals.physics}
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}>
                      {chakras.totals.emotions}
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}>
                      ИТОГО
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {purposes && (
          <div className="results-section">
            <h2>Расчет предназначений:</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px', 
              marginTop: '20px' 
            }}>
              
              {/* Личное предназначение */}
              <div style={{
                background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #4caf50',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ 
                  color: '#2e7d32', 
                  marginBottom: '15px', 
                  textAlign: 'center',
                  fontSize: '1.3rem'
                }}>
                  Личное предназначение
                </h3>
                <p style={{ 
                  color: '#1b5e20', 
                  marginBottom: '15px', 
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  Задачи перед самим собой
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      background: 'white', 
                      border: '3px solid #4caf50', 
                      borderRadius: '50%', 
                      width: '60px', 
                      height: '60px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#2e7d32',
                      margin: '0 auto 8px'
                    }}>
                      {purposes.personal.sky}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#1b5e20' }}>Небо</div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      background: 'white', 
                      border: '3px solid #4caf50', 
                      borderRadius: '50%', 
                      width: '60px', 
                      height: '60px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#2e7d32',
                      margin: '0 auto 8px'
                    }}>
                      {purposes.personal.earth}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#1b5e20' }}>Земля</div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: '#4caf50', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '80px', 
                    height: '80px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    margin: '0 auto 10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }}>
                    {purposes.personal.purpose}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#1b5e20', fontWeight: 'bold' }}>
                    {purposes.personal.sky} + {purposes.personal.earth} = {purposes.personal.purpose}
                  </div>
                </div>
              </div>

              {/* Социальное предназначение */}
              <div style={{
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #2196f3',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ 
                  color: '#1565c0', 
                  marginBottom: '15px', 
                  textAlign: 'center',
                  fontSize: '1.3rem'
                }}>
                  Социальное предназначение
                </h3>
                <p style={{ 
                  color: '#0d47a1', 
                  marginBottom: '15px', 
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  Задачи перед родом и другими людьми
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      background: 'white', 
                      border: '3px solid #2196f3', 
                      borderRadius: '50%', 
                      width: '60px', 
                      height: '60px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#1565c0',
                      margin: '0 auto 8px'
                    }}>
                      {purposes.social.male}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#0d47a1' }}>М</div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      background: 'white', 
                      border: '3px solid #2196f3', 
                      borderRadius: '50%', 
                      width: '60px', 
                      height: '60px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#1565c0',
                      margin: '0 auto 8px'
                    }}>
                      {purposes.social.female}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#0d47a1' }}>Ж</div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: '#2196f3', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '80px', 
                    height: '80px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    margin: '0 auto 10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }}>
                    {purposes.social.purpose}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#0d47a1', fontWeight: 'bold' }}>
                    {purposes.social.male} + {purposes.social.female} = {purposes.social.purpose}
                  </div>
                </div>
              </div>

              {/* Духовное предназначение */}
              <div style={{
                background: 'linear-gradient(135deg, #fce4ec, #f8bbd9)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #e91e63',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ 
                  color: '#ad1457', 
                  marginBottom: '15px', 
                  textAlign: 'center',
                  fontSize: '1.3rem'
                }}>
                  Духовное предназначение
                </h3>
                <p style={{ 
                  color: '#880e4f', 
                  marginBottom: '15px', 
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  Задача Души
                </p>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: '#e91e63', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '100px', 
                    height: '100px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    margin: '0 auto 15px',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
                  }}>
                    {purposes.spiritual.purpose}
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: '#880e4f', 
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid #e91e63'
                  }}>
                    {purposes.spiritual.formula} = {purposes.spiritual.purpose}
                  </div>
                </div>
              </div>

              {/* Планетарное предназначение */}
              <div style={{
                background: 'linear-gradient(135deg, #fff3e0, #ffcc80)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #ff9800',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ 
                  color: '#e65100', 
                  marginBottom: '15px', 
                  textAlign: 'center',
                  fontSize: '1.3rem'
                }}>
                  Планетарное предназначение
                </h3>
                <p style={{ 
                  color: '#bf360c', 
                  marginBottom: '15px', 
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  Задача перед миром
                </p>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: '#ff9800', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '100px', 
                    height: '100px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    margin: '0 auto 15px',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
                  }}>
                    {purposes.planetary.purpose}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#bf360c', 
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid #ff9800'
                  }}>
                    {purposes.planetary.formula} = {purposes.planetary.purpose}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {

        }
        {results && (
          <div className="results-section">
            <h2>Расчет благой кармы и точек роста:</h2>
            
            {/* Информация о специальных значениях */}
            {(results.a2 || results.c2) && (
              <div style={{
                backgroundColor: '#f0f8ff',
                border: '2px solid #4682b4',
                borderRadius: '10px',
                padding: '15px',
                marginTop: '15px',
                marginBottom: '20px'
              }}>
                <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Специальные условия:</h4>
                {results.a2 && (
                  <p style={{ color: 'rgb(127,83,142)', margin: '5px 0' }}>
                    • a2 = {results.a2} (день рождения {results.originalDay} ≥ 23)
                  </p>
                )}
                {results.c2 && (
                  <p style={{ color: 'rgb(127,83,142)', margin: '5px 0' }}>
                    • c2 = {results.c2} (сумма цифр года {results.originalYearSum} больше 22)
                  </p>
                )}
              </div>
            )}

            <div style={{ 
              overflowX: 'auto',
              border: '2px solid rgb(127,83,142)',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginTop: '20px'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '0.9rem',
                backgroundColor: 'white',
                minWidth: '700px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgb(127,83,142)', color: 'white' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', minWidth: '150px' }}>Тип</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '100px' }}>{36 - results.a + results.b + results.c}</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '80px' }}>{46 - results.a + results.b + results.c}</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '80px' }}>{56 - results.a + results.b + results.c}</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '120px' }}>{56 - results.a + results.b + results.c}+</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Благая карма 1 */}
                  
                  <tr style={{ backgroundColor: '#e8f5e8' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#2e7d32' }}>Благая карма 1</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a + results.b}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a + results.c}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a * 2 + results.b + results.c}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.b + results.c}</td>
                  </tr>

                  {/* Благая карма 2 */}
                  {results.a2 && (
                    <tr style={{ backgroundColor: '#e3f2fd' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold', color: '#1565c0' }}>Благая карма 2</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a2 + results.b}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a2 + results.c}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a2 * 2 + results.b + results.c}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.b + results.c}</td>
                    </tr>
                  )}

                  {/* Благая карма 3 */}
                  {results.c2 && (
                    <tr style={{ backgroundColor: '#fce4ec' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold', color: '#ad1457' }}>Благая карма 3</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a + results.b}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a + results.c2}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a * 2 + results.b + results.c2}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.b + results.c2}</td>
                    </tr>
                  )}

                  {/* Благая карма 4 */}
                  {results.c2 && results.a2 && (
                    <tr style={{ backgroundColor: '#fff3e0' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold', color: '#e65100' }}>Благая карма 4</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a2 + results.b}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a2 + results.c2}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a2 * 2 + results.b + results.c2}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.b + results.c2}</td>
                    </tr>
                  )}

                  {/* Разделитель */}
                  <tr style={{ backgroundColor: 'rgb(127,83,142)' }}>
                    <td colSpan="6" style={{ padding: '2px' }}></td>
                  </tr>


                  {/* Точка роста 1 */}
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#7f8c8d' }}>Точка роста 1</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#7f8c8d' }}>{results.a - results.b}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a - results.c}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{(results.a - results.b) - (results.a - results.c)}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.b - results.c}</td>
                  </tr>

                  {/* Точка роста 2 */}
                  {results.a2 && (
                    <tr style={{ backgroundColor: '#f0f8ff' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#7f8c8d' }}>Точка роста 2</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#7f8c8d' }}>{results.a2 - results.b}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a2 - results.c}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{(results.a2 - results.b) - (results.a2 - results.c)}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.b - results.c}</td>
                    </tr>
                  )}

                  {/* Точка роста 3 */}
                  {results.c2 && (
                    <tr style={{ backgroundColor: '#fef9e7' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#7f8c8d' }}>Точка роста 3</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#7f8c8d' }}>{results.a - results.b}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a - results.c2}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{(results.a - results.b) - (results.a - results.c2)}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.b - results.c2}</td>
                    </tr>
                  )}

                  {/* Точка роста 4 */}
                  {results.c2 && results.a2 && (
                    <tr style={{ backgroundColor: '#f3e5f5' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#7f8c8d' }}>Точка роста 4</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#7f8c8d' }}>{results.a2 - results.b}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.a2 - results.c2}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{(results.a2 - results.b) - (results.a2 - results.c2)}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{results.b - results.c2}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 