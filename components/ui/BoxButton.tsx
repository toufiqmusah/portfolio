
import React from 'react';

interface BoxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  variant?: 'primary' | 'secondary';
}

export const BoxButton: React.FC<BoxButtonProps> = ({ 
  children, 
  isActive = false, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const baseStyles = "uppercase font-bold tracking-wider border-2 border-white transition-all duration-200 px-6 py-3 text-sm md:text-base";
  
  const variants = {
    primary: isActive 
      ? "bg-white text-black shadow-none translate-y-[2px] translate-x-[2px]" 
      : "bg-black text-white hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]",
    secondary: "bg-transparent text-white border-white hover:bg-white hover:text-black"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
