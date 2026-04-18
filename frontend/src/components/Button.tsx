function Button({ type = 'button', className = '', onclick, text, disabled = false }) {
  return (
    <button 
      type={type} 
      className={`button ${className}`}
      onClick={onclick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;