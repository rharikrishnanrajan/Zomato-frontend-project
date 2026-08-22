import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({
  trigger,
  children,
  align = 'left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 bg-white rounded-lg shadow-zomato-lg border border-gray-200 py-2 min-w-[200px] ${alignmentClasses[align]}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({
  children,
  onClick,
  icon,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      {icon && <span className="text-gray-500">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export const DropdownDivider = () => {
  return <hr className="my-1 border-gray-200" />;
};

export default Dropdown;
