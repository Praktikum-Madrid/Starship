import React, { useState } from 'react';

import './App.css';
import InputField from '../Input/Input';

export default function App() {
  const [value, setValue] = useState('');
  // пример юзания инпута, можно удалить
  console.log('App');
  return (
    <div>
      <h1>Starship App!</h1>
      <InputField
        label="Поле ввода"
        onChange={(e) => setValue(e.target.value)}
        helperText={value ? '' : 'Введите что-нибудь'}
        name="example"
      />
    </div>
  );
}
