export const loginValidator: RegExp = /^(?!^\\d+$)[a-zA-Z\\d\\-_]{4,20}$/; // Буквы цифры подчеркивания дефисы
export const passwordValidator: RegExp = /^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$/; // Буквы цифры спецсимволы
export const nameValidator: RegExp = /^[A-ZА-ЯЁ]+[a-zа-яё\-]+$/; // Буквы дефисы
export const phoneValidator: RegExp = /^\\+?[0-9]{10,15}/; // Цифры и может начинаться с плюса
