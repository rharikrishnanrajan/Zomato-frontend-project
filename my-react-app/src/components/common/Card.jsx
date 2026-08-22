import React from 'react';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-zomato',
    outlined: 'bg-white border-2 border-gray-300',
    flat: 'bg-gray-50',
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const hoverEffect = hover ? 'hover:shadow-zomato-lg hover:-translate-y-1 cursor-pointer' : '';
  const clickable = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`
        rounded-lg transition-all duration-200
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverEffect}
        ${clickable}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick(e);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
