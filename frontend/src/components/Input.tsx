import React, { useState } from 'react';

type InputProps = {
  type?: string
  max?: number
  min?: number
  placeholder?: string
  id?: string
  className?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  required?: boolean
  pattern?: string
}

function Input({
  type = 'text',
  max,
  min,
  placeholder,
  id,
  className,
  value,
  onChange,
  required,
  pattern,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const typeShown =
    type === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : type;

  if (type === 'password') {
    return (
      <div className="input-container">
        <input
          className={`input ${className || ''}`}
          id={id}
          type={typeShown}
          placeholder={placeholder}
          maxLength={max}
          minLength={min}
          value={value}
          onChange={onChange}
          required={required}
          pattern={pattern}
        />
        <button
          type="button"
          className="button-eye"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          𓁹
        </button>
      </div>
    );
  }

  return (
    <input
      className={`input ${className || ''}`}
      id={id}
      type={type}
      placeholder={placeholder}
      maxLength={max}
      minLength={min}
      value={value}
      onChange={onChange}
      required={required}
      pattern={pattern}
    />
  );
}

export default Input;