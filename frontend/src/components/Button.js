function Button({ type = 'button', className = '', onClick, text, disabled = false }) {
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