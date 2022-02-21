// Ограничивает вызов функции частотой раз в Х (миллисекунд), переданной в аргументе
function throttleInput(callback: Function, args: any[], wait: number) {
  // Стоит ли функция на паузе
  let isPaused: boolean = false;

  return function wrapper() {
    // Если на паузе
    if (isPaused) {
      // Выходим из функции
      return;
    }

    // При вызове врапер поставится на паузу
    isPaused = true;

    // Вызвали коллбэк
    callback(...args);

    setTimeout(() => {
      // Сняли с паузы враппер по наступлению таймера
      isPaused = false;
    }, wait);
  };
}

export default throttleInput;
