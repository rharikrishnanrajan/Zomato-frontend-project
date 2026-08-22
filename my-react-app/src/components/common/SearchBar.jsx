import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  onClear,
  suggestions = [],
  onSuggestionClick,
  loading = false,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setShowSuggestions(isFocused && suggestions.length > 0);
  }, [isFocused, suggestions]);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
    setShowSuggestions(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={searchRef}>
      <div className={`relative flex items-center ${isFocused ? 'ring-2 ring-zomato-red' : ''} rounded-lg transition-all`}>
        <Search className="absolute left-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none"
          aria-label="Search"
          {...props}
        />
        {loading && (
          <div className="absolute right-3">
            <div className="w-5 h-5 border-2 border-zomato-red border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {value && !loading && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {showSuggestions && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-zomato-lg border border-gray-200 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0"
              role="button"
              tabIndex={0}
            >
              {typeof suggestion === 'string' ? (
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{suggestion}</span>
                </div>
              ) : (
                suggestion
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
