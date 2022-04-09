import React from 'react';
import renderer from 'react-test-renderer';
import Blockquote from 'components/Blockquote/Blockquote';
import {render, screen} from '@testing-library/react';


it('Снэпшот соответствует ожидаемому', () => {
  const app = renderer.create(<Blockquote text='Test'/>).toJSON();

  // Сравниваем со снэпшотом
  expect(app).toMatchSnapshot();
})

// Тест с использованием REACT TEST LIBRARY
describe('Пропсы передаются корректно', () => {
  test('renders button', () => {
    render(<Blockquote text='Test'/>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  })
})
