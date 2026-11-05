export interface MascotMessage {
  id: string;
  text: string;
  type: 'success' | 'hint' | 'error';
}

export const mascotMessages: MascotMessage[] = [
  {
    id: 'success',
    text: 'Отлично! Ты молодец!',
    type: 'success',
  },
  {
    id: 'hint',
    text: 'Подсказка: попробуй посчитать по-другому',
    type: 'hint',
  },
  {
    id: 'error',
    text: 'Ой, что-то пошло не так...',
    type: 'error',
  },
];