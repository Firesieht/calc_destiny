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
const UNREGISTERED_PROGRAMS = {
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
  '8,9,19': { id: 56, name: 'Безнадега' },
  '6,7,13': { id: 61, name: 'Физическое насилие и эмоциональное унижение' },
  '5,12,17': { id: 63, name: 'Публичный позор' },
  '5,13,18': { id: 64, name: 'Сакральная жертва' },
  '5,10,22': { id: 71, name: 'Инквизиция' },
  '7,11,18': { id: 75, name: 'Боевой маг' },
};

const ANCESTRAL_PROGRAMS = UNREGISTERED_PROGRAMS


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
    this.loadDataFromURL = this.loadDataFromURL.bind(this);
    this.saveDataToURL = this.saveDataToURL.bind(this);
    this.saveToPDF = this.saveToPDF.bind(this);
    this.saveCalculation = this.saveCalculation.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  componentDidMount() {
    this.loadDataFromURL();
    this.userrouting()
  }

  userrouting() {
    if (this.getUserLogin() && window.location.pathname.includes('unreg')) {
      window.location.replace('/calc' + window.location.search)
    } else if (!this.getUserLogin() && !window.location.pathname.includes('unreg')){
      window.location.replace('/calc_unreg' + window.location.search)
    }
  }
  // Функция загрузки данных из URL
  loadDataFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    
    if (encodedData) {
      console.log('Найдены данные в URL:', encodedData);
      try {
        const decodedData = decodeURIComponent(encodedData);
        const formData = JSON.parse(decodedData);
        
        // Проверяем, что загруженные данные содержат все необходимые поля
        const validKeys = ['surname', 'name', 'patronymic', 'day', 'month', 'year', 'gender', 'fatherSurname', 'motherMaidenName'];
        const isValidData = validKeys.every(key => formData.hasOwnProperty(key));
        
        if (isValidData) {
          console.log('FORMDATA из URL:', formData);
          this.setState({ 
            formData: {
              ...this.state.formData,
              ...formData
            }
          }, () => {
            console.log('ЧЕК - state обновлен:', this.state.formData);
            // Автоматически выполняем расчет, если данные валидны
            setTimeout(() => {
              if (this.validateForm()) {
                this.calculateMatrix();
              }
            }, 100);
          });
        } else {
          console.log('Данные из URL невалидны:', formData);
        }
      } catch (error) {
        console.warn('Ошибка при загрузке данных из URL:', error);
      }
    } else {
      console.log('Нет данных в URL');
    }
  }

  // Функция сохранения данных в URL
  saveDataToURL() {
    try {
      const encodedData = encodeURIComponent(JSON.stringify(this.state.formData));
      const newURL = new URL(window.location);
      newURL.searchParams.set('data', encodedData);
      
      // Обновляем URL без перезагрузки страницы
      window.history.pushState({ path: newURL.href }, '', newURL.href);
      
      // Показываем уведомление о том, что ссылка обновлена
      this.showNotification('Ссылка обновлена! Теперь вы можете поделиться расчетом.');
    } catch (error) {
      console.warn('Ошибка при сохранении данных в URL:', error);
    }
  }
// Полностью заменяем функцию saveToPDF:
  saveToPDF() {
    // Проверяем наличие результатов
    if (!this.state.results) {
      alert('Сначала необходимо выполнить расчет');
      return;
    }
  
    // Проверяем загрузку библиотек
    if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
      alert('Библиотеки для PDF еще не загружены. Попробуйте через несколько секунд.');
      return;
    }
  
    // Находим SVG с результатами
    const svg = document.querySelector('svg[viewBox="0 0 2527 2360"]');
    
    if (!svg) {
      alert('SVG с результатами не найден');
      return;
    }
  
    // Создаем временный контейнер с фиксированными размерами
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 1200px;
      height: auto;
      background: white;
      padding: 20px;
      font-family: Arial, sans-serif;
    `;
  
    // Клонируем SVG
    const svgClone = svg.cloneNode(true);
    svgClone.style.cssText = `
      width: 1200px;
      height: auto;
      display: block;
    `;
  
    // Добавляем заголовок
    const header = document.createElement('div');
    header.style.cssText = `
      margin-bottom: 20px;
      text-align: center;
    `;
    header.innerHTML = `
      <h1 style="margin: 0; font-size: 24px; color: #333;">Матричный расчет личности</h1>
      <p style="margin: 5px 0; font-size: 16px; color: #666;">
        ${this.state.formData.surname} ${this.state.formData.name} ${this.state.formData.patronymic}
      </p>
      <p style="margin: 5px 0; font-size: 14px; color: #666;">
        Дата рождения: ${this.state.formData.day}.${this.state.formData.month}.${this.state.formData.year} | 
        Дата создания: ${new Date().toLocaleDateString('ru-RU')}
      </p>
    `;
  
    tempContainer.appendChild(header);
    tempContainer.appendChild(svgClone);
    document.body.appendChild(tempContainer);
  
    // Генерируем PDF
    html2canvas(tempContainer, {
      scale: 1.5, // Уменьшаем scale для меньшего размера файла
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 1240, // фиксированная ширина
      height: tempContainer.scrollHeight
    }).then(canvas => {
      // Удаляем временный контейнер
      document.body.removeChild(tempContainer);
      
      const { jsPDF } = window.jspdf;
      
      // Вычисляем размеры для A4
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgHeight / imgWidth;
      
      // A4 размеры в пикселях (при 72 DPI)
      const a4Width = 595.28;
      const a4Height = 841.89;
      
      let pdfWidth, pdfHeight;
      
      if (ratio > a4Height / a4Width) {
        // Если изображение слишком высокое, используем альбомную ориентацию
        pdfWidth = a4Height;
        pdfHeight = a4Width;
      } else {
        // Обычная портретная ориентация
        pdfWidth = a4Width;
        pdfHeight = a4Height;
      }
      
      const pdf = new jsPDF({
        orientation: ratio > a4Height / a4Width ? 'landscape' : 'portrait',
        unit: 'pt',
        format: 'a4'
      });
      
      // Масштабируем изображение под размер страницы
      const finalWidth = pdfWidth - 40; // отступы по 20pt с каждой стороны
      const finalHeight = (imgHeight * finalWidth) / imgWidth;
      
      if (finalHeight > pdfHeight - 40) {
        // Если не влезает, масштабируем по высоте
        const scaledHeight = pdfHeight - 40;
        const scaledWidth = (imgWidth * scaledHeight) / imgHeight;
        
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 0.7), // Используем JPEG с качеством 70%
          'JPEG',
          (pdfWidth - scaledWidth) / 2,
          20,
          scaledWidth,
          scaledHeight
        );
      } else {
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 0.7),
          'JPEG',
          20,
          20,
          finalWidth,
          finalHeight
        );
      }
      
      // Сохраняем файл
      const fileName = `matrix_${this.state.formData.surname}_${this.state.formData.name}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    }).catch(error => {
      // Удаляем временный контейнер в случае ошибки
      if (document.body.contains(tempContainer)) {
        document.body.removeChild(tempContainer);
      }
      console.error('Ошибка при создании PDF:', error);
      alert('Ошибка при создании PDF файла');
    });
  }
  
  // Функция показа уведомления
  showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4caf50;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      max-width: 300px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Удаление через 4 секунды
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  // Функция приведения числа
  reduceNumber(num) {
    while (num >= 23) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  }

  moduleNumber(num) {
    return num % 22 == 0? 22 : num % 22
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
    
    if (this.getUserLogin()) {
      
      return ANCESTRAL_PROGRAMS[key] || null;
    }
    return UNREGISTERED_PROGRAMS[key] || null;
  }

  // Функция расчета всех программ
  calculatePrograms(values) {
    const { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, u2, v2, x2, y2, o2, p2, r2, s2 } = values;
    let foundPrograms = [];

    // Функция добавления программы, если она найдена
    const addProgram = (key, source, calculation) => {
      const program = this.findProgram(key);
      
      if (key.includes('7,19') && !foundPrograms.some(p => p.code === '7,19')) {
        foundPrograms.push({
          ...ANCESTRAL_PROGRAMS['7,19'],
          source,
          calculation,
          code: key
        })
      }

      if (this.getUserLogin()) {
        if (key.includes('5,6') && !foundPrograms.some(p => p.code === '5,6')) {
          foundPrograms.push({
            ...ANCESTRAL_PROGRAMS['5,6'],
            source,
            calculation,
            code: '5,6'
          })
        }

        if (key.includes('3,9') && !foundPrograms.some(p => p.code === '3,9')) {
          foundPrograms.push({
            ...ANCESTRAL_PROGRAMS['3,9'],
            source,
            calculation,
            code: '3,9'
          })
        } 
      }

      if (program && !foundPrograms.some(p => p.id === program.id)) {
        foundPrograms.push({
          ...program,
          source,
          calculation,
          code: key
        });
      } else if (program && foundPrograms.some(p => p.id === program.id)){
        foundPrograms = foundPrograms.map((p, index) => {
          if (p.id == program.id) {
            return {
              ...p,
              source: p.source + ', ' + source
            }
          }
          return p
        })
      }

      console.log('FFFF', foundPrograms)
    };

    // Расчет программ по Мужскому роду
    // 1 колено
    addProgram(this.createProgramKey(b, t, this.reduceNumber(b + t)), 'Мужской род - 1 колено Небо', `${b} - ${t} - ${this.reduceNumber(b + t)}`);
    addProgram(this.createProgramKey(a, t, this.reduceNumber(a + t)), 'Мужской род - 1 колено Земля', `${a} - ${t} - ${this.reduceNumber(a + t)}`);
    addProgram(this.createProgramKey(this.reduceNumber(b + a), this.reduceNumber(t + t), this.reduceNumber(this.reduceNumber(b + t) + this.reduceNumber(a + t))), 'Мужской род - 1 колено Целостная', `${this.reduceNumber(b + a)} - ${this.reduceNumber(t + t)} - ${this.reduceNumber(this.reduceNumber(b + t) + this.reduceNumber(a + t))}`);
    
    if (this.getUserLogin()) {
      // 2 колено
      addProgram(this.createProgramKey(k, v2, this.reduceNumber(k + v2)), 'Мужской род - 2 колено Небо', `${k} - ${v2} - ${this.reduceNumber(k + v2)}`);
      addProgram(this.createProgramKey(j, v2, this.reduceNumber(j + v2)), 'Мужской род - 2 колено Земля', `${j} - ${v2} - ${this.reduceNumber(j + v2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(k + j), this.reduceNumber(v2 + v2), this.reduceNumber(this.reduceNumber(k + v2)+this.reduceNumber(j + v2))), 'Мужской род - 2 колено Целостная', `${this.reduceNumber(k + j)} - ${this.reduceNumber(v2 + v2)} - ${this.reduceNumber(this.reduceNumber(k + v2)+this.reduceNumber(j + v2))}`);
      
      // 3 колено
      addProgram(this.createProgramKey(g, u2, this.reduceNumber(g + u2)), 'Мужской род - 3 колено Небо', `${g} - ${u2} - ${this.reduceNumber(g + u2)}`);
      addProgram(this.createProgramKey(f, u2, this.reduceNumber(f + u2)), 'Мужской род - 3 колено Земля', `${f} - ${u2} - ${this.reduceNumber(f + u2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(g + f), this.reduceNumber(u2 + u2), this.reduceNumber(this.reduceNumber(g + u2)+this.reduceNumber(f+u2))), 'Мужской род - 3 колено Целостная', `${this.reduceNumber(g + f)} - ${this.reduceNumber(u2 + u2)} - ${this.reduceNumber(this.reduceNumber(g + u2)+this.reduceNumber(f + u2))}`);
      
      // 4 колено
      addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Мужской род - 4 колено Небо', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
      addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Мужской род - 4 колено Земля', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
      addProgram(this.createProgramKey(this.reduceNumber(e + e), this.reduceNumber(z + z), this.reduceNumber(this.reduceNumber(e + z)+this.reduceNumber(e + z))), 'Мужской род - 4 колено Целостная', `${this.reduceNumber(e + e)} - ${this.reduceNumber(z + z)} - ${this.reduceNumber(this.reduceNumber(e + z)+this.reduceNumber(z + e))}`);
      
      // 5 колено
      addProgram(this.createProgramKey(d, w, this.reduceNumber(d + w)), 'Мужской род - 5 колено Небо', `${d} - ${w} - ${this.reduceNumber(d + w)}`);
      addProgram(this.createProgramKey(c, w, this.reduceNumber(c + w)), 'Мужской род - 5 колено Земля', `${c} - ${w} - ${this.reduceNumber(c + w)}`);
      addProgram(this.createProgramKey(this.reduceNumber(d + c), this.reduceNumber(w + w), this.reduceNumber(this.reduceNumber(d + w) + this.reduceNumber(c + w))), 'Мужской род - 5 колено Целостная', `${this.reduceNumber(d + c)} - ${this.reduceNumber(w + w)} - ${this.reduceNumber(this.reduceNumber(d + w) + this.reduceNumber(c + w))}`);
      
      // 6 колено
      addProgram(this.createProgramKey(m, y2, this.reduceNumber(m + y2)), 'Мужской род - 6 колено Небо', `${m} - ${y2} - ${this.reduceNumber(m + y2)}`);
      addProgram(this.createProgramKey(l, y2, this.reduceNumber(l + y2)), 'Мужской род - 6 колено Земля', `${l} - ${y2} - ${this.reduceNumber(l + y2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(m + l), this.reduceNumber(y2 + y2), this.reduceNumber(this.reduceNumber(m + y2)+this.reduceNumber(l + y2))), 'Мужской род - 6 колено Целостная', `${this.reduceNumber(m + l)} - ${this.reduceNumber(y2 + y2)} - ${this.reduceNumber(this.reduceNumber(m + y2)+this.reduceNumber(l + y2))}`);
      
      // 7 колено
      addProgram(this.createProgramKey(i, x2, this.reduceNumber(i + x2)), 'Мужской род - 7 колено Небо', `${i} - ${x2} - ${this.reduceNumber(i + x2)}`);
      addProgram(this.createProgramKey(i, y2, this.reduceNumber(i + y2)), 'Мужской род - 7 колено Земля', `${i} - ${y2} - ${this.reduceNumber(i + y2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(i + h), this.reduceNumber(x2 + x2), this.reduceNumber(this.reduceNumber(i + x2) + this.reduceNumber(h + x2))), 'Мужской род - 7 колено Целостная', `${this.reduceNumber(i + h)} - ${this.reduceNumber(x2 + x2)} - ${this.reduceNumber(this.reduceNumber(i + x2) + this.reduceNumber(h + x2))}`);
    }
  

    // Расчет программ по Женскому роду
    // 1 колено
    addProgram(this.createProgramKey(b, n, this.reduceNumber(b + n)), 'Женский род - 1 колено Небо', `${b} - ${n} - ${this.reduceNumber(b + n)}`);
    addProgram(this.createProgramKey(a, q, this.reduceNumber(a + q)), 'Женский род - 1 колено Земля', `${a} - ${q} - ${this.reduceNumber(a + q)}`);
    addProgram(this.createProgramKey(this.reduceNumber(b + a), this.reduceNumber(n + q), this.reduceNumber(this.reduceNumber(b + n)+this.reduceNumber(a + q))), 'Женский род - 1 колено Целостная', `${this.reduceNumber(b + a)} - ${this.reduceNumber(n + q)} - ${this.reduceNumber(this.reduceNumber(b + n)+this.reduceNumber(a + q))}`);
    if (this.getUserLogin()) {
      // 2 колено
      addProgram(this.createProgramKey(k, p2, this.reduceNumber(k + p2)), 'Женский род - 2 колено Небо', `${k} - ${p2} - ${this.reduceNumber(k + p2)}`);
      addProgram(this.createProgramKey(j, s2, this.reduceNumber(j + s2)), 'Женский род - 2 колено Земля', `${j} - ${s2} - ${this.reduceNumber(j + s2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(k + j), this.reduceNumber(p2 + s2), this.reduceNumber(this.reduceNumber(k + p2) +  this.reduceNumber(j + s2))), 'Женский род - 2 колено Целостная', `${this.reduceNumber(k + j)} - ${this.reduceNumber(p2 + s2)} - ${this.reduceNumber(this.reduceNumber(k + p2) +  this.reduceNumber(j + s2))}`);
      
      // 3 колено
      addProgram(this.createProgramKey(g, o2, this.reduceNumber(g + o2)), 'Женский род - 3 колено Небо', `${g} - ${o2} - ${this.reduceNumber(g + o2)}`);
      addProgram(this.createProgramKey(f, r2, this.reduceNumber(f + r2)), 'Женский род - 3 колено Земля', `${f} - ${r2} - ${this.reduceNumber(f + r2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(g + f), this.reduceNumber(o2 + r2), this.reduceNumber(this.reduceNumber(g + o2)+this.reduceNumber(f + r2))), 'Женский род - 3 колено Целостная', `${this.reduceNumber(g + f)} - ${this.reduceNumber(o2 + r2)} - ${this.reduceNumber(this.reduceNumber(g + o2)+this.reduceNumber(f + r2))}`);
      
      // 4 колено
      addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Женский род - 4 колено Небо', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
      addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Женский род - 4 колено Земля', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
      addProgram(this.createProgramKey(this.reduceNumber(e + e), this.reduceNumber(z + z), this.reduceNumber(this.reduceNumber(e + z) + this.reduceNumber(e + z))), 'Женский род - 4 колено Целостная', `${this.reduceNumber(e + e)} - ${this.reduceNumber(z + z)} - ${this.reduceNumber(this.reduceNumber(e + z) + this.reduceNumber(e + z))}`);
      
      // 5 колено
      addProgram(this.createProgramKey(d, q, this.reduceNumber(d + q)), 'Женский род - 5 колено Небо', `${d} - ${q} - ${this.reduceNumber(d + q)}`);
      addProgram(this.createProgramKey(c, n, this.reduceNumber(c + n)), 'Женский род - 5 колено Земля', `${c} - ${n} - ${this.reduceNumber(c + n)}`);
      addProgram(this.createProgramKey(this.reduceNumber(d + c), this.reduceNumber(q + n), this.reduceNumber(this.reduceNumber(d + q) + this.reduceNumber(c + n))), 'Женский род - 5 колено Целостная', `${this.reduceNumber(d + h)} - ${this.reduceNumber(q + o2)} - ${this.reduceNumber(this.reduceNumber(d + h) + this.reduceNumber(q + o2))}`);
      
      // 6 колено
      addProgram(this.createProgramKey(m, s2, this.reduceNumber(m + s2)), 'Женский род - 6 колено Небо', `${m} - ${s2} - ${this.reduceNumber(m + s2)}`);
      addProgram(this.createProgramKey(l, p2, this.reduceNumber(l + p2)), 'Женский род - 6 колено Земля', `${l} - ${p2} - ${this.reduceNumber(l + p2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(m + l), this.reduceNumber(s2 + p2), this.reduceNumber(this.reduceNumber(m + s2) + this.reduceNumber(l + p2))), 'Женский род - 6 колено Целостная', `${this.reduceNumber(m + l)} - ${this.reduceNumber(s2 + p2)} - ${this.reduceNumber(this.reduceNumber(m + s2) + this.reduceNumber(l + p2))}`);
      
      // 7 колено
      addProgram(this.createProgramKey(i, r2, this.reduceNumber(i + r2)), 'Женский род - 7 колено Небо', `${i} - ${r2} - ${this.reduceNumber(i + r2)}`);
      addProgram(this.createProgramKey(h, o2, this.reduceNumber(h + o2)), 'Женский род - 7 колено Земля', `${h} - ${o2} - ${this.reduceNumber(h + o2)}`);
      addProgram(this.createProgramKey(this.reduceNumber(i + h), this.reduceNumber(r2 + o2), this.reduceNumber(this.reduceNumber(i + r2) +  this.reduceNumber(h + o2))), 'Женский род - 7 колено Целостная', `${this.reduceNumber(i + h)} - ${this.reduceNumber(r2 + o2)} - ${this.reduceNumber(this.reduceNumber(i + r2) +  this.reduceNumber(h + o2))}`);
    }

    // Прочие источники программ
    // Личный квадрат
    addProgram(this.createProgramKey(a, j, f), 'Личный квадрат', `${a} - ${j} - ${f}`);
    addProgram(this.createProgramKey(b, k, g), 'Личный квадрат', `${b} - ${k} - ${g}`);
    addProgram(this.createProgramKey(c, l, h), 'Личный квадрат', `${c} - ${l} - ${h}`);
    addProgram(this.createProgramKey(d, m, i), 'Личный квадрат', `${d} - ${m} - ${i}`);

    if (this.getUserLogin()){
      addProgram(this.createProgramKey(t, b, this.reduceNumber(t+b)), 'Личный квадрат', `${t} - ${b} - ${this.reduceNumber(t+b)}`);
      addProgram(this.createProgramKey(v, k, this.reduceNumber(v+k)), 'Личный квадрат', `${v} - ${k} - ${this.reduceNumber(v+k)}`);
      addProgram(this.createProgramKey(u, g, this.reduceNumber(u+g)), 'Личный квадрат', `${u} - ${g} - ${this.reduceNumber(u+g)}`);
      addProgram(this.createProgramKey(b, n, this.reduceNumber(b+n)), 'Личный квадрат', `${b} - ${n} - ${this.reduceNumber(b+n)}`);
      addProgram(this.createProgramKey(k, p, this.reduceNumber(k+p)), 'Личный квадрат', `${k} - ${p} - ${this.reduceNumber(k+p)}`);
      addProgram(this.createProgramKey(g, o, this.reduceNumber(g+o)), 'Личный квадрат', `${g} - ${o} - ${this.reduceNumber(g+o)}`);
      addProgram(this.createProgramKey(n, c, this.reduceNumber(n+c)), 'Личный квадрат', `${n} - ${c} - ${this.reduceNumber(n+c)}`);
      addProgram(this.createProgramKey(p, l, this.reduceNumber(p+l)), 'Личный квадрат', `${p} - ${l} - ${this.reduceNumber(p+l)}`);
      addProgram(this.createProgramKey(o, h, this.reduceNumber(o+h)), 'Личный квадрат', `${o} - ${h} - ${this.reduceNumber(o+h)}`);
      addProgram(this.createProgramKey(c, w, this.reduceNumber(c+w)), 'Личный квадрат', `${c} - ${w} - ${this.reduceNumber(c+w)}`);
      addProgram(this.createProgramKey(l, y, this.reduceNumber(l+y)), 'Личный квадрат', `${l} - ${y} - ${this.reduceNumber(l+y)}`);
      addProgram(this.createProgramKey(h, x, this.reduceNumber(h+x)), 'Личный квадрат', `${h} - ${x} - ${this.reduceNumber(h+x)}`);
      addProgram(this.createProgramKey(w, d, this.reduceNumber(w+d)), 'Личный квадрат', `${w} - ${d} - ${this.reduceNumber(w+d)}`);
      addProgram(this.createProgramKey(y, m, this.reduceNumber(y+m)), 'Личный квадрат', `${y} - ${m} - ${this.reduceNumber(y+m)}`);
      addProgram(this.createProgramKey(x, i, this.reduceNumber(x+i)), 'Личный квадрат', `${x} - ${i} - ${this.reduceNumber(x+i)}`);
      addProgram(this.createProgramKey(d, q, this.reduceNumber(d+q)), 'Личный квадрат', `${d} - ${q} - ${this.reduceNumber(d+q)}`);
      addProgram(this.createProgramKey(m, s, this.reduceNumber(m+s)), 'Личный квадрат', `${m} - ${s} - ${this.reduceNumber(m+s)}`);
      addProgram(this.createProgramKey(i, r, this.reduceNumber(i+r)), 'Личный квадрат', `${i} - ${r} - ${this.reduceNumber(i+r)}`);
      addProgram(this.createProgramKey(q, a, this.reduceNumber(q+a)), 'Личный квадрат', `${q} - ${a} - ${this.reduceNumber(q+a)}`);
      addProgram(this.createProgramKey(s, j, this.reduceNumber(s+j)), 'Личный квадрат', `${s} - ${j} - ${this.reduceNumber(s+j)}`);
      addProgram(this.createProgramKey(r, f, this.reduceNumber(r+f)), 'Личный квадрат', `${r} - ${f} - ${this.reduceNumber(r+f)}`);
      addProgram(this.createProgramKey(a, t, this.reduceNumber(a+t)), 'Личный квадрат', `${a} - ${t} - ${this.reduceNumber(a+t)}`);
      addProgram(this.createProgramKey(j, v, this.reduceNumber(j+v)), 'Личный квадрат', `${j} - ${v} - ${this.reduceNumber(j+v)}`);
      addProgram(this.createProgramKey(f, u, this.reduceNumber(f+u)), 'Личный квадрат', `${f} - ${u} - ${this.reduceNumber(f+u)}`);
      
      addProgram(this.createProgramKey(o, c, this.reduceNumber(o+c)), 'Личный квадрат', `${o} - ${c} - ${this.reduceNumber(o+c)}`);
      addProgram(this.createProgramKey(c, x, this.reduceNumber(c+x)), 'Личный квадрат', `${c} - ${x} - ${this.reduceNumber(c+x)}`);
      addProgram(this.createProgramKey(d, x, this.reduceNumber(d+x)), 'Личный квадрат', `${d} - ${x} - ${this.reduceNumber(d+x)}`);
      addProgram(this.createProgramKey(d, r, this.reduceNumber(d+r)), 'Личный квадрат', `${d} - ${r} - ${this.reduceNumber(d+r)}`);
      addProgram(this.createProgramKey(r, a, this.reduceNumber(r+a)), 'Личный квадрат', `${r} - ${a} - ${this.reduceNumber(r+a)}`);
      addProgram(this.createProgramKey(a, u, this.reduceNumber(a+u)), 'Личный квадрат', `${a} - ${u} - ${this.reduceNumber(a+u)}`);
      addProgram(this.createProgramKey(b, u, this.reduceNumber(b+u)), 'Личный квадрат', `${b} - ${u} - ${this.reduceNumber(b+u)}`);

    
    }
    // Родовой квадрат
    addProgram(this.createProgramKey(t, v, u), 'Родовой квадрат', `${t} - ${v} - ${u}`);
    addProgram(this.createProgramKey(n, p, o), 'Родовой квадрат', `${n} - ${p} - ${o}`);
    addProgram(this.createProgramKey(w, y, x), 'Родовой квадрат', `${w} - ${y} - ${x}`);
    addProgram(this.createProgramKey(q, s, r), 'Родовой квадрат', `${q} - ${s} - ${r}`);
    
    // if (this.getUserLogin()){
    //   addProgram(this.createProgramKey(t, n, this.reduceNumber(t+n)), 'Родовой квадрат', `${t} - ${n} - ${t+n}`);
    //   addProgram(this.createProgramKey(n, w, this.reduceNumber(n+w)), 'Родовой квадрат', `${n} - ${w} - ${n+w}`);
    //   addProgram(this.createProgramKey(w, q, this.reduceNumber(w+q)), 'Родовой квадрат', `${w} - ${q} - ${w+q}`);
    //   addProgram(this.createProgramKey(q, t, this.reduceNumber(q+t)), 'Родовой квадрат', `${q} - ${t} - ${q+t}`);
    //   addProgram(this.createProgramKey(t, g, this.reduceNumber(t+g)), 'Родовой квадрат', `${t} - ${g} - ${t+g}`);
    //   addProgram(this.createProgramKey(n, h, this.reduceNumber(n+h)), 'Родовой квадрат', `${n} - ${h} - ${n+h}`);
    //   addProgram(this.createProgramKey(w, i, this.reduceNumber(w+i)), 'Родовой квадрат', `${w} - ${i} - ${w+i}`);
    //   addProgram(this.createProgramKey(q, f, this.reduceNumber(q+f)), 'Родовой квадрат', `${q} - ${f} - ${q+f}`);
    //   addProgram(this.createProgramKey(g, n, this.reduceNumber(g+n)), 'Родовой квадрат', `${g} - ${n} - ${g+n}`);
    //   addProgram(this.createProgramKey(h, w, this.reduceNumber(h+w)), 'Родовой квадрат', `${h} - ${w} - ${h+w}`);
    //   addProgram(this.createProgramKey(i, q, this.reduceNumber(i+q)), 'Родовой квадрат', `${i} - ${q} - ${i+q}`);
    //   addProgram(this.createProgramKey(f, t, this.reduceNumber(f+t)), 'Родовой квадрат', `${f} - ${t} - ${f+t}`);
    //   addProgram(this.createProgramKey(u, b, this.reduceNumber(u+b)), 'Родовой квадрат', `${u} - ${b} - ${u+b}`);
    //   addProgram(this.createProgramKey(b, o, this.reduceNumber(b+o)), 'Родовой квадрат', `${b} - ${o} - ${b+o}`);
    //   addProgram(this.createProgramKey(c, x, this.reduceNumber(c+x)), 'Родовой квадрат', `${c} - ${x} - ${c+x}`);
    //   addProgram(this.createProgramKey(x, d, this.reduceNumber(x+d)), 'Родовой квадрат', `${x} - ${d} - ${x+d}`);
    //   addProgram(this.createProgramKey(d, r, this.reduceNumber(d+r)), 'Родовой квадрат', `${d} - ${r} - ${d+r}`);
    //   addProgram(this.createProgramKey(r, a, this.reduceNumber(r+a)), 'Родовой квадрат', `${r} - ${a} - ${r+a}`);
    //   addProgram(this.createProgramKey(a, u, this.reduceNumber(a+u)), 'Родовой квадрат', `${a} - ${u} - ${a+u}`);
    // }

    // Таблица чакр
    addProgram(this.createProgramKey(b, a, this.reduceNumber(b + a)), 'Таблица чакр', `${b} - ${a} - ${this.reduceNumber(b + a)}`);
    addProgram(this.createProgramKey(k, j, this.reduceNumber(k + j)), 'Таблица чакр', `${k} - ${j} - ${this.reduceNumber(k + j)}`);
    addProgram(this.createProgramKey(g, f, this.reduceNumber(g + f)), 'Таблица чакр', `${g} - ${f} - ${this.reduceNumber(g + f)}`);
    addProgram(this.createProgramKey(n, q, this.reduceNumber(n + q)), 'Таблица чакр', `${n} - ${q} - ${this.reduceNumber(n + q)}`);
    addProgram(this.createProgramKey(t, w, this.reduceNumber(t + w)), 'Таблица чакр', `${t} - ${w} - ${this.reduceNumber(t + w)}`);
    addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Таблица чакр', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
    addProgram(this.createProgramKey(h, i, this.reduceNumber(h + i)), 'Таблица чакр', `${h} - ${i} - ${this.reduceNumber(h + i)}`);
    addProgram(this.createProgramKey(l, m, this.reduceNumber(l + m)), 'Таблица чакр', `${l} - ${m} - ${this.reduceNumber(l + m)}`);
    addProgram(this.createProgramKey(c, d, this.reduceNumber(c + d)), 'Таблица чакр', `${c} - ${d} - ${this.reduceNumber(c + d)}`);

    // if (this.getUserLogin()){
    //   addProgram(this.createProgramKey(b, k, this.reduceNumber(b + k)), 'Таблица чакр', `${b} - ${k} - ${this.reduceNumber(b + k)}`);
    //   addProgram(this.createProgramKey(k, g, this.reduceNumber(k + g)), 'Таблица чакр', `${k} - ${g} - ${this.reduceNumber(k + g)}`);
    //   addProgram(this.createProgramKey(g, n, this.reduceNumber(g + n)), 'Таблица чакр', `${g} - ${n} - ${this.reduceNumber(g + n)}`);
    //   addProgram(this.createProgramKey(n, t, this.reduceNumber(n + t)), 'Таблица чакр', `${n} - ${t} - ${this.reduceNumber(n + t)}`);
    //   addProgram(this.createProgramKey(t, e, this.reduceNumber(t + e)), 'Таблица чакр', `${t} - ${e} - ${this.reduceNumber(t + e)}`);
    //   addProgram(this.createProgramKey(e, i, this.reduceNumber(e + i)), 'Таблица чакр', `${e} - ${i} - ${this.reduceNumber(e + i)}`);
    //   addProgram(this.createProgramKey(i, m, this.reduceNumber(i + m)), 'Таблица чакр', `${i} - ${m} - ${this.reduceNumber(i + m)}`);
    //   addProgram(this.createProgramKey(m, d, this.reduceNumber(m + d)), 'Таблица чакр', `${m} - ${d} - ${this.reduceNumber(m + d)}`);
    //   addProgram(this.createProgramKey(a, j, this.reduceNumber(a + k)), 'Таблица чакр', `${a} - ${j} - ${this.reduceNumber(a + k)}`);
    //   addProgram(this.createProgramKey(j, f, this.reduceNumber(j + f)), 'Таблица чакр', `${j} - ${f} - ${this.reduceNumber(j + f)}`);
    //   addProgram(this.createProgramKey(f, q, this.reduceNumber(f + q)), 'Таблица чакр', `${f} - ${q} - ${this.reduceNumber(f + q)}`);
    //   addProgram(this.createProgramKey(q, w, this.reduceNumber(q + w)), 'Таблица чакр', `${q} - ${w} - ${this.reduceNumber(q + w)}`);
    //   addProgram(this.createProgramKey(w, z, this.reduceNumber(w + z)), 'Таблица чакр', `${w} - ${z} - ${this.reduceNumber(w + z)}`);
    //   addProgram(this.createProgramKey(z, h, this.reduceNumber(z + h)), 'Таблица чакр', `${z} - ${h} - ${this.reduceNumber(z + h)}`);
    //   addProgram(this.createProgramKey(h, l, this.reduceNumber(h + l)), 'Таблица чакр', `${h} - ${l} - ${this.reduceNumber(h + l)}`);
    //   addProgram(this.createProgramKey(l, c, this.reduceNumber(l + c)), 'Таблица чакр', `${l} - ${c} - ${this.reduceNumber(l + c)}`);
    //   addProgram(this.createProgramKey(b, a, this.reduceNumber(b + a)), 'Таблица чакр', `${b} - ${a} - ${this.reduceNumber(b + a)}`);
    //   addProgram(this.createProgramKey(k, j, this.reduceNumber(k + j)), 'Таблица чакр', `${k} - ${j} - ${this.reduceNumber(k + j)}`);
    //   addProgram(this.createProgramKey(g, f, this.reduceNumber(g + f)), 'Таблица чакр', `${g} - ${f} - ${this.reduceNumber(g + f)}`);
    //   addProgram(this.createProgramKey(n, q, this.reduceNumber(n + q)), 'Таблица чакр', `${n} - ${q} - ${this.reduceNumber(n + q)}`);
    //   addProgram(this.createProgramKey(t, w, this.reduceNumber(t + w)), 'Таблица чакр', `${t} - ${w} - ${this.reduceNumber(t + w)}`);
    //   addProgram(this.createProgramKey(e, z, this.reduceNumber(e + z)), 'Таблица чакр', `${e} - ${z} - ${this.reduceNumber(e + z)}`);
    //   addProgram(this.createProgramKey(i, h, this.reduceNumber(i + h)), 'Таблица чакр', `${i} - ${h} - ${this.reduceNumber(i + h)}`);
    //   addProgram(this.createProgramKey(m, l, this.reduceNumber(m + l)), 'Таблица чакр', `${m} - ${l} - ${this.reduceNumber(m + l)}`);
    // }

    //Таблица предназаначений
    let bd = this.reduceNumber(b + d);
    let ac = this.reduceNumber(a + c);
    let tw = this.reduceNumber(t + w);
    let nq = this.reduceNumber(n + q);
    let twnq = this.reduceNumber(tw + nq);
    let abcd = this.reduceNumber(ac + bd);

    addProgram(this.createProgramKey(bd, ac, this.reduceNumber(bd  + ac)), 'Таблица предназаначений 1', `${bd} - ${ac} - ${this.reduceNumber(bd + ac)}`);
    addProgram(this.createProgramKey(tw, nq, this.reduceNumber(tw + nq)), 'Таблица предназаначений 2', `${tw} - ${nq} - ${this.reduceNumber(tw + nq)}`);
    // addProgram(this.createProgramKey(abcd, twnq, this.reduceNumber(abcd + twnq)), 'Таблица предназаначений 3', `${abcd} - ${twnq} - ${this.reduceNumber(abcd +twnq)}`);
    // addProgram(this.createProgramKey(twnq, abcd, twnq, 'Таблица предназаначений 4', `${twnq} - ${abcd} - ${twnq}`));

    // addProgram(this.createProgramKey(this.reduceNumber(abcd + twnq), twnq, this.reduceNumber(this.reduceNumber(abcd + twnq) + twnq)), 'Таблица предназаначений', `${this.reduceNumber(abcd + twnq)} - ${twnq} - ${this.reduceNumber(this.reduceNumber(abcd + twnq) + twnq)}`);

    // Двухзначные программы
    
    // addProgram(this.createProgramKey(7, 19), 'Достаток', `${7} - ${19}`);
    // addProgram(this.createProgramKey(5, 6), 'Красота и уют в доме', `${5} - ${6}`);
    // addProgram(this.createProgramKey(3, 9), 'Преодоление', `${3} - ${9}`);
    return foundPrograms;
  }

  // Функция расчета благой кармы и точек роста
  calculateKarma(values, originalDay, originalYear, originalMonth) {
    const { a, b, c } = values;
    
    // Определяем a2 и c2 по специальным правилам
    const a2 = (originalDay >= 23 && originalDay <= 31) ? originalDay - 22 : null;
    const originalYearSum = originalYear.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const originalDaySum = originalDay.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const originalMonthSum = originalMonth.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const c2 = originalYearSum > 22 ? originalYearSum - 22 : null;
    console.log(originalYearSum, originalDaySum, originalMonthSum)
    // Благая карма
    let goodKarma = []

    for (let col1 = 0; col1 < 2; col1++){
      for (let col2 = 0; col2 < 2; col2++){
        for (let col3 = 0; col3 < 2; col3++){
          for (let col4 = 0; col4 < 2; col4++){
            let col1_value = col1? 
            this.reduceNumber(this.reduceNumber(originalDay) + originalMonth)
            :
            this.moduleNumber(this.moduleNumber(originalDay) + originalMonth)
            
            let col2_value = col2? 
            this.reduceNumber(this.reduceNumber(originalDay) + this.reduceNumber(originalYearSum))
            :
            this.moduleNumber(this.moduleNumber(originalDay) + this.moduleNumber(originalYearSum))

            goodKarma.push({
              col1: col1_value,
              col2: col2_value,
              col3: col3? 
              this.reduceNumber(col1_value + col2_value)
              :
              this.moduleNumber(col1_value + col2_value),
              col4: col4? 
              this.reduceNumber(originalMonth + this.reduceNumber(originalYearSum))
              :
              this.moduleNumber(originalMonth + this.moduleNumber(originalYearSum)),
            })
          }
        }
      }
    }

    goodKarma = goodKarma.reduce((acc, current) => {
      const isDuplicate = acc.some(item => 
        JSON.stringify(item) === JSON.stringify(current)
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);

    console.log(goodKarma)
    
    
    // Точки роста
    let  growthPoints = []

    for (let col1 = 0; col1 < 2; col1++){
      for (let col2 = 0; col2 < 2; col2++){
        for (let col3 = 0; col3 < 2; col3++){
          for (let col4 = 0; col4 < 2; col4++){
            let col1_value = col1? 
            Math.abs(originalMonth - this.reduceNumber(originalDay))
            :
            Math.abs(originalMonth - this.moduleNumber(originalDay))
            
            let col2_value = col2? 
            Math.abs(this.reduceNumber(originalYearSum) - this.reduceNumber(originalDay))
            :
            Math.abs(this.moduleNumber(originalYearSum) - this.moduleNumber(originalDay))

            growthPoints.push({
              col1: col1_value,
              col2: col2_value,
              col3: col3? 
              this.reduceNumber(Math.abs(col1_value - col2_value))
              :
              this.moduleNumber(Math.abs(col1_value - col2_value)),
              col4: col4? 
              this.reduceNumber(Math.abs(originalMonth - this.reduceNumber(originalYearSum)))
              :
              this.moduleNumber(Math.abs(originalMonth - this.moduleNumber(originalYearSum)))
            })
          }
        }
      }
    }
    console.log(growthPoints)
    growthPoints = growthPoints.reduce((acc, current) => {
      const isDuplicate = acc.some(item => 
        JSON.stringify(item) === JSON.stringify(current)
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);
    
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

    this.saveDataToURL();

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
    const originalMonth = parseInt(month)
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
    
    const t = gender === 'male' ? 
        this.calculateLetterValue(fatherSurname) 
        : this.calculateLetterValue(surname);
    const u = this.reduceNumber(t + e);
    const v = this.reduceNumber(t + u);
    
    const w = gender === 'male' 
      ? this.calculateLetterValue(patronymic)
      : this.calculateLetterValue(fatherSurname);
    
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

    const originalYearSum = originalYear.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const originalDaySum = originalDay.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const originalMonthSum = originalMonth.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);

    const calculatedValues = {
      a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
      u2, v2, x2, y2, o2, p2, r2, s2, originalYearSum, originalDaySum, originalMonthSum
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
        sky: this.reduceNumber(b + d),
        earth: this.reduceNumber(a + c),
        purpose: this.reduceNumber(this.reduceNumber(b + d) + this.reduceNumber(a + c))
      },
      social: {
        male: this.reduceNumber(n + q),
        female: this.reduceNumber(t + w),
        purpose: this.reduceNumber(this.reduceNumber(n + q) + this.reduceNumber(t + w))
      },
      spiritual: {
        purpose: this.reduceNumber(this.reduceNumber(this.reduceNumber(b + d) + this.reduceNumber(a + c)) + this.reduceNumber(this.reduceNumber(n + q) + this.reduceNumber(t + w))),
        formula: `((${b} + ${d}) + (${a} + ${c})) + ((${n} + ${q}) + (${t} + ${w}))`
      },
      planetary: {
        purpose: this.reduceNumber(
            this.reduceNumber(this.reduceNumber(n+q) + this.reduceNumber(t+w)) +
            this.reduceNumber(
                this.reduceNumber(this.reduceNumber(b+d) + this.reduceNumber(a+c)) +
                this.reduceNumber(this.reduceNumber(n+q) + this.reduceNumber(t+w))
            )
        ),
        formula: `((${n} + ${q}) + (${t} + ${w})) + (((${b} + ${d}) + (${a} + ${c})) + ((${n} + ${q}) + (${t} + ${w})))`
      }
    };

    // Расчет программ
    const foundPrograms = this.calculatePrograms(calculatedValues);
    
    // Расчет благой кармы и точек роста
    const karmaResults = this.calculateKarma(calculatedValues, originalDay, originalYear, originalMonth);

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

  onLoginClick(){
    window.location.replace('members/login?redirecturl=cabinet')
  }

  onLogoutClick(){
    localStorage.clear()
    window.location.replace('members/login?redirecturl=cabinet')
  }


  render() {
    const { formData, results, programs, chakras, purposes, karma, errors } = this.state;
    const hasErrors = Object.values(errors).some(error => error !== null);
    const isFormValid = Object.keys(formData).every(field => {
      if (['fatherSurname', 'motherMaidenName'].includes(field)) return true;
      return formData[field] && formData[field].trim() !== '';
    }) && !hasErrors;

    return e('div', { className: 'matrix-calculator' },
      e('div', {className: 'header'}, 
        e('a', {href: '/'}, 
          e('img', {
            className: 'logo',
            // src: 'https://api.alkhimiyadushi.ru/images/logo.webp',
            src: 'logo.webp',
          })
        ),
        e('div', {
          className: 'login-btn',
          onClick: (e) => this.onLoginClick()
        }, 'Войти'),          
      ),
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

          this.state.results && this.getUserLogin() && e('button', {
            className: 'pdf-btn',
            onClick: this.saveCalculation,
          }, 'Сохранить расчет'),

          this.state.results && this.getUserLogin() && e('button', {
            className: 'pdf-btn',
            onClick: this.saveToPDF,
          }, 'Сохранить PDF'),
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


        // results && e('div', { className: 'results-section' },
        //   e('h2', null, 'Результаты расчета:'),
        //   e('div', { className: 'results-grid' },
        //     Object.entries(results).map(([key, value], index) =>
        //       e('div', { className: 'result-item', key: index }, `${key} = ${value}`)
        //     )
        //   )
        // ),

        results && e('div', { className: 'results-section' },
          e('h2', null, 'Результаты расчета:'),
          e('div', {style: {width: '100%', textAlign:'left'}}, 
            e('div', {className:'results_text'}, `Троичный код мужского рода:`, e('div', {className:'results_text_span'}, `${results.t} -  ${results.w} -  ${this.reduceNumber(results.t + results.w)}`)),
            e('div',{className:'results_text'}, `Троичный код женского рода:`,  e('div', {className:'results_text_span'}, `${results.n} -  ${results.q} -  ${this.reduceNumber(results.n + results.q)}`)),
            e('div', {className:'results_text'}, `Личная сила:`,  e('div', {className:'results_text_span'}, `${results.e}`)),
            e('div', {className:'results_text'}, `Сила рода:`,  e('div', {className:'results_text_span'}, `${results.z}`)),
            e('div', {className:'results_text'}, `Код внутренней силы:`, e('div', {className:'results_text_span'}, `${results.e} -  ${results.z} -  ${this.reduceNumber(results.e + results.z)}`)),
          )
          
        ),

        // Матрица судьбы
        results && e('div', { className: 'results-section' },
          e('h2', null, 'Матрица судьбы:'),
          
          e('div', { 
            style: { 
              textAlign: 'center', 
              marginTop: '20px',
              padding: '20px',
              background: 'linear-gradient(135deg, rgb(237, 224, 241), rgb(224, 202, 231))',
              borderRadius: '15px',
              border: '1px solid #a06eb6',
              overflowX: 'auto'
            } 
          },
          e('img', { 
            src: 'https://api.alkhimiyadushi.ru/images/dollar_t.svg',
            style: { 
              height: 'min(5vw, 40px)',
              maxHeight: '40px',
              marginBottom: '-40px',
              position: 'relative',
              top: 'min(410px, 41vw)',
              right: 'max(-14vw, -150px)',
            },
            className: 'svg-dollar'
          }),

          e('svg', {
            width: '100%',
            height: 'auto',
            viewBox: '0 0 2527 2360',
            className: 'svg-matrix',
            },
            e('defs', null,
              e('linearGradient', { 
                id: 'dollarGradient', 
                x1: '0%', 
                y1: '0%', 
                x2: '100%', 
                y2: '100%',
                gradientUnits: 'userSpaceOnUse'
                },
                e('stop', { offset: '0%', stopColor: '#FFD700' }),
                e('stop', { offset: '50%', stopColor: '#FFA500' }),
                e('stop', { offset: '100%', stopColor: '#FF8C00' })
              ),
              e('radialGradient', {
                  id: 'heartGradient',
                  cx: '0',
                  cy: '0', 
                  r: '1',
                  gradientUnits: 'userSpaceOnUse',
                  gradientTransform: 'translate(74 63) rotate(135.001) scale(67.8807 71.0167)'
                },
                e('stop', { stopColor: '#A21236' }),
                e('stop', { offset: '1', stopColor: '#DA3A62' })
              ),
              e('linearGradient', { 
                id: 'maleGradient', 
                x1: '0', 
                y1: '0', 
                x2: '500', 
                y2: '500', 
                gradientUnits: 'userSpaceOnUse' 
              },
                e('stop', { stopColor: 'white' }),
                e('stop', { offset: '0.172115', stopColor: '#DB9B01' })
              ), 
            ),

            e('clipPath', { id: 'maleClipPath' },
              e('path', { 
                d: 'M124 40.2025C124 44.6208 127.582 48.2025 132 48.2025C136.418 48.2025 140 44.6208 140 40.2025H132H124ZM132 8H140C140 3.58172 136.418 0 132 0V8ZM100.686 0C96.2675 0 92.6857 3.58172 92.6857 8C92.6857 12.4183 96.2675 16 100.686 16V8V0ZM22.2672 122.328L28.0026 116.751L28.0026 116.751L22.2672 122.328ZM91.1551 122.328L85.4198 116.751L85.4197 116.751L91.1551 122.328ZM91.1551 51.4856L96.8905 45.9084L96.8904 45.9084L91.1551 51.4856ZM22.2672 51.4856L16.5318 45.9084L16.5317 45.9085L22.2672 51.4856ZM84.681 45.1864C81.6008 48.354 81.6716 53.4188 84.8392 56.499C88.0068 59.5792 93.0716 59.5083 96.1518 56.3408L90.4164 50.7636L84.681 45.1864ZM130.777 20.7335C133.857 17.5659 133.786 12.5011 130.618 9.42087C127.451 6.34068 122.386 6.41153 119.306 9.57911L125.041 15.1563L130.777 20.7335ZM132 40.2025H140V8H132H124V40.2025H132ZM132 8V0H100.686V8V16H132V8ZM22.2672 122.328L16.5317 127.905C38.6958 150.698 74.7262 150.698 96.8905 127.905L91.1551 122.328L85.4197 116.751C69.5379 133.083 43.884 133.083 28.0026 116.751L22.2672 122.328ZM91.1551 122.328L96.8904 127.905C107.934 116.548 113.422 101.692 113.422 86.9068H105.422H97.4222C97.4222 97.7615 93.3989 108.545 85.4198 116.751L91.1551 122.328ZM105.422 86.9068H113.422C113.422 72.1216 107.934 57.2655 96.8905 45.9084L91.1551 51.4856L85.4197 57.0628C93.399 65.2685 97.4222 76.0521 97.4222 86.9068H105.422ZM91.1551 51.4856L96.8904 45.9084C74.7261 23.1157 38.6958 23.1156 16.5318 45.9084L22.2672 51.4856L28.0026 57.0628C43.884 40.7309 69.5379 40.7308 85.4197 57.0629L91.1551 51.4856ZM22.2672 51.4856L16.5317 45.9085C-5.51055 68.5763 -5.51062 105.238 16.5318 127.905L22.2672 122.328L28.0026 116.751C11.9992 100.293 11.9991 73.5205 28.0026 57.0628L22.2672 51.4856ZM90.4164 50.7636L96.1518 56.3408L130.777 20.7335L125.041 15.1563L119.306 9.57911L84.681 45.1864L90.4164 50.7636Z' 
              })
            ),

            e('clipPath', { id: 'femaleClipPath' },
              e('path', { 
                d: 'M54.0798 8.74928L54.0704 0.749284L54.0703 0.749281L54.0798 8.74928ZM8.76095 54.0681L16.7609 54.0776L16.7609 54.0776L8.76095 54.0681ZM53.9725 99.2797L53.982 107.28L53.9725 99.2797ZM61.446 99.2905C61.4512 94.8722 57.8737 91.2862 53.4555 91.281C49.0372 91.2758 45.4512 94.8533 45.446 99.2715L53.446 99.281L61.446 99.2905ZM45.3771 157.469C45.3719 161.888 48.9494 165.474 53.3677 165.479C57.786 165.484 61.3719 161.907 61.3771 157.488L53.3771 157.479L45.3771 157.469ZM82.5243 133.112C86.9426 133.107 90.52 129.521 90.5148 125.103C90.5096 120.685 86.9237 117.107 82.5054 117.112L82.5148 125.112L82.5243 133.112ZM24.307 117.181C19.8888 117.186 16.3113 120.772 16.3165 125.191C16.3217 129.609 19.9077 133.186 24.326 133.181L24.3165 125.181L24.307 117.181ZM54.0798 8.74928L54.0703 0.749281C24.6603 0.784001 0.795674 24.6486 0.760953 54.0587L8.76095 54.0681L16.7609 54.0776C16.7852 33.4893 33.5009 16.7736 54.0892 16.7493L54.0798 8.74928ZM8.76095 54.0681L0.760954 54.0586C0.743481 68.766 6.69919 82.0917 16.324 91.7166L21.9809 86.0597L27.6377 80.4028C20.8993 73.6644 16.7487 64.3697 16.7609 54.0776L8.76095 54.0681ZM21.9809 86.0597L16.324 91.7166C25.9489 101.341 39.2746 107.297 53.982 107.28L53.9725 99.2797L53.9631 91.2797C43.6709 91.2919 34.3762 87.1413 27.6377 80.4028L21.9809 86.0597ZM53.9725 99.2797L53.982 107.28C83.392 107.245 107.257 83.3803 107.291 53.9703L99.2914 53.9609L91.2914 53.9514C91.267 74.5396 74.5513 91.2553 53.9631 91.2797L53.9725 99.2797ZM99.2914 53.9609L107.291 53.9703C107.326 24.5455 83.4953 0.714646 54.0704 0.749284L54.0798 8.74928L54.0892 16.7493C74.6629 16.7251 91.3157 33.378 91.2914 53.9514L99.2914 53.9609ZM53.446 99.281L45.446 99.2715L45.3771 157.469L53.3771 157.479L61.3771 157.488L61.446 99.2905L53.446 99.281ZM82.5148 125.112L82.5054 117.112L24.307 117.181L24.3165 125.181L24.326 133.181L82.5243 133.112L82.5148 125.112Z' 
              })
            ),
            // Основные линии структуры
            e('path', {
              d: 'M2006 427V1909H518V427H2006Z',
              stroke: '#416150',
              strokeWidth: '10',
              fill: 'none'
              }
            ),
            
            e('path', {
              d: 'M508 417L2016 1919M2016 417L508 1919',
              stroke: '#FFC000',
              strokeWidth: '10'
              }
            ),
            
            e('rect', {
              x: '1263.02',
              y: '172.142',
              width: '1408.41',
              height: '1402.73',
              transform: 'rotate(45 1263.02 172.142)',
              stroke: '#416150',
              strokeWidth: '10',
              fill: 'none'
              }
            ),
            
            e('path', {
              d: 'M1263.02 158L1266.53 1920.5M2273.06 1168.04L257 1164.02M1267.04 2174.06L1266.53 1920.5M2023.5 1168.04L1266.53 1920.5',
              stroke: '#8F4F50',
              strokeWidth: '10'
              }
            ),
          
            // Угловые точки (большие кружки)
            // t - верхний левый
            e('rect', {
              x: '458',
              y: '354',
              width: '130',
              height: '130',
              rx: '1000',
              fill: '#92D053'
            }),
            e('text', {
              x: '523',
              y: '442',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.t || ''),
          
            // w - нижний правый
            e('rect', {
              x: '1961',
              y: '1856',
              width: '130',
              height: '130',
              rx: '1000',
              fill: '#92D053'
            }),
            e('text', {
              x: '2026',
              y: '1944',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.w || ''),
          
            // n - верхний правый
            e('rect', {
              x: '1961',
              y: '354',
              width: '130',
              height: '130',
              rx: '1000',
              fill: '#2FCB9D'
            }),
            e('text', {
              x: '2026',
              y: '442',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.n || ''),
          
            // q - нижний левый
            e('rect', {
              x: '456',
              y: '1855',
              width: '130',
              height: '130',
              rx: '1000',
              fill: '#2FCB9D'
            }),
            e('text', {
              x: '521',
              y: '1943',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.q || ''),
          
            // Основные точки крестообразной структуры
            // a - левая
            e('rect', {
              x: '184',
              y: '1121',
              width: '130',
              height: '130',
              rx: '1000',
              fill: '#B75D97'
            }),
            e('text', {
              x: '249',
              y: '1209',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.a || ''),
          
            // b - верхняя
            e('rect', {
              x: '1195',
              y: '103',
              width: '130',
              height: '130',
              rx: '1000',
              fill: '#B75D97'
            }),
            e('text', {
              x: '1260',
              y: '191',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.b || ''),
          
            // e - центральная (зеленая)
            e('rect', {
              x: '1207',
              y: '1018',
              width: '130',
              height: '130',
              rx: '1000',
              fill: '#66E770'
            }),
            e('text', {
              x: '1272',
              y: '1114',
              textAnchor: 'middle',
              fill: 'black',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.e || ''),
          
            // z - под центром
            e('rect', {
              x: '1207',
              y: '1180',
              width: '130',
              height: '130',
              rx: '1000',
              fill: '#66E770'
            }),
            e('text', {
              x: '1272',
              y: '1276',
              textAnchor: 'middle',
              fill: 'black',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.z || ''),
          
            // c - правая
            e('rect', {
              x: '2230',
              y: '1114',
              width: '130',
              height: '130',
              rx: '1000',
              fill: '#FF0000'
            }),
            e('text', {
              x: '2295',
              y: '1202',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.c || ''),
          
            // d - нижняя
            e('rect', {
              x: '1207',
              y: '2110',
              width: '130',
              height: '130',
              rx: '1000',
              fill: '#FF0000'
            }),
            e('text', {
              x: '1272',
              y: '2198',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.d || ''),
          
            // Дополнительные точки (средние кружки)
            // v
            e('rect', {
              x: '601',
              y: '507',
              width: '105',
              height: '105',
              rx: '900',
              fill: '#AFABAA'
            }),
            e('text', {
              x: '652',
              y: '590',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.v || ''),
          
            // l
            e('rect', {
              x: '2086',
              y: '1127',
              width: '105',
              height: '105',
              rx: '900',
              fill: '#FBC203'
            }),
            e('text', {
              x: '2141',
              y: '1205',
              textAnchor: 'middle',
              fill: 'black',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.l || ''),
          
            // m
            e('rect', {
              x: '1210',
              y: '1986',
              width: '105',
              height: '105',
              rx: '900',
              fill: '#FBC203'
            }),
            e('text', {
              x: '1265',
              y: '2064',
              textAnchor: 'middle',
              fill: 'black',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.m || ''),
          
            // p
            e('rect', {
              x: '1842',
              y: '517',
              width: '105',
              height: '105',
              rx: '900',
              fill: '#AFABAA'
            }),
            e('text', {
              x: '1897',
              y: '595',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.p || ''),
          
            // Малые точки (маленькие кружки)
            // o
            e('rect', {
              x: '1721',
              y: '626',
              width: '90',
              height: '90',
              rx: '40',
              fill: '#AFABAA'
            }),
            e('text', {
              x: '1765',
              y: '688',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '64',
              fontWeight: 'bold'
            }, results.o || ''),
          
            // u
            e('rect', {
              x: '722',
              y: '627',
              width: '90',
              height: '90',
              rx: '40',
              fill: '#AFABAA'
            }),
            e('text', {
              x: '767',
              y: '692',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '64',
              fontWeight: 'bold'
            }, results.u || ''),
          
            // x
            e('rect', {
              x: '1721',
              y: '1626',
              width: '90',
              height: '90',
              rx: '40',
              fill: '#AFABAA'
            }),
            e('text', {
              x: '1764',
              y: '1690',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '64',
              fontWeight: 'bold'
            }, results.x || ''),
          
            // r
            e('rect', {
              x: '722',
              y: '1628',
              width: '90',
              height: '90',
              rx: '40',
              fill: '#AFABAA'
            }),
            e('text', {
              x: '768',
              y: '1691',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '64',
              fontWeight: 'bold'
            }, results.r || ''),
          
            // f
            e('rect', {
              x: '482',
              y: '1136',
              width: '90',
              height: '90',
              rx: '40',
              fill: '#8FAADC'
            }),
            e('text', {
              x: '528',
              y: '1198',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '64',
              fontWeight: 'bold'
            }, results.f || ''),
          
            // g (верхняя)
            e('rect', {
              x: '1219',
              y: '385',
              width: '90',
              height: '90',
              rx: '40',
              fill: '#8FAADC'
            }),
            e('text', {
              x: '1264',
              y: '448',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '64',
              fontWeight: 'bold'
            }, results.g || ''),
          
            // h (правая)
            e('rect', {
              x: '1963',
              y: '1129',
              width: '90',
              height: '90',
              rx: '40',
              fill: '#FFFE00'
            }),
            e('text', {
              x: '2008',
              y: '1192',
              textAnchor: 'middle',
              fill: 'black',
              fontSize: '64',
              fontWeight: 'bold'
            }, results.h || ''),
          
            // i (нижняя)
            e('rect', {
              x: '1215',
              y: '1859',
              width: '90',
              height: '90',
              rx: '40',
              fill: '#FFFE00'
            }),
            e('text', {
              x: '1261',
              y: '1922',
              textAnchor: 'middle',
              fill: 'black',
              fontSize: '64',
              fontWeight: 'bold'
            }, results.i || ''),
          
            // y
            e('rect', {
              x: '1833',
              y: '1734',
              width: '105',
              height: '105',
              rx: '900',
              fill: '#AFABAA'
            }),
            e('text', {
              x: '1880',
              y: '1812',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.y || ''),
          
            // s
            e('rect', {
              x: '601',
              y: '1733',
              width: '105',
              height: '105',
              rx: '900',
              fill: '#AFABAA'
            }),
            e('text', {
              x: '651',
              y: '1811',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.s || ''),
          
            // j
            e('rect', {
              x: '348',
              y: '1126',
              width: '105',
              height: '105',
              rx: '900',
              fill: '#0070C0'
            }),
            e('text', {
              x: '398',
              y: '1205',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.j || ''),
          
            // k
            e('rect', {
              x: '1212',
              y: '259',
              width: '105',
              height: '105',
              rx: '900',
              fill: '#0070C0'
            }),
            e('text', {
              x: '1261',
              y: '337',
              textAnchor: 'middle',
              fill: 'white',
              fontSize: '80',
              fontWeight: 'bold'
            }, results.k || ''),
            //h+i
            e('rect', {
                x: '1580',
                y: '1480',
                width: '120',
                height: '120',
                rx: '60',
                fill: '#AFABAA'
              }),
              e('text', {
                x: '1640',
                y: '1560',
                textAnchor: 'middle',
                fill: 'white',
                fontSize: '80',
                fontWeight: 'bold'
              }, this.reduceNumber(results.h+results.i) || ''),

              // (h+i)+i под сердцем
              e('rect', {
                  x: '1400',
                  y: '1660',
                  width: '120',
                  height: '120',
                  rx: '60',
                  fill: '#AFABAA'
                }),
              e('text', {
                x: '1460',
                y: '1740',
                textAnchor: 'middle',
                fill: 'white',
                fontSize: '80',
                fontWeight: 'bold'
              }, this.reduceNumber(this.reduceNumber(results.h+results.i) + results.i) || ''),
              
              // (h+i)+h под долларом
              e('rect', {
                x: '1760',
                y: '1310',
                width: '120',
                height: '120',
                rx: '60',
                fill: '#AFABAA'
              }),
              e('text', {
                x: '1820',
                y: '1390',
                textAnchor: 'middle',
                fill: 'white',
                fontSize: '80',
                fontWeight: 'bold'
              }, this.reduceNumber(this.reduceNumber(results.h+results.i) + results.h) || ''),
              // Возрастные периоды
              // 20 лет (верх)
              e('text', {
                  x: '1262',
                  y: '50',
                  textAnchor: 'middle',
                  fill: 'rgb(127,83,142)',
                  fontSize: '64',
                  fontWeight: 'bold',
                  fontFamily: 'Inter'
                }, '20 лет'),
                
                // 40 лет (право)
                e('text', {
                  x: '2450',
                  y: '1180',
                  textAnchor: 'middle',
                  fill: 'rgb(127,83,142)',
                  fontSize: '64',
                  fontWeight: 'bold',
                  fontFamily: 'Inter'
                }, '40 лет'),
                
                // 60 лет (низ)
                e('text', {
                  x: '1262',
                  y: '2320',
                  textAnchor: 'middle',
                  fill: 'rgb(127,83,142)',
                  fontSize: '64',
                  fontWeight: 'bold',
                  fontFamily: 'Inter'
                }, '60 лет'),
                
                // 0 лет (лево)
                e('text', {
                  x: '80',
                  y: '1180',
                  textAnchor: 'middle',
                  fill: 'rgb(127,83,142)',
                  fontSize: '64',
                  fontWeight: 'bold',
                  fontFamily: 'Inter'
                }, '0 лет'),
                
                // Дополнительные периоды по диагоналям
                // Верхний левый угол
                e('text', {
                  x: '400',
                  y: '300',
                  textAnchor: 'middle',
                  fill: 'rgb(127,83,142)',
                  fontSize: '48',
                  fontWeight: 'bold',
                  fontFamily: 'Inter'
                }, '10 лет '),
                
                // Верхний правый угол  
                e('text', {
                  x: '2100',
                  y: '300',
                  textAnchor: 'middle',
                  fill: 'rgb(127,83,142)',
                  fontSize: '48',
                  fontWeight: 'bold',
                  fontFamily: 'Inter'
                }, '30 лет'),
                
                // Нижний правый угол
                e('text', {
                  x: '2100',
                  y: '2000',
                  textAnchor: 'middle',
                  fill: 'rgb(127,83,142)',
                  fontSize: '48',
                  fontWeight: 'bold',
                  fontFamily: 'Inter'
                }, '50 лет'),
                
                // Нижний левый угол
                e('text', {
                  x: '400',
                  y: '2000',
                  textAnchor: 'middle',
                  fill: 'rgb(127,83,142)',
                  fontSize: '48',
                  fontWeight: 'bold',
                  fontFamily: 'Inter'
                }, '70 лет'),
                e('text', {
                  x: '1480',
                  y: '580',
                  textAnchor: 'middle',
                  fill: 'rgb(127,83,142)',
                  fontSize: '64',
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                  transform: 'rotate(90 1357 518)'
                }, 'Линия неба'),
                
                // Линия Земли (горизонтальная)
                e('text', {
                  x: '730',
                  y: '1220',
                  textAnchor: 'start',
                  fill: 'rgb(127,83,142)',
                  fontSize: '64',
                  fontWeight: 'bold',
                  fontFamily: 'Inter'
                }, 'Линия земли'),

                // Сердце
                e('g', {
                  transform: 'translate(1330, 1520) scale(1)'
                  },
                  e('path', {
                    d: 'M40.425 0C18.0989 0 0 18.0777 0 40.3773C0 80.7547 47.775 117.461 73.5 126C99.225 117.461 147 80.7547 147 40.3773C147 18.0777 128.901 0 106.575 0C92.9029 0 80.8158 6.77936 73.5 17.156C66.1842 6.77936 54.0971 0 40.425 0Z',
                    fill: 'url(#heartGradient)'
                  })
                ),
                
                // Мужчина
                e('g', { transform: 'translate(1085, 830) scale(1)' },
                  e('svg', { width: '140', height: '145', viewBox: '0 0 140 145', fill: 'none' },
                    e('g', { clipPath: 'url(#maleClipPath)' },
                      e('g', { transform: 'matrix(0.1035 0.065 -0.0834478 0.132875 107 72)' },
                        e('rect', { 
                          x: '0', 
                          y: '0', 
                          width: '1144.96', 
                          height: '826.97', 
                          fill: 'url(#maleGradient)',
                          opacity: '1'
                        }),
                        e('rect', { 
                          x: '0', 
                          y: '0', 
                          width: '1144.96', 
                          height: '826.97', 
                          transform: 'scale(1 -1)',
                          fill: 'url(#maleGradient)',
                          opacity: '1'
                        }),
                        e('rect', { 
                          x: '0', 
                          y: '0', 
                          width: '1144.96', 
                          height: '826.97', 
                          transform: 'scale(-1 1)',
                          fill: 'url(#maleGradient)',
                          opacity: '1'
                        }),
                        e('rect', { 
                          x: '0', 
                          y: '0', 
                          width: '1144.96', 
                          height: '826.97', 
                          transform: 'scale(-1)',
                          fill: 'url(#maleGradient)',
                          opacity: '1'
                        })
                      )
                    ),
                    e('path', { 
                      d: 'M124 40.2025C124 44.6208 127.582 48.2025 132 48.2025C136.418 48.2025 140 44.6208 140 40.2025H132H124ZM132 8H140C140 3.58172 136.418 0 132 0V8ZM100.686 0C96.2675 0 92.6857 3.58172 92.6857 8C92.6857 12.4183 96.2675 16 100.686 16V8V0ZM22.2672 122.328L28.0026 116.751L28.0026 116.751L22.2672 122.328ZM91.1551 122.328L85.4198 116.751L85.4197 116.751L91.1551 122.328ZM91.1551 51.4856L96.8905 45.9084L96.8904 45.9084L91.1551 51.4856ZM22.2672 51.4856L16.5318 45.9084L16.5317 45.9085L22.2672 51.4856ZM84.681 45.1864C81.6008 48.354 81.6716 53.4188 84.8392 56.499C88.0068 59.5792 93.0716 59.5083 96.1518 56.3408L90.4164 50.7636L84.681 45.1864ZM130.777 20.7335C133.857 17.5659 133.786 12.5011 130.618 9.42087C127.451 6.34068 122.386 6.41153 119.306 9.57911L125.041 15.1563L130.777 20.7335ZM132 40.2025H140V8H132H124V40.2025H132ZM132 8V0H100.686V8V16H132V8ZM22.2672 122.328L16.5317 127.905C38.6958 150.698 74.7262 150.698 96.8905 127.905L91.1551 122.328L85.4197 116.751C69.5379 133.083 43.884 133.083 28.0026 116.751L22.2672 122.328ZM91.1551 122.328L96.8904 127.905C107.934 116.548 113.422 101.692 113.422 86.9068H105.422H97.4222C97.4222 97.7615 93.3989 108.545 85.4198 116.751L91.1551 122.328ZM105.422 86.9068H113.422C113.422 72.1216 107.934 57.2655 96.8905 45.9084L91.1551 51.4856L85.4197 57.0628C93.399 65.2685 97.4222 76.0521 97.4222 86.9068H105.422ZM91.1551 51.4856L96.8904 45.9084C74.7261 23.1157 38.6958 23.1156 16.5318 45.9084L22.2672 51.4856L28.0026 57.0628C43.884 40.7309 69.5379 40.7308 85.4197 57.0629L91.1551 51.4856ZM22.2672 51.4856L16.5317 45.9085C-5.51055 68.5763 -5.51062 105.238 16.5318 127.905L22.2672 122.328L28.0026 116.751C11.9992 100.293 11.9991 73.5205 28.0026 57.0628L22.2672 51.4856ZM90.4164 50.7636L96.1518 56.3408L130.777 20.7335L125.041 15.1563L119.306 9.57911L84.681 45.1864L90.4164 50.7636Z',
                      fill: 'url(#maleGradient)'
                    })
                  )
                ),

                // Женщина
                e('g', { transform: 'translate(1300, 830) scale(1)' },
                  e('svg', { width: '108', height: '166', viewBox: '0 0 108 166', fill: 'none' },
                    e('g', { clipPath: 'url(#femaleClipPath)' },
                      e('g', { transform: 'matrix(0.0416886 0.0416886 -0.042051 0.042051 53.7395 73.7394)' },
                        e('rect', { 
                          x: '0', 
                          y: '0', 
                          width: '1271.39', 
                          height: '1269.05', 
                          fill: 'url(#maleGradient)',
                          opacity: '1'
                        }),
                        e('rect', { 
                          x: '0', 
                          y: '0', 
                          width: '1271.39', 
                          height: '1269.05', 
                          transform: 'scale(1 -1)',
                          fill: 'url(#maleGradient)',
                          opacity: '1'
                        }),
                        e('rect', { 
                          x: '0', 
                          y: '0', 
                          width: '1271.39', 
                          height: '1269.05', 
                          transform: 'scale(-1 1)',
                          fill: 'url(#maleGradient)',
                          opacity: '1'
                        }),
                        e('rect', { 
                          x: '0', 
                          y: '0', 
                          width: '1271.39', 
                          height: '1269.05', 
                          transform: 'scale(-1)',
                          fill: 'url(#maleGradient)',
                          opacity: '1'
                        })
                      )
                    ),
                    e('path', { 
                      d: 'M54.0798 8.74928L54.0704 0.749284L54.0703 0.749281L54.0798 8.74928ZM8.76095 54.0681L16.7609 54.0776L16.7609 54.0776L8.76095 54.0681ZM53.9725 99.2797L53.982 107.28L53.9725 99.2797ZM61.446 99.2905C61.4512 94.8722 57.8737 91.2862 53.4555 91.281C49.0372 91.2758 45.4512 94.8533 45.446 99.2715L53.446 99.281L61.446 99.2905ZM45.3771 157.469C45.3719 161.888 48.9494 165.474 53.3677 165.479C57.786 165.484 61.3719 161.907 61.3771 157.488L53.3771 157.479L45.3771 157.469ZM82.5243 133.112C86.9426 133.107 90.52 129.521 90.5148 125.103C90.5096 120.685 86.9237 117.107 82.5054 117.112L82.5148 125.112L82.5243 133.112ZM24.307 117.181C19.8888 117.186 16.3113 120.772 16.3165 125.191C16.3217 129.609 19.9077 133.186 24.326 133.181L24.3165 125.181L24.307 117.181ZM54.0798 8.74928L54.0703 0.749281C24.6603 0.784001 0.795674 24.6486 0.760953 54.0587L8.76095 54.0681L16.7609 54.0776C16.7852 33.4893 33.5009 16.7736 54.0892 16.7493L54.0798 8.74928ZM8.76095 54.0681L0.760954 54.0586C0.743481 68.766 6.69919 82.0917 16.324 91.7166L21.9809 86.0597L27.6377 80.4028C20.8993 73.6644 16.7487 64.3697 16.7609 54.0776L8.76095 54.0681ZM21.9809 86.0597L16.324 91.7166C25.9489 101.341 39.2746 107.297 53.982 107.28L53.9725 99.2797L53.9631 91.2797C43.6709 91.2919 34.3762 87.1413 27.6377 80.4028L21.9809 86.0597ZM53.9725 99.2797L53.982 107.28C83.392 107.245 107.257 83.3803 107.291 53.9703L99.2914 53.9609L91.2914 53.9514C91.267 74.5396 74.5513 91.2553 53.9631 91.2797L53.9725 99.2797ZM99.2914 53.9609L107.291 53.9703C107.326 24.5455 83.4953 0.714646 54.0704 0.749284L54.0798 8.74928L54.0892 16.7493C74.6629 16.7251 91.3157 33.378 91.2914 53.9514L99.2914 53.9609ZM53.446 99.281L45.446 99.2715L45.3771 157.469L53.3771 157.479L61.3771 157.488L61.446 99.2905L53.446 99.281ZM82.5148 125.112L82.5054 117.112L24.307 117.181L24.3165 125.181L24.326 133.181L82.5243 133.112L82.5148 125.112Z',
                      fill: 'url(#maleGradient)'
                    })
                  )
                ),
              )
            )
        ),

        // Расчет предназначений
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
              background: 'linear-gradient(135deg, rgb(237, 224, 241), rgb(224, 202, 231))',
              padding: '20px',
              borderRadius: '15px',
              border: '2px solid #a06eb6',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }
          },
          e('h3', { style: { color: '#a06eb6', marginBottom: '15px', fontSize: '1.3rem' } }, 'Личное предназначение'),
          e('p', { style: { color: '#a06eb6', marginBottom: '15px', fontStyle: 'italic' } }, 'Задачи перед самим собой'),
          e('div', { style: { display: 'flex', justifyContent: 'space-around', marginBottom: '15px' } },
            e('div', { style: { textAlign: 'center' } },
              e('div', { style: { 
                background: 'white', 
                border: '3px solid #a06eb6', 
                borderRadius: '50%', 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#a06eb6',
                margin: '0 auto 8px'
                }},
                purposes.personal.sky),
                e('div', { style: { fontSize: '0.9rem', color: '#a06eb6' } }, 'Небо')
            ),
            e('div', { style: { textAlign: 'center' } },
              e('div', { style: { 
                background: 'white', 
                border: '3px solid #a06eb6', 
                borderRadius: '50%', 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#a06eb6',
                margin: '0 auto 8px'
              }},purposes.personal.earth),
              e('div', { style: { fontSize: '0.9rem', color: '#a06eb6' } }, 'Земля')
            )
          ),
          e('div', {
            style: {
              background: '#a06eb6',
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
          // e('div', { style: { fontSize: '1rem', color: '#1b5e20', fontWeight: 'bold' } },
          //   `${purposes.personal.sky} + ${purposes.personal.earth} = ${purposes.personal.purpose}`
          // )
        ),
        // Социальное предназначение
        e('div', {
          style: {
            background: 'linear-gradient(135deg, rgb(237, 224, 241), rgb(224, 202, 231))',
            padding: '20px',
            borderRadius: '15px',
            border: '2px solid #a06eb6',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }
        },
          e('h3', { style: { color: '#a06eb6', marginBottom: '15px', fontSize: '1.3rem' } }, 'Социальное предназначение'),
          e('p', { style: { color: '#a06eb6', marginBottom: '15px', fontStyle: 'italic' } }, 'Задачи перед родом и другими людьми'),
          e('div', { style: { display: 'flex', justifyContent: 'space-around', marginBottom: '15px' } },
            e('div', { style: { textAlign: 'center' } },
              e('div', { style: { 
                background: 'white', 
                border: '3px solid #a06eb6', 
                borderRadius: '50%', 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#a06eb6',
                margin: '0 auto 8px'
                }},
                purposes.social.male),
                e('div', { style: { fontSize: '0.9rem', color: '#a06eb6' } }, 'М')
              ),
              e('div', { style: { textAlign: 'center' } },
                e('div', { style: { 
                  background: 'white', 
                  border: '3px solid #a06eb6', 
                  borderRadius: '50%', 
                  width: '60px', 
                  height: '60px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#a06eb6',
                  margin: '0 auto 8px'
                }},
                purposes.social.female),
                e('div', { style: { fontSize: '0.9rem', color: '#a06eb6' } }, 'Ж')
              )
            ),
            e('div', {
              style: {
                background: '#a06eb6',
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
          // e('div', { style: { fontSize: '1rem', color: '#a06eb6', fontWeight: 'bold' } },
          //   `${purposes.social.male} + ${purposes.social.female} = ${purposes.social.purpose}`
          // )
        ),
        // Духовное предназначение
        e('div', {
          style: {
            background: 'linear-gradient(135deg, rgb(237, 224, 241), rgb(224, 202, 231))',
              padding: '20px',
              borderRadius: '15px',
              border: '2px solid #a06eb6',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
          }
        },
          e('h3', { style: { color: '#a06eb6', marginBottom: '15px', fontSize: '1.3rem' } }, 'Духовное предназначение'),
          e('p', { style: { color: '#a06eb6', marginBottom: '15px', fontStyle: 'italic' } }, 'Задача Души'),
          e('div', {
            style: {
              background: '#a06eb6',
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
          // e('div', {
          //   style: {
          //     fontSize: '0.9rem',
          //     color: '#880e4f',
          //     fontWeight: 'bold',
          //     backgroundColor: 'rgba(255,255,255,0.7)',
          //     padding: '8px',
          //     borderRadius: '8px',
          //     border: '1px solid #e91e63'
          //   }
          // }, `${purposes.spiritual.formula} = ${purposes.spiritual.purpose}`)
        ),

        // Планетарное предназначение
        e('div', {
          style: {
            background: 'linear-gradient(135deg, rgb(237, 224, 241), rgb(224, 202, 231))',
            padding: '20px',
            borderRadius: '15px',
            border: '2px solid #a06eb6',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }},
          e('h3', { style: { color: '#a06eb6', marginBottom: '15px', fontSize: '1.3rem' } }, 'Планетарное предназначение'),
          e('p', { style: { color: '#a06eb6', marginBottom: '15px', fontStyle: 'italic' } }, 'Задача перед миром'),
          e('div', {
            style: {
              background: '#a06eb6',
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
            }}, purposes.planetary.purpose),
            // e('div', {
            //   style: {
            //   fontSize: '0.8rem',
            //   color: '#bf360c',
            //   fontWeight: 'bold',
            //   backgroundColor: 'rgba(255,255,255,0.7)',
            //   padding: '8px',
            //   borderRadius: '8px',
            //   border: '1px solid #ff9800'
            // }}, `${purposes.planetary.formula} = ${purposes.planetary.purpose}`)
            )
          )
        ),

        // Таблица чакр
        chakras && e('div', { className: 'results-section' },
          e('h2', null, 'Карта здоровья'),
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
                e('tr', { style: { backgroundColor: 'rgb(224, 202, 231)' } },
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
                e('tr', { style: { background: 'rgb(224, 202, 231)', borderTop: '3px solid rgb(127,83,142)' } },
                  e('td', { style: { padding: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' } }, chakras.totals.energy),
                  e('td', { style: { padding: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' } }, chakras.totals.physics),
                  e('td', { style: { padding: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' } }, chakras.totals.emotions),
                  e('td', { style: { padding: '15px', textAlign: 'left', fontWeight: 'bold', fontSize: '1.2rem' } }, 'ИТОГО')
                )
              )
            )
          )
        ),

        

        // Найденные родовые программы
        programs.length > 0 && e('div', { className: 'results-section' },
            e('h2', null, 'Кармические программы'),
            e('div', { style: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' } },
              programs.map((program, index) =>
                e('div', {
                  key: index,
                  style: {
                    background: 'linear-gradient(135deg, rgb(237, 224, 241),rgb(224, 202, 231))',
                    padding: '15px',
                    borderRadius: '10px',
                    border: '1px solid rgb(204, 145, 224)',
                    boxShadow: '0 2px 10px rgba(127,83,142, 0.3)',
                  },
                  className: 'scale-on-hover'
                },
                  e('div', {
                    style: {
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      color: 'rgb(127,83,142)',
                      marginBottom: '5px'
                    }
                  }, `${program.name}`),
                  e('div', {
                    style: {
                      fontSize: '0.9rem',
                      color: 'rgb(127,83,142)',
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
        // Расчет благой кармы и точек роста
        karma && this.getUserLogin() && e('div', { className: 'results-section' },
          e('h2', null, 'Жизненные циклы'),
          
          // // Информация о специальных значениях
          // (karma.specialValues.a2 || karma.specialValues.c2) && e('div', {
          //   style: {
          //     backgroundColor: '#f0f8ff',
          //     border: '2px solid #4682b4',
          //     borderRadius: '10px',
          //     padding: '15px',
          //     marginTop: '15px',
          //     marginBottom: '20px'
          //   }
          // },
          //   e('h4', { style: { color: '#2c3e50', marginBottom: '10px' } }, 'Специальные условия:'),
          //   karma.specialValues.a2 && e('p', {
          //     style: { color: 'rgb(127,83,142)', margin: '5px 0' }
          //   }, `• a2 = ${karma.specialValues.a2} (день рождения ${karma.originalDay} ≥ 23)`),
          //   karma.specialValues.c2 && e('p', {
          //     style: { color: 'rgb(127,83,142)', margin: '5px 0' }
          //   }, `• c2 = ${karma.specialValues.c2} (сумма цифр года ${karma.originalYearSum} больше 22)`)
          // ),

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
                minWidth: '300px'
              }
            },
              e('thead', null,
                e('tr', { style: { backgroundColor: 'rgb(127,83,142)', color: 'white' } },
                  e('th', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold', minwidth:'120px' } }, 'Циклы'),
                  e('th', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold' } }, results ? 'до ' + (36 - this.reduceNumber(results.originalDaySum + results.originalMonthSum + results.originalYearSum)).toString() : ''),
                  e('th', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold' } }, results ? 46 - this.reduceNumber(results.originalDaySum + results.originalMonthSum + results.originalYearSum) : ''),
                  e('th', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold' } }, results ? 56 - this.reduceNumber(results.originalDaySum + results.originalMonthSum + results.originalYearSum) : ''),
                  e('th', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold', } }, results ? (56 + 1 - this.reduceNumber(results.originalDaySum + results.originalMonthSum + results.originalYearSum)).toString() + '+' : '')
                )
              ),
              e('tbody', null,
                // Благая карма 1
                karma.goodKarma.map((value, index) => 
                  e('tr', { style: { background: 'linear-gradient(135deg, rgb(237, 224, 241), rgb(224, 202, 231))' } },
                    e('td', { style: { padding: '10px', fontWeight: 'bold', color: '#7f538e' } }, 'Благая карма ' + (index + 1).toString()),
                    e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, value.col1),
                    e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, value.col2),
                    e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, value.col3),
                    e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, value.col4)
                  )
                ),

                

                // Разделитель
                e('tr', { style: { backgroundColor: '#7f538e' } },
                  e('td', { colSpan: 6, style: { padding: '2px' } })
                ),

                // Точка роста
                karma.growthPoints.map((value, index)=>
                  e('tr', { style: { background: 'linear-gradient(135deg, rgb(237, 224, 241), rgb(224, 202, 231))' } },
                    e('td', { style: { padding: '10px', fontWeight: 'bold', color: '#7f538e' } }, 'Точка роста ' + (index+1).toString()),
                    e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, value.col1),
                    e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, value.col2),
                    e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, value.col3),
                    e('td', { style: { padding: '10px', textAlign: 'center', fontWeight: 'bold' } }, value.col4)
                  )
                )
              )
            )
          )
        ),
    ),

    


    );
  }

  // Функция получения логина пользователя из localStorage
  getUserLogin() {
    // Сначала проверяем основные ключи
    let login = localStorage.getItem('userLogin') || localStorage.getItem('login');
    
    // Проверяем Tilda Members профиль (основной источник)
    if (!login) {
      // Ищем ключи профиля Tilda Members (формат: tilda_members_profile{projectid})
      for (let key in localStorage) {
        if (key.startsWith('tilda_members_profile') && !key.endsWith('_timestamp')) {
          try {
            const profileData = JSON.parse(localStorage.getItem(key));
            if (profileData && profileData.login) {
              login = profileData.login;
              break;
            }
          } catch (e) {
            console.log('Ошибка парсинга профиля Tilda:', e);
          }
        }
      }
    }
    
    // Альтернативная проверка старых ключей авторизации
    if (!login) {
      const tildaAuth = localStorage.getItem('tilda_members_auth');
      if (tildaAuth) {
        try {
          const authData = JSON.parse(tildaAuth);
          login = authData.email || authData.login;
        } catch (e) {
          console.log('Ошибка парсинга данных авторизации');
        }
      }
    }
    
    return login;
  }

  // Функция получения данных из URL
  getDataFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    
    if (encodedData) {
      try {
        const decodedData = decodeURIComponent(encodedData);
        return decodedData;
      } catch (error) {
        console.warn('Ошибка при декодировании данных из URL:', error);
        return null;
      }
    }
    return null;
  }

  // Функция сохранения расчета на backend
  async saveCalculation() {
    // Проверяем наличие результатов
    if (!this.state.results) {
      alert('Сначала необходимо выполнить расчет');
      return;
    }

    // Получаем логин пользователя
    const userLogin = this.getUserLogin();
    if (!userLogin) {
      alert('Необходимо войти в систему для сохранения расчета');
      return;
    }

    // Получаем данные из URL
    const calculationData = this.getDataFromURL();
    if (!calculationData) {
      alert('Данные расчета не найдены в URL');
      return;
    }

    try {
      const response = await fetch('https://api.alkhimiyadushi.ru/api/calculs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: userLogin,
          data: calculationData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      this.showNotification(`Расчет успешно сохранен! ID: ${result.id}`);
      console.log('Расчет сохранен:', result);
      
    } catch (error) {
      console.error('Ошибка при сохранении расчета:', error);
      alert('Ошибка при сохранении расчета. Проверьте подключение к серверу.');
    }
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