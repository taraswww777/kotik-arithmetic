// Реплики для маскота-котика
// Хранятся отдельно от логики, чтобы легко менять контент

export interface MascotMessage {
  id: string; // уникальный ID для отслеживания показанных сообщений
  text: string;
  type: 'success' | 'hint' | 'error'; // тип сообщения
  trigger?: 'correct_answer' | 'wrong_answer' | 'stuck'; // триггер (опционально)
}

export const mascotMessages: MascotMessage[] = [
  // === ПОХВАЛА за правильное решение ===
  { id: 'good_1', text: 'Молодец! Правильно!', type: 'success' },
  { id: 'good_2', text: 'Отлично! Ты супер!', type: 'success' },
  { id: 'good_3', text: 'Правильно! Продолжай так!', type: 'success' },
  { id: 'good_4', text: 'Классно! Ты молодец!', type: 'success' },
  { id: 'good_5', text: 'Верно! Так держать!', type: 'success' },

  // === ПОДСКАЗКИ (текстовые) ===
  { 
    id: 'hint_1', 
    text: 'Попробуй вспомнить таблицу умножения...', 
    type: 'hint',
    trigger: 'stuck'
  },
  { 
    id: 'hint_2', 
    text: 'Подсказка: результат больше первого числа', 
    type: 'hint',
    trigger: 'stuck'
  },
  { 
    id: 'hint_3', 
    text: 'Подсказка: результат меньше первого числа', 
    type: 'hint',
    trigger: 'stuck'
  },
  { 
    id: 'hint_4', 
    text: 'Вспомни, какие два числа дают этот ответ', 
    type: 'hint',
    trigger: 'stuck'
  },
  { 
    id: 'hint_5', 
    text: 'Попробуй поменьше умножать', 
    type: 'hint',
    trigger: 'stuck'
  },

  // === ОШИБКА с объяснением ===
  { id: 'error_1', text: 'Ой-ой! Что-то не так...', type: 'error' },
  { id: 'error_2', text: 'Проверь ещё раз вычисления', type: 'error' },
  { id: 'error_3', text: 'Может, стоит пересчитать?', type: 'error' },
  { id: 'error_4', text: 'Не переживай, попробуй ещё!', type: 'error' },
];

// Экспортируем только сообщения для конкретного типа
export const successMessages = mascotMessages.filter(m => m.type === 'success');
export const hintMessages = mascotMessages.filter(m => m.type === 'hint');
export const errorMessages = mascotMessages.filter(m => m.type === 'error');