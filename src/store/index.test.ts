import { configureStore } from './index'

describe('Проверяем работу стора', () => {
  const testData = { isLogined: true, signInError: 'test' }
  const { store } = configureStore({
    auth: testData
  });

  test('Создание стора выполнено корректно', () => {
    expect(store.toString()).toBe('[object Object]')
  })

  test('Диспетчер возвращается корректно', () => {
    expect(typeof store.dispatch).toBe('function')
  })

  test('Данные записываются и считываются корректно', () => {
    expect(store.getState().auth).toEqual(testData)
  })

})
