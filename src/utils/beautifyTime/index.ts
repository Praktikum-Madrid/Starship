// Преобразуем дату в человеко-понятный формат
export default function beautifyTime(timeValue: any) {
  const date: Date = new Date(timeValue);
  const dateNow: Date = new Date();

  // Добавили для типизации плюсы к переменным
  const daysPassed: number = Math.round((+dateNow - +date) / (1000 * 60 * 60 * 24));
  if (daysPassed === 1) {
    return `Вчера в ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } if (daysPassed === 2) {
    return `Позавчера в ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } if (daysPassed) {
    return date.toLocaleTimeString([], { day: 'numeric', month: 'long' });
  }

  // Если меньше суток, то время
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
