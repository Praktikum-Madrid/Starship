// Ограничивает вызов функции частотой раз в Х (миллисекунд), переданной в аргументе
function throttleEvent(wait: number) {
  // Стоит ли функция на паузе
  let isPaused: boolean = false;

  return function wrapper(callback: Function, arg?: any) {
    // console.log('Нажато');
    // console.log(isPaused);
    // Если на паузе
    if (isPaused) {
      // console.log('На паузе');
      // Выходим из функции
    } else {
      // При вызове врапер поставится на паузу
      isPaused = true;

      // Вызвали коллбэк
      if (arg) {
        callback(arg);
      } else {
        callback();
      }
      // console.log('Запущено');

      setTimeout(() => {
        // Сняли с паузы враппер по наступлению таймера
        isPaused = false;
        // console.log('Снято с паузы');
      }, wait);
    }
  };
}

export default throttleEvent;
