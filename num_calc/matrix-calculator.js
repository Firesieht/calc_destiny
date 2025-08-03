'use strict';

const e = React.createElement;

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

// Полная таблица родовых программ
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

class MatrixCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        surname: '',
        name: '',
        patronymic: '',
        day: '',
        month: '',
        year: '',
        gender: '',
        fatherSurname: '',
        motherMaidenName: ''
      },
      results: null,
      programs: [],
      chakras: null,
      purposes: null,
      karma: null,
      errors: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculateMatrix = this.calculateMatrix.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  // Функция приведения числа
  reduceNumber(num) {
    while (num >= 23) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  }

  // Валидаторы
  validateField(field, value) {
    switch (field) {
      case 'day':
        const day = parseInt(value);
        if (!value) return 'День обязателен';
        if (isNaN(day)) return 'День должен быть числом';
        if (day < 1 || day > 31) return 'День должен быть от 1 до 31';
        return null;
      case 'month':
        const month = parseInt(value);
        if (!value) return 'Месяц обязателен';
        if (isNaN(month)) return 'Месяц должен быть числом';
        if (month < 1 || month > 12) return 'Месяц должен быть от 1 до 12';
        return null;
      case 'year':
        const year = parseInt(value);
        if (!value) return 'Год обязателен';
        if (isNaN(year)) return 'Год должен быть числом';
        if (year < 1900 || year > new Date().getFullYear()) return `Год должен быть от 1900 до ${new Date().getFullYear()}`;
        return null;
      case 'surname':
      case 'name':
      case 'patronymic':
      case 'fatherSurname':
      case 'motherMaidenName':
        const fieldNames = {
          'surname': 'Фамилия',
          'name': 'Имя',
          'patronymic': 'Отчество',
          'fatherSurname': 'Фамилия отца',
          'motherMaidenName': 'Фамилия матери'
        };
        const fieldName = fieldNames[field];
        if (!value || value.trim() === '') return `${fieldName} обязательно`;
        if (/\d/.test(value)) return `${fieldName} не должно содержать цифры`;
        if (!/^[a-zA-Zа-яА-ЯёЁ\s\-']+$/.test(value)) {
          return `${fieldName} должно содержать только буквы, пробелы и дефисы`;
        }
        if (value.trim().length < 2) return `${fieldName} должно содержать минимум 2 символа`;
        return null;
      case 'gender':
        if (!value) return 'Пол обязателен';
        if (!['male', 'female'].includes(value)) return 'Выберите корректный пол';
        return null;
      default:
        return null;
    }
  }

  validateForm() {
    const newErrors = {};
    Object.keys(this.state.formData).forEach(field => {
      const error = this.validateField(field, this.state.formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    this.setState({ errors: newErrors });
    return Object.keys(newErrors).length === 0;
  }

  // Функция проверки корректности даты
  validateDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() == year && 
           date.getMonth() == month - 1 && 
           date.getDate() == day;
  }

  calculateLetterValue(word) {
    let sum = 0;
    const lowerWord = word.toLowerCase();
    
    for (let char of lowerWord) {
      if (CYRILLIC_VALUES[char]) {
        sum += CYRILLIC_VALUES[char];
      } else if (LATIN_VALUES[char]) {
        sum += LATIN_VALUES[char];
      }
    }
    
    return this.reduceNumber(sum);
  }

  // Функция создания ключа для поиска программы (сортированные числа)
  createProgramKey(num1, num2, num3 = null) {
    if (num3 === null) {
      return [num1, num2].sort((a, b) => a - b).join(',');
    }
    return [num1, num2, num3].sort((a, b) => a - b).join(',');
  }

  // Функция поиска программы по ключу
  findProgram(key) {
    return ANCESTRAL_PROGRAMS[key] || null;
  }

  // Функция расчета всех программ
  calculatePrograms(values) {
    const { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, u2, v2, x2, y2, o2, p2, r2, s2 } = values;
    const foundPrograms = [];

    // Функция добавления программы, если она найдена
    const addProgram = (key, source, calculation) => {
      const program = this.findProgram(key);
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
    if (this.state.formData.gender === 'male') {
      // 1 колено
      addProgram(this.createProgramKey(b, t, this.reduceNumber(b + t)), 'Мужской род - 1 колено Небо', `${b} - ${t} - ${this.reduceNumber(b + t)}`);
      addProgram(this.createProgramKey(a, t, this.reduceNumber(a + t)), 'Мужской род - 1 колено Земля', `${a} - ${t} - ${this.reduceNumber(a + t)}`);
      addProgram(this.createProgramKey(this.reduceNumber(b + a), this.reduceNumber(t + t), this.reduceNumber(b + a + t * 2)), 'Мужской род - 1 колено Целостная', `${this.reduceNumber(b + a)} - ${this.reduceNumber(t + t)} - ${this.reduceNumber(b + a + t * 2)}`);
      
      // 2 колено
      addProgram(this.createProgramKey(k, v2, this.reduceNumber(k + v2)), 'Мужской род - 2 колено Небо', `${k} - ${v2} - ${this.reduceNumber(k + v2)}`);
      addProgram(this.createProgramKey(j, v2, this.reduceNumber(j + v2)), 'Мужской род - 2 колено Земля', `${j} - ${v2} - ${this.reduceNumber(j + v2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(k + j), this.reduceNumber(v2 + v2), this.reduceNumber(k + j + v2 * 2)), 'Мужской род - 2 колено Целостная', `${this.reduceNumber(k + j)} - ${this.reduceNumber(v2 + v2)} - ${this.reduceNumber(k + j + v2 * 2)}`);
      
      // 3 колено
      addProgram(this.createProgramKey(g, u2, this.reduceNumber(g + u2)), 'Мужской род - 3 колено Небо', `${g} - ${u2} - ${this.reduceNumber(g + u2)}`);
      addProgram(this.createProgramKey(f, u2, this.reduceNumber(f + u2)), 'Мужской род - 3 колено Земля', `${f} - ${u2} - ${this.reduceNumber(f + u2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(g + f), this.reduceNumber(u2 + u2), this.reduceNumber(g + f + u2 * 2)), 'Мужской род - 3 колено Целостная', `${this.reduceNumber(g + f)} - ${this.reduceNumber(u2 + u2)} - ${this.reduceNumber(g + f + u2 * 2)}`);
      
      // 4 колено
      addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Мужской род - 4 колено Небо', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
      addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Мужской род - 4 колено Земля', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
      addProgram(this.createProgramKey(this.reduceNumber(e + e), this.reduceNumber(z + z), this.reduceNumber(e + e + z * 2)), 'Мужской род - 4 колено Целостная', `${this.reduceNumber(e + e)} - ${this.reduceNumber(z + z)} - ${this.reduceNumber(e + e + z * 2)}`);
      
      // 5 колено
      addProgram(this.createProgramKey(i, x2, this.reduceNumber(i + x2)), 'Мужской род - 5 колено Небо', `${i} - ${x2} - ${this.reduceNumber(i + x2)}`);
      addProgram(this.createProgramKey(h, x2, this.reduceNumber(h + x2)), 'Мужской род - 5 колено Земля', `${h} - ${x2} - ${this.reduceNumber(h + x2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(i + h), this.reduceNumber(x2 + x2), this.reduceNumber(i + h + x2 * 2)), 'Мужской род - 5 колено Целостная', `${this.reduceNumber(i + h)} - ${this.reduceNumber(x2 + x2)} - ${this.reduceNumber(i + h + x2 * 2)}`);
      
      // 6 колено
      addProgram(this.createProgramKey(m, y2, this.reduceNumber(m + y2)), 'Мужской род - 6 колено Небо', `${m} - ${y2} - ${this.reduceNumber(m + y2)}`);
      addProgram(this.createProgramKey(l, y2, this.reduceNumber(l + y2)), 'Мужской род - 6 колено Земля', `${l} - ${y2} - ${this.reduceNumber(l + y2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(m + l), this.reduceNumber(y2 + y2), this.reduceNumber(m + l + y2 * 2)), 'Мужской род - 6 колено Целостная', `${this.reduceNumber(m + l)} - ${this.reduceNumber(y2 + y2)} - ${this.reduceNumber(m + l + y2 * 2)}`);
      
      // 7 колено
      addProgram(this.createProgramKey(d, w, this.reduceNumber(d + w)), 'Мужской род - 7 колено Небо', `${d} - ${w} - ${this.reduceNumber(d + w)}`);
      addProgram(this.createProgramKey(c, w, this.reduceNumber(c + w)), 'Мужской род - 7 колено Земля', `${c} - ${w} - ${this.reduceNumber(c + w)}`);
      addProgram(this.createProgramKey(this.reduceNumber(d + c), this.reduceNumber(w + w), this.reduceNumber(d + c + w * 2)), 'Мужской род - 7 колено Целостная', `${this.reduceNumber(d + c)} - ${this.reduceNumber(w + w)} - ${this.reduceNumber(d + c + w * 2)}`);
    }

    // Расчет программ по Женскому роду
    if (this.state.formData.gender === 'female') {
      // 1 колено
      addProgram(this.createProgramKey(b, n, this.reduceNumber(b + n)), 'Женский род - 1 колено Небо', `${b} - ${n} - ${this.reduceNumber(b + n)}`);
      addProgram(this.createProgramKey(a, q, this.reduceNumber(a + q)), 'Женский род - 1 колено Земля', `${a} - ${q} - ${this.reduceNumber(a + q)}`);
      addProgram(this.createProgramKey(this.reduceNumber(b + a), this.reduceNumber(n + q), this.reduceNumber(b + n + a + q)), 'Женский род - 1 колено Целостная', `${this.reduceNumber(b + a)} - ${this.reduceNumber(n + q)} - ${this.reduceNumber(b + n + a + q)}`);
      
      // 2 колено
      addProgram(this.createProgramKey(k, p2, this.reduceNumber(k + p2)), 'Женский род - 2 колено Небо', `${k} - ${p2} - ${this.reduceNumber(k + p2)}`);
      addProgram(this.createProgramKey(j, s2, this.reduceNumber(j + s2)), 'Женский род - 2 колено Земля', `${j} - ${s2} - ${this.reduceNumber(j + s2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(k + j), this.reduceNumber(p2 + s2), this.reduceNumber(k + j + p2 + s2)), 'Женский род - 2 колено Целостная', `${this.reduceNumber(k + j)} - ${this.reduceNumber(p2 + s2)} - ${this.reduceNumber(k + j + p2 + s2)}`);
      
      // 3 колено
      addProgram(this.createProgramKey(g, o2, this.reduceNumber(g + o2)), 'Женский род - 3 колено Небо', `${g} - ${o2} - ${this.reduceNumber(g + o2)}`);
      addProgram(this.createProgramKey(f, r2, this.reduceNumber(f + r2)), 'Женский род - 3 колено Земля', `${f} - ${r2} - ${this.reduceNumber(f + r2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(g + f), this.reduceNumber(o2 + r2), this.reduceNumber(g + f + o2 + r2)), 'Женский род - 3 колено Целостная', `${this.reduceNumber(g + f)} - ${this.reduceNumber(o2 + r2)} - ${this.reduceNumber(g + f + o2 + r2)}`);
      
      // 4 колено
      addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Женский род - 4 колено Небо', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
      addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Женский род - 4 колено Земля', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
      addProgram(this.createProgramKey(this.reduceNumber(e + z), this.reduceNumber(z + z), this.reduceNumber(e + z + e + z)), 'Женский род - 4 колено Целостная', `${this.reduceNumber(e + z)} - ${this.reduceNumber(z + z)} - ${this.reduceNumber(e + z + e + z)}`);
      
      // 5 колено
      addProgram(this.createProgramKey(d, q, this.reduceNumber(d + q)), 'Женский род - 5 колено Небо', `${d} - ${q} - ${this.reduceNumber(d + q)}`);
      addProgram(this.createProgramKey(h, o2, this.reduceNumber(h + o2)), 'Женский род - 5 колено Земля', `${h} - ${o2} - ${this.reduceNumber(h + o2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(d + h), this.reduceNumber(q + o2), this.reduceNumber(d + h + q + o2)), 'Женский род - 5 колено Целостная', `${this.reduceNumber(d + h)} - ${this.reduceNumber(q + o2)} - ${this.reduceNumber(d + h + q + o2)}`);
      
      // 6 колено
      addProgram(this.createProgramKey(m, s2, this.reduceNumber(m + s2)), 'Женский род - 6 колено Небо', `${m} - ${s2} - ${this.reduceNumber(m + s2)}`);
      addProgram(this.createProgramKey(l, p2, this.reduceNumber(l + p2)), 'Женский род - 6 колено Земля', `${l} - ${p2} - ${this.reduceNumber(l + p2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(m + l), this.reduceNumber(s2 + p2), this.reduceNumber(m + l + s2 + p2)), 'Женский род - 6 колено Целостная', `${this.reduceNumber(m + l)} - ${this.reduceNumber(s2 + p2)} - ${this.reduceNumber(m + l + s2 + p2)}`);
      
      // 7 колено
      addProgram(this.createProgramKey(i, r2, this.reduceNumber(i + r2)), 'Женский род - 7 колено Небо', `${i} - ${r2} - ${this.reduceNumber(i + r2)}`);
      addProgram(this.createProgramKey(c, n, this.reduceNumber(c + n)), 'Женский род - 7 колено Земля', `${c} - ${n} - ${this.reduceNumber(c + n)}`);
      addProgram(this.createProgramKey(this.reduceNumber(i + c), this.reduceNumber(r2 + n), this.reduceNumber(i + c + r2 + n)), 'Женский род - 7 колено Целостная', `${this.reduceNumber(i + c)} - ${this.reduceNumber(r2 + n)} - ${this.reduceNumber(i + c + r2 + n)}`);
    }

    // Прочие источники программ
    // Личный квадрат
    addProgram(this.createProgramKey(a, j, f), 'Личный квадрат', `${a} - ${j} - ${f}`);
    addProgram(this.createProgramKey(f, j, a), 'Личный квадрат', `${f} - ${j} - ${a}`);
    addProgram(this.createProgramKey(b, k, g), 'Личный квадрат', `${b} - ${k} - ${g}`);
    addProgram(this.createProgramKey(g, k, b), 'Личный квадрат', `${g} - ${k} - ${b}`);
    addProgram(this.createProgramKey(c, l, h), 'Личный квадрат', `${c} - ${l} - ${h}`);
    addProgram(this.createProgramKey(h, l, c), 'Личный квадрат', `${h} - ${l} - ${c}`);
    addProgram(this.createProgramKey(d, m, i), 'Личный квадрат', `${d} - ${m} - ${i}`);
    addProgram(this.createProgramKey(i, m, d), 'Личный квадрат', `${i} - ${m} - ${d}`);

    // Родовой квадрат
    addProgram(this.createProgramKey(t, v, u), 'Родовой квадрат', `${t} - ${v} - ${u}`);
    addProgram(this.createProgramKey(u, v, t), 'Родовой квадрат', `${u} - ${v} - ${t}`);
    addProgram(this.createProgramKey(n, p, o), 'Родовой квадрат', `${n} - ${p} - ${o}`);
    addProgram(this.createProgramKey(o, p, n), 'Родовой квадрат', `${o} - ${p} - ${n}`);
    addProgram(this.createProgramKey(w, y, x), 'Родовой квадрат', `${w} - ${y} - ${x}`);
    addProgram(this.createProgramKey(x, y, w), 'Родовой квадрат', `${x} - ${y} - ${w}`);
    addProgram(this.createProgramKey(q, s, r), 'Родовой квадрат', `${q} - ${s} - ${r}`);
    addProgram(this.createProgramKey(r, s, q), 'Родовой квадрат', `${r} - ${s} - ${q}`);

    // Таблица чакр
    addProgram(this.createProgramKey(b, a, this.reduceNumber(b + a)), 'Таблица чакр', `${b} - ${a} - ${this.reduceNumber(b + a)}`);
    addProgram(this.createProgramKey(a, b, this.reduceNumber(a + b)), 'Таблица чакр', `${a} - ${b} - ${this.reduceNumber(a + b)}`);
    addProgram(this.createProgramKey(k, j, this.reduceNumber(k + j)), 'Таблица чакр', `${k} - ${j} - ${this.reduceNumber(k + j)}`);
    addProgram(this.createProgramKey(j, k, this.reduceNumber(j + k)), 'Таблица чакр', `${j} - ${k} - ${this.reduceNumber(j + k)}`);
    addProgram(this.createProgramKey(g, f, this.reduceNumber(g + f)), 'Таблица чакр', `${g} - ${f} - ${this.reduceNumber(g + f)}`);
    addProgram(this.createProgramKey(f, g, this.reduceNumber(f + g)), 'Таблица чакр', `${f} - ${g} - ${this.reduceNumber(f + g)}`);
    addProgram(this.createProgramKey(n, q, this.reduceNumber(n + q)), 'Таблица чакр', `${n} - ${q} - ${this.reduceNumber(n + q)}`);
    addProgram(this.createProgramKey(q, n, this.reduceNumber(q + n)), 'Таблица чакр', `${q} - ${n} - ${this.reduceNumber(q + n)}`);
    addProgram(this.createProgramKey(t, w, this.reduceNumber(t + w)), 'Таблица чакр', `${t} - ${w} - ${this.reduceNumber(t + w)}`);
    addProgram(this.createProgramKey(w, t, this.reduceNumber(w + t)), 'Таблица чакр', `${w} - ${t} - ${this.reduceNumber(w + t)}`);
    addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Таблица чакр', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
    addProgram(this.createProgramKey(i, h, this.reduceNumber(i + h)), 'Таблица чакр', `${i} - ${h} - ${this.reduceNumber(i + h)}`);
    addProgram(this.createProgramKey(h, i, this.reduceNumber(h + i)), 'Таблица чакр', `${h} - ${i} - ${this.reduceNumber(h + i)}`);
    addProgram(this.createProgramKey(m, l, this.reduceNumber(m + l)), 'Таблица чакр', `${m} - ${l} - ${this.reduceNumber(m + l)}`);
    addProgram(this.createProgramKey(l, m, this.reduceNumber(l + m)), 'Таблица чакр', `${l} - ${m} - ${this.reduceNumber(l + m)}`);
    addProgram(this.createProgramKey(d, c, this.reduceNumber(d + c)), 'Таблица чакр', `${d} - ${c} - ${this.reduceNumber(d + c)}`);
    addProgram(this.createProgramKey(c, d, this.reduceNumber(c + d)), 'Таблица чакр', `${c} - ${d} - ${this.reduceNumber(c + d)}`);

    // Двухзначные программы
    addProgram(this.createProgramKey(7, 19), 'Достаток', `${7} - ${19}`);
    addProgram(this.createProgramKey(5, 6), 'Красота и уют в доме', `${5} - ${6}`);
    addProgram(this.createProgramKey(3, 9), 'Преодоление', `${3} - ${9}`);

    return foundPrograms;
  }

  // Функция расчета благой кармы и точек роста
  calculateKarma(values, originalDay, originalYear) {
    const { a, b, c } = values;
    
    // Определяем a2 и c2 по специальным правилам
    const a2 = (originalDay >= 23 && originalDay <= 31) ? a - 22 : null;
    const originalYearSum = originalYear.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const c2 = originalYearSum > 22 ? c - 22 : null;
    
    // Благая карма
    const goodKarma = {
      karma1: {
        col1: '36 - ' + (a + b + c).toString(),
        col2: this.reduceNumber(a + b),
        col3: this.reduceNumber(a + c),
        col4: this.reduceNumber(a * 2 + b + c),
        col5: this.reduceNumber(b + c)
      },
      karma2: a2 ? {
        col1: '46 - ' + (a2 + b + c).toString(),
        col2: this.reduceNumber(a2 + b),
        col3: this.reduceNumber(a2 + c),
        col4: this.reduceNumber(a2 * 2 + b + c),
        col5: this.reduceNumber(b + c)
      } : null,
      karma3: c2 ? {
        col1: '56 - ' + (a + b + c2).toString(),
        col2: this.reduceNumber(a + b),
        col3: this.reduceNumber(a + c2),
        col4: this.reduceNumber(a * 2 + b + c2),
        col5: this.reduceNumber(b + c2)
      } : null,
      karma4: (a2 && c2) ? {
        col1: '66 - ' + (a2 + b + c2).toString(),
        col2: this.reduceNumber(a2 + b),
        col3: this.reduceNumber(a2 + c2),
        col4: this.reduceNumber(a2 * 2 + b + c2),
        col5: this.reduceNumber(b + c2)
      } : null
    };
    
    // Точки роста
    const growthPoints = {
      point1: {
        col2: a - b,
        col3: a - c,
        col4: (a - b) - (a - c),
        col5: b - c
      },
      point2: a2 ? {
        col2: a2 - b,
        col3: a2 - c,
        col4: (a2 - b) - (a2 - c),
        col5: b - c
      } : null,
      point3: c2 ? {
        col2: a - b,
        col3: a - c2,
        col4: (a - b) - (a - c2),
        col5: b - c2
      } : null,
      point4: (a2 && c2) ? {
        col2: a2 - b,
        col3: a2 - c2,
        col4: (a2 - b) - (a2 - c2),
        col5: b - c2
      } : null
    };

    return {
      goodKarma,
      growthPoints,
      specialValues: { a2, c2 },
      originalDay,
      originalYearSum
    };
  }

  calculateMatrix() {
    if (!this.validateForm()) {
      return;
    }

    const { day, month, year, name, surname, patronymic, gender, fatherSurname, motherMaidenName } = this.state.formData;
    
    // Дополнительная проверка корректности даты
    if (!this.validateDate(parseInt(day), parseInt(month), parseInt(year))) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          day: 'Некорректная дата'
        }
      }));
      return;
    }

    // Сохраняем оригинальные значения для расчета кармы
    const originalDay = parseInt(day);
    const originalYear = parseInt(year);
    
    // Основные переменные
    const a = this.reduceNumber(parseInt(day));
    const b = this.reduceNumber(parseInt(month));
    const c = this.reduceNumber(year.split('').reduce((sum, digit) => sum + parseInt(digit), 0));
    
    const d = this.reduceNumber(a + b + c);
    const e = this.reduceNumber(a + b + c + d);
    const f = this.reduceNumber(a + e);
    const g = this.reduceNumber(b + e);
    const h = this.reduceNumber(c + e);
    const i = this.reduceNumber(d + e);
    const j = this.reduceNumber(a + f);
    const k = this.reduceNumber(b + g);
    const l = this.reduceNumber(c + h);
    const m = this.reduceNumber(d + i);
    
    const n = this.calculateLetterValue(name);
    const o = this.reduceNumber(n + e);
    const p = this.reduceNumber(n + o);
    
    const q = this.calculateLetterValue(motherMaidenName);
    const r = this.reduceNumber(q + e);
    const s = this.reduceNumber(q + r);
    
    const t = this.calculateLetterValue(surname);
    const u = this.reduceNumber(t + e);
    const v = this.reduceNumber(t + u);
    
    const w = gender === 'male' 
      ? this.calculateLetterValue(fatherSurname)
      : this.calculateLetterValue(patronymic);
    
    const x = this.reduceNumber(w + e);
    const y = this.reduceNumber(w + x);
    const z = this.reduceNumber(t + n + w + q);
    
    const u2 = this.reduceNumber(t + z);
    const v2 = this.reduceNumber(t + u2);
    const x2 = this.reduceNumber(w + z);
    const y2 = this.reduceNumber(w + x2);
    const o2 = this.reduceNumber(n + z);
    const p2 = this.reduceNumber(n + o2);
    const r2 = this.reduceNumber(q + z);
    const s2 = this.reduceNumber(q + r2);

    const a2 = (originalDay >= 23 && originalDay <= 31) ? a - 22 : null;
    const originalYearSum = originalYear.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const c2 = originalYearSum > 22 ? c - 22 : null;

    const calculatedValues = {
      a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
      u2, v2, x2, y2, o2, p2, r2, s2, a2, c2
    };

    // Расчет чакр
    const chakraData = [
      { name: '9. Родник', energy: b, physics: a, emotions: this.reduceNumber(b + a) },
      { name: '8. Чело', energy: k, physics: j, emotions: this.reduceNumber(k + j) },
      { name: '7. Устье', energy: g, physics: f, emotions: this.reduceNumber(g + f) },
      { name: '6. Леля', energy: n, physics: q, emotions: this.reduceNumber(n + q) },
      { name: '5. Лада', energy: t, physics: w, emotions: this.reduceNumber(t + w) },
      { name: '4. Перси', energy: e, physics: z, emotions: this.reduceNumber(e + z) },
      { name: '3. Живот', energy: i, physics: h, emotions: this.reduceNumber(i + h) },
      { name: '2. Зарод', energy: m, physics: l, emotions: this.reduceNumber(m + l) },
      { name: '1. Исток', energy: d, physics: c, emotions: this.reduceNumber(d + c) }
    ];

    const chakras = {
      chakras: chakraData,
      totals: {
        energy: this.reduceNumber(chakraData.reduce((sum, chakra) => sum + chakra.energy, 0)),
        physics: this.reduceNumber(chakraData.reduce((sum, chakra) => sum + chakra.physics, 0)),
        emotions: this.reduceNumber(chakraData.reduce((sum, chakra) => sum + chakra.emotions, 0))
      }
    };

    // Расчет предназначений
    const purposes = {
      personal: {
        sky: b,
        earth: a,
        purpose: this.reduceNumber(b + a)
      },
      social: {
        male: t,
        female: n,
        purpose: this.reduceNumber(t + n)
      },
      spiritual: {
        purpose: this.reduceNumber(b + d + a + c + n + q + t + w),
        formula: `${b} + ${d} + ${a} + ${c} + ${n} + ${q} + ${t} + ${w}`
      },
      planetary: {
        purpose: this.reduceNumber(b + d + a + c + (n + q + t + w) * 2),
        formula: `${b} + ${d} + ${a} + ${c} + (${n} + ${q} + ${t} + ${w}) * 2`
      }
    };

    // Расчет программ
    const foundPrograms = this.calculatePrograms(calculatedValues);
    
    // Расчет благой кармы и точек роста
    const karmaResults = this.calculateKarma(calculatedValues, originalDay, originalYear);

    this.setState({
      results: calculatedValues,
      programs: foundPrograms.sort((a, b) => a.id - b.id),
      chakras: chakras,
      purposes: purposes,
      karma: karmaResults,
      errors: {}
    });
  }

  handleInputChange(field, value) {
    // Ограничения на ввод
    if (['day', 'month', 'year'].includes(field)) {
      if (value && !/^\d+$/.test(value)) return;
    } else if (['surname', 'name', 'patronymic', 'fatherSurname', 'motherMaidenName'].includes(field)) {
      if (value && /\d/.test(value)) return;
    }

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [field]: value
      },
      errors: {
        ...prevState.errors,
        [field]: null
      }
    }));
  }

  renderError(field) {
    if (this.state.errors[field]) {
      return e('div', {
        style: {
          color: '#e74c3c',
          fontSize: '0.85rem',
          marginTop: '4px',
          fontWeight: '500'
        }
      }, this.state.errors[field]);
    }
    return null;
  }

  render() {
    const { formData, results, programs, chakras, purposes, karma, errors } = this.state;
    const hasErrors = Object.values(errors).some(error => error !== null);
    const isFormValid = Object.keys(formData).every(field => {
      if (['fatherSurname', 'motherMaidenName'].includes(field)) return true;
      return formData[field] && formData[field].trim() !== '';
    }) && !hasErrors;

    return e('div', { className: 'matrix-calculator' },
      e('div', { className: 'calculator-container' },
        e('h1', null, 'Калькулятор Матрицы Судьбы'),
        
        // Форма
        e('div', { className: 'form-section' },
          // Фамилия
          e('div', { className: 'input-group' },
            e('label', null, 'Фамилия:'),
            e('input', {
              type: 'text',
              value: formData.surname,
              onChange: (event) => this.handleInputChange('surname', event.target.value),
              placeholder: 'Введите фамилию',
              style: { borderColor: errors.surname ? '#e74c3c' : '#e1e8ed' }
            }),
            this.renderError('surname')
          ),

          // Имя
          e('div', { className: 'input-group' },
            e('label', null, 'Имя:'),
            e('input', {
              type: 'text',
              value: formData.name,
              onChange: (event) => this.handleInputChange('name', event.target.value),
              placeholder: 'Введите имя',
              style: { borderColor: errors.name ? '#e74c3c' : '#e1e8ed' }
            }),
            this.renderError('name')
          ),

          // Отчество
          e('div', { className: 'input-group' },
            e('label', null, 'Отчество:'),
            e('input', {
              type: 'text',
              value: formData.patronymic,
              onChange: (event) => this.handleInputChange('patronymic', event.target.value),
              placeholder: 'Введите отчество',
              style: { borderColor: errors.patronymic ? '#e74c3c' : '#e1e8ed' }
            }),
            this.renderError('patronymic')
          ),

          // Дата рождения
          e('div', { className: 'date-group' },
            e('div', { className: 'input-group' },
              e('label', null, 'День рождения:'),
              e('input', {
                type: 'text',
                maxLength: 2,
                value: formData.day,
                onChange: (event) => this.handleInputChange('day', event.target.value),
                placeholder: 'ДД',
                style: { borderColor: errors.day ? '#e74c3c' : '#e1e8ed' }
              }),
              this.renderError('day')
            ),
            e('div', { className: 'input-group' },
              e('label', null, 'Месяц рождения:'),
              e('input', {
                type: 'text',
                maxLength: 2,
                value: formData.month,
                onChange: (event) => this.handleInputChange('month', event.target.value),
                placeholder: 'ММ',
                style: { borderColor: errors.month ? '#e74c3c' : '#e1e8ed' }
              }),
              this.renderError('month')
            ),
            e('div', { className: 'input-group' },
              e('label', null, 'Год рождения:'),
              e('input', {
                type: 'text',
                maxLength: 4,
                value: formData.year,
                onChange: (event) => this.handleInputChange('year', event.target.value),
                placeholder: 'ГГГГ',
                style: { borderColor: errors.year ? '#e74c3c' : '#e1e8ed' }
              }),
              this.renderError('year')
            )
          ),

          // Пол
          e('div', { className: 'input-group' },
            e('label', null, 'Пол:'),
            e('select', {
              value: formData.gender,
              onChange: (event) => this.handleInputChange('gender', event.target.value),
              style: { borderColor: errors.gender ? '#e74c3c' : '#e1e8ed' }
            },
              e('option', { value: '' }, 'Выберите пол'),
              e('option', { value: 'male' }, 'Мужской'),
              e('option', { value: 'female' }, 'Женский')
            ),
            this.renderError('gender')
          ),

          // Фамилия отца
          e('div', { className: 'input-group' },
            e('label', null, 'Фамилия отца:'),
            e('input', {
              type: 'text',
              value: formData.fatherSurname,
              onChange: (event) => this.handleInputChange('fatherSurname', event.target.value),
              placeholder: 'Введите фамилию отца',
              style: { borderColor: errors.fatherSurname ? '#e74c3c' : '#e1e8ed' }
            }),
            this.renderError('fatherSurname')
          ),

          // Фамилия матери
          e('div', { className: 'input-group' },
            e('label', null, 'Фамилия матери (девичья):'),
            e('input', {
              type: 'text',
              value: formData.motherMaidenName,
              onChange: (event) => this.handleInputChange('motherMaidenName', event.target.value),
              placeholder: 'Введите девичью фамилию матери',
              style: { borderColor: errors.motherMaidenName ? '#e74c3c' : '#e1e8ed' }
            }),
            this.renderError('motherMaidenName')
          ),

          // Кнопка расчета
          e('button', {
            className: 'calculate-btn',
            onClick: this.calculateMatrix,
            disabled: !isFormValid,
            style: {
              opacity: !isFormValid ? 0.6 : 1,
              cursor: !isFormValid ? 'not-allowed' : 'pointer'
            }
          }, 'Посчитать'),

          // Блок ошибок
          hasErrors && e('div', {
            style: {
              backgroundColor: '#fdf2f2',
              border: '1px solid #f5c6cb',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '15px',
              color: '#721c24'
            }
          },
            e('strong', null, 'Пожалуйста, исправьте ошибки в форме:'),
            e('ul', { style: { margin: '8px 0 0 20px', padding: 0 } },
              Object.entries(errors).map(([field, error], index) => 
                error && e('li', { key: index }, error)
              )
            )
          )
        ),

        // Результаты
        results && e('div', { className: 'results-section' },
          e('h2', null, 'Результаты расчета:'),
          e('div', { className: 'results-grid' },
            Object.entries(results).map(([key, value], index) =>
              e('div', { className: 'result-item', key: index }, `${key} = ${value}`)
            )
          )
        ),

        // Найденные родовые программы
        programs.length > 0 && e('div', { className: 'results-section' },
          e('h2', null, 'Найденные родовые программы:'),
          e('div', { style: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' } },
            programs.map((program, index) =>
              e('div', {
                key: index,
                style: {
                  background: 'linear-gradient(135deg, #fff3cd, #ffeaa7)',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '1px solid #f39c12',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
              },
                e('div', {
                  style: {
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: '#d35400',
                    marginBottom: '5px'
                  }
                }, `№${program.id}. ${program.name}`),
                e('div', {
                  style: {
                    fontSize: '0.9rem',
                    color: '#7f8c8d',
                    marginBottom: '3px'
                  }
                }, `Источник: ${program.source}`),
                e('div', {
                  style: {
                    fontSize: '0.9rem',
                    color: '#2c3e50'
                  }
                }, `Код: ${program.calculation}`)
              )
            )
          )
        ),

        // Таблица чакр
        chakras && e('div', { className: 'results-section' },
          e('h2', null, 'Таблица чакр:'),
          e('div', {
            style: {
              marginTop: '20px',
              overflowX: 'auto',
              border: '2px solid rgb(127,83,142)',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }
          },
            e('table', {
              style: {
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '1rem',
                backgroundColor: 'white'
              }
            },
              e('thead', null,
                e('tr', { style: { backgroundColor: 'rgb(127,83,142)', color: 'white' } },
                  e('th', { style: { padding: '15px', textAlign: 'center', fontWeight: 'bold' } }, 'Энергия'),
                  e('th', { style: { padding: '15px', textAlign: 'center', fontWeight: 'bold' } }, 'Физика'),
                  e('th', { style: { padding: '15px', textAlign: 'center', fontWeight: 'bold' } }, 'Эмоции'),
                  e('th', { style: { padding: '15px', textAlign: 'left', fontWeight: 'bold' } }, 'Названия чакр')
                )
              ),
              e('tbody', null,
                chakras.chakras.map((chakra, index) => {
                  const colors = ['#B76FAE', '#7396E6', '#A8C4F1', '#97D0C8', '#D1F978', '#ACF79A', '#F0FC79', '#EAD666', '#C8644A'];
                  return e('tr', {
                    key: index,
                    style: { backgroundColor: colors[index], color: '#2c3e50' }
                  },
                    e('td', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' } }, chakra.energy),
                    e('td', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' } }, chakra.physics),
                    e('td', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' } }, chakra.emotions),
                    e('td', { style: { padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '1.1rem' } }, chakra.name)
                  );
                }),
                e('tr', { style: { backgroundColor: '#2c3e50', color: 'white', borderTop: '3px solid rgb(127,83,142)' } },
                  e('td', { style: { padding: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' } }, chakras.totals.energy),
                  e('td', { style: { padding: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' } }, chakras.totals.physics),
                  e('td', { style: { padding: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' } }, chakras.totals.emotions),
                  e('td', { style: { padding: '15px', textAlign: 'left', fontWeight: 'bold', fontSize: '1.2rem' } }, 'ИТОГО')
                )
              )
            )
          )
        ),

        // Предназначения
        purposes && e('div', { className: 'results-section' },
          e('h2', null, 'Расчет предназначений:'),
          e('div', {
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }
          },
            // Личное предназначение
            e('div', {
              style: {
                background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #4caf50',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }
            },
              e('h3', { style: { color: '#2e7d32', marginBottom: '15px', fontSize: '1.3rem' } }, 'Личное предназначение'),
              e('p', { style: { color: '#1b5e20', marginBottom: '15px', fontStyle: 'italic' } }, 'Задачи перед самим собой'),
              e('div', {
                style: {
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
                }
              }, purposes.personal.purpose),
              e('div', { style: { fontSize: '1rem', color: '#1b5e20', fontWeight: 'bold' } },
                `${purposes.personal.sky} + ${purposes.personal.earth} = ${purposes.personal.purpose}`
              )
            ),

            // Социальное предназначение
            e('div', {
              style: {
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #2196f3',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }
            },
              e('h3', { style: { color: '#1565c0', marginBottom: '15px', fontSize: '1.3rem' } }, 'Социальное предназначение'),
              e('p', { style: { color: '#0d47a1', marginBottom: '15px', fontStyle: 'italic' } }, 'Задачи перед родом и другими людьми'),
              e('div', {
                style: {
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
                }
              }, purposes.social.purpose),
              e('div', { style: { fontSize: '1rem', color: '#0d47a1', fontWeight: 'bold' } },
                `${purposes.social.male} + ${purposes.social.female} = ${purposes.social.purpose}`
              )
            ),

            // Духовное предназначение
            e('div', {
              style: {
                background: 'linear-gradient(135deg, #fce4ec, #f8bbd9)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #e91e63',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }
            },
              e('h3', { style: { color: '#ad1457', marginBottom: '15px', fontSize: '1.3rem' } }, 'Духовное предназначение'),
              e('p', { style: { color: '#880e4f', marginBottom: '15px', fontStyle: 'italic' } }, 'Задача Души'),
              e('div', {
                style: {
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
                }
              }, purposes.spiritual.purpose),
              e('div', {
                style: {
                  fontSize: '0.9rem',
                  color: '#880e4f',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid #e91e63'
                }
              }, `${purposes.spiritual.formula} = ${purposes.spiritual.purpose}`)
            ),

            // Планетарное предназначение
            e('div', {
              style: {
                background: 'linear-gradient(135deg, #fff3e0, #ffcc80)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #ff9800',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }
            },
              e('h3', { style: { color: '#e65100', marginBottom: '15px', fontSize: '1.3rem' } }, 'Планетарное предназначение'),
              e('p', { style: { color: '#bf360c', marginBottom: '15px', fontStyle: 'italic' } }, 'Задача перед миром'),
              e('div', {
                style: {
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
                }
              }, purposes.planetary.purpose),
              e('div', {
                style: {
                  fontSize: '0.8rem',
                  color: '#bf360c',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid #ff9800'
                }
              }, `${purposes.planetary.formula} = ${purposes.planetary.purpose}`)
            )
          )
        ),

        // Расчет благой кармы и точек роста
        karma && e('div', { className: 'results-section' },
          e('h2', null, 'Расчет благой кармы и точек роста:'),
          
          // Информация о специальных значениях
          (karma.specialValues.a2 || karma.specialValues.c2) && e('div', {
            style: {
              backgroundColor: '#f0f8ff',
              border: '2px solid #4682b4',
              borderRadius: '10px',
              padding: '15px',
              marginTop: '15px',
              marginBottom: '20px'
            }
          },
            e('h4', { style: { color: '#2c3e50', marginBottom: '10px' } }, 'Специальные условия:'),
            karma.specialValues.a2 && e('p', {
              style: { color: 'rgb(127,83,142)', margin: '5px 0' }
            }, `• a2 = ${karma.specialValues.a2} (день рождения ${karma.originalDay} ≥ 23)`),
            karma.specialValues.c2 && e('p', {
              style: { color: 'rgb(127,83,142)', margin: '5px 0' }
            }, `• c2 = ${karma.specialValues.c2} (сумма цифр года ${karma.originalYearSum} больше 22)`)
          ),

          e('div', {
            style: {
              overflowX: 'auto',
              border: '2px solid rgb(127,83,142)',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginTop: '20px'
            }
          },
            e('table', {
              style: {
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.9rem',
                backgroundColor: 'white',
                minWidth: '700px'
              }
            },
              e('thead', null,
                e('tr', { style: { backgroundColor: 'rgb(127,83,142)', color: 'white' } },
                  e('th', { style: { padding: '12px', textAlign: 'left', fontWeight: 'bold', minWidth: '150px' } }, 'Тип'),
                  e('th', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '100px' } }, results ? 36 - (results.a + results.b + results.c) : ''),
                  e('th', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '80px' } }, results ? 46 - (results.a + results.b + results.c) : ''),
                  e('th', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '80px' } }, results ? 56 - (results.a + results.b + results.c) : ''),
                  e('th', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '120px' } }, results ? (56 - (results.a + results.b + results.c)) + '+' : '')
                )
              ),
              e('tbody', null,
                // Благая карма 1
                e('tr', { style: { backgroundColor: '#e8f5e8' } },
                  e('td', { style: { padding: '10px', fontWeight: 'bold', color: '#2e7d32' } }, 'Благая карма 1'),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma1.col2),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma1.col3),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma1.col4),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma1.col5)
                ),

                // Благая карма 2
                karma.goodKarma.karma2 && e('tr', { style: { backgroundColor: '#e3f2fd' } },
                  e('td', { style: { padding: '10px', fontWeight: 'bold', color: '#1565c0' } }, 'Благая карма 2'),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma2.col2),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma2.col3),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma2.col4),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma2.col5)
                ),

                // Благая карма 3
                karma.goodKarma.karma3 && e('tr', { style: { backgroundColor: '#fce4ec' } },
                  e('td', { style: { padding: '10px', fontWeight: 'bold', color: '#ad1457' } }, 'Благая карма 3'),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma3.col2),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma3.col3),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma3.col4),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma3.col5)
                ),

                // Благая карма 4
                karma.goodKarma.karma4 && e('tr', { style: { backgroundColor: '#fff3e0' } },
                  e('td', { style: { padding: '10px', fontWeight: 'bold', color: '#e65100' } }, 'Благая карма 4'),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma4.col2),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma4.col3),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma4.col4),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.goodKarma.karma4.col5)
                ),

                // Разделитель
                e('tr', { style: { backgroundColor: 'rgb(127,83,142)' } },
                  e('td', { colSpan: 6, style: { padding: '2px' } })
                ),

                // Точка роста 1
                e('tr', { style: { backgroundColor: '#f5f5f5' } },
                  e('td', { style: { padding: '10px', fontWeight: 'bold', color: '#7f8c8d' } }, 'Точка роста 1'),
                  e('td', { style: { padding: '10px', textAlign: 'center', color: '#7f8c8d' } }, karma.growthPoints.point1.col2),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point1.col3),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point1.col4),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point1.col5)
                ),

                // Точка роста 2
                karma.growthPoints.point2 && e('tr', { style: { backgroundColor: '#f0f8ff' } },
                  e('td', { style: { padding: '10px', fontWeight: 'bold', color: '#7f8c8d' } }, 'Точка роста 2'),
                  e('td', { style: { padding: '10px', textAlign: 'center', color: '#7f8c8d' } }, karma.growthPoints.point2.col2),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point2.col3),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point2.col4),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point2.col5)
                ),

                // Точка роста 3
                karma.growthPoints.point3 && e('tr', { style: { backgroundColor: '#fef9e7' } },
                  e('td', { style: { padding: '10px', fontWeight: 'bold', color: '#7f8c8d' } }, 'Точка роста 3'),
                  e('td', { style: { padding: '10px', textAlign: 'center', color: '#7f8c8d' } }, karma.growthPoints.point3.col2),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point3.col3),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point3.col4),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point3.col5)
                ),

                // Точка роста 4
                karma.growthPoints.point4 && e('tr', { style: { backgroundColor: '#f3e5f5' } },
                  e('td', { style: { padding: '10px', fontWeight: 'bold', color: '#7f8c8d' } }, 'Точка роста 4'),
                  e('td', { style: { padding: '10px', textAlign: 'center', color: '#7f8c8d' } }, karma.growthPoints.point4.col2),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point4.col3),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point4.col4),
                  e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, karma.growthPoints.point4.col5)
                )
              )
            )
          )
        )
      )
    );
  }
}

// Найти все DOM контейнеры и отрендерить калькуляторы в них
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('#matrix-calculator-container')
    .forEach(domContainer => {
      const root = ReactDOM.createRoot(domContainer);
      root.render(e(MatrixCalculator));
    });
}); 