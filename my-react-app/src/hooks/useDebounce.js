import { useState, useEffect } from 'react';

// Basic debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Debounced callback hook
export const useDebouncedCallback = (callback, delay, dependencies = []) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies, delay]);
};

// Debounced search hook
export const useDebouncedSearch = (searchFunction, delay = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchFunction(debouncedSearchTerm)
        .then((searchResults) => {
          setResults(searchResults);
          setIsSearching(false);
        })
        .catch(() => {
          setResults([]);
          setIsSearching(false);
        });
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm, searchFunction]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    isSearching,
    debouncedSearchTerm,
  };
};

export default useDebounce;