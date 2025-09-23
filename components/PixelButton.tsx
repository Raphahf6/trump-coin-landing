// components/PixelButton.tsx
import React from 'react';

// O botão aceita qualquer propriedade de um botão HTML padrão
// e também 'children' para o texto/ícone dentro dele.
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const PixelButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`
        bg-brand-gold text-white font-pixel uppercase
        px-6 py-3 border-2 border-brand-dark
        shadow-pixel hover:shadow-pixel-hover
        transition-all duration-150
        active:translate-x-1 active:translate-y-1 active:shadow-none
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelButton;