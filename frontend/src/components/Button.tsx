import React from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  text: string
  disabled?: boolean
}

function Button({
  type = 'button',
  className = '',
  onClick,
  text,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;