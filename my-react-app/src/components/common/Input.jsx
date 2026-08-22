import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon,
  rightIcon,
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-2 border rounded-lg transition-colors
            ${icon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-zomato-red'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            focus:outline-none focus:ring-2 focus:border-transparent
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
