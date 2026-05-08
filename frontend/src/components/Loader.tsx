import React from 'react';

type LoaderProps = {
  className?: string
  size?: number
}

function Loader({ className = '', size = 48 }: LoaderProps) {
  return (
    <div className={`loader ${className}`} style={{ width: size, height: size }}>
      <svg
        className="loader__icon"
        viewBox="0 0 50 50"
        style={{ width: size, height: size }}
      >
        <circle
          className="loader__path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="loader__arrow"
          d="M25 5 L25 15 M25 15 L30 10 M25 15 L20 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default Loader;