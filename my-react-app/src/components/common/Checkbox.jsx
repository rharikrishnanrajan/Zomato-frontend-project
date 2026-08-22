import React from 'react';
import { Check } from 'lucide-react';

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={`w-5 h-5 border-2 rounded transition-all ${
            checked
              ? 'bg-zomato-red border-zomato-red'
              : 'bg-white border-gray-300 hover:border-gray-400'
          }`}
        >
          {checked && (
            <Check className="w-4 h-4 text-white absolute top-0 left-0" strokeWidth={3} />
          )}
        </div>
      </div>
      {label && <span className="text-gray-700 select-none">{label}</span>}
    </label>
  );
};

export default Checkbox;
