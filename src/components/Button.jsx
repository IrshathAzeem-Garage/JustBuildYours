import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-luxury focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-text focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none group";
  
  const variants = {
    primary: "bg-primary-text text-white hover:bg-neutral-800 active:scale-[0.99] border border-transparent shadow-sm",
    secondary: "bg-white text-primary-text hover:bg-neutral-50 border border-border-custom hover:border-primary-text active:scale-[0.99] shadow-subtle",
    outline: "bg-transparent text-primary-text border border-border-custom hover:border-primary-text active:scale-[0.99]",
    ghost: "bg-transparent text-primary-text hover:bg-black/5 active:scale-[0.99]",
    subtle: "bg-[#EFECE6] text-primary-text hover:bg-[#E5E2DC] active:scale-[0.99]",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 rounded-full gap-1.5 tracking-tight",
    md: "text-sm px-5 py-2.5 rounded-full gap-2 tracking-tight",
    lg: "text-base px-6 py-3.5 rounded-full gap-2.5 font-medium tracking-tight",
  };

  const classes = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
