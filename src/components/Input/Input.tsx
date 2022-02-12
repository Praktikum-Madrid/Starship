import React, { ChangeEventHandler } from 'react';
import './Input.css';

interface IInputProps {
  name?: string,
  id?: string,
  label?: string,
  type?: string,
  helperText?: string,
  placeholder?: string,
  value?: string,
  disabled?: boolean,
  multiline?: boolean,
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  style?: any
}

const TextArea = (
  {
    name,
    style,
    onChange,
    value,
    disabled,
  }: IInputProps,
) => (
  <textarea
    name={name}
    className="input-component__textarea"
    value={value}
    style={style}
    onChange={onChange}
    disabled={disabled}
  >
    {value}
  </textarea>
);

const Input = (
  {
    name,
    style,
    onChange,
    value,
    id,
    type = 'text',
    disabled = false,
    placeholder,
  }: IInputProps,
) => (
  <input
    autoComplete="off"
    className="input-component__input"
    type={type}
    name={name}
    value={value}
    id={id}
    style={style}
    placeholder={placeholder}
    disabled={disabled}
    onChange={onChange}
  />
);

const InputField = (
  {
    multiline,
    label,
    helperText,
    name,
    ...props
  }: IInputProps,
) => (
  <div className="input-component">
    {label && <label className="input-component__label" htmlFor={name}>{label}</label>}
    {multiline
      ? <TextArea name={name} {...props}/>
      : <Input name={name} {...props}/>}
    {helperText && <div className="input-component__helper-text">{helperText}</div>}
  </div>
);

export default InputField;
