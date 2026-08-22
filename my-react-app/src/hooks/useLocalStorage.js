import { useState, useEffect, useCallback } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};

// Specialized hooks for common use cases
export const useRecentSearches = (maxItems = 10) => {
  const [searches, setSearches, removeSearches] = useLocalStorage('zomato-recent-searches', []);

  const addSearch = useCallback((searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') return;
    
    setSearches(prev => {
      const filtered = prev.filter(item => item !== searchTerm);
      return [searchTerm, ...filtered].slice(0, maxItems);
    });
  }, [setSearches, maxItems]);

  const removeSearch = useCallback((searchTerm) => {
    setSearches(prev => prev.filter(item => item !== searchTerm));
  }, [setSearches]);

  return {
    searches,
    addSearch,
    removeSearch,
    clearSearches: removeSearches,
  };
};

export const useViewedRestaurants = (maxItems = 20) => {
  const [viewedRestaurants, setViewedRestaurants, removeViewedRestaurants] = useLocalStorage('zomato-viewed-restaurants', []);

  const addViewedRestaurant = useCallback((restaurant) => {
    setViewedRestaurants(prev => {
      const filtered = prev.filter(item => item.id !== restaurant.id);
      const restaurantData = {
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.image,
        rating: restaurant.rating,
        locality: restaurant.locality,
        city: restaurant.city,
        viewedAt: new Date().toISOString(),
      };
      return [restaurantData, ...filtered].slice(0, maxItems);
    });
  }, [setViewedRestaurants, maxItems]);

  return {
    viewedRestaurants,
    addViewedRestaurant,
    clearViewedRestaurants: removeViewedRestaurants,
  };
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('zomato-user-preferences', {
    theme: 'light',
    language: 'en',
    currency: 'INR',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    dietary: null,
    defaultLocation: null,
  });

  const updatePreference = useCallback((key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  }, [setPreferences]);

  const updateNestedPreference = useCallback((parentKey, childKey, value) => {
    setPreferences(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value,
      },
    }));
  }, [setPreferences]);

  return {
    preferences,
    updatePreference,
    updateNestedPreference,
    setPreferences,
  };
};

export const useCartPersistence = () => {
  const [cartData, setCartData] = useLocalStorage('zomato-cart', {
    items: [],
    restaurantId: null,
    lastUpdated: null,
  });

  const updateCart = useCallback((items, restaurantId) => {
    setCartData({
      items,
      restaurantId,
      lastUpdated: new Date().toISOString(),
    });
  }, [setCartData]);

  const clearCart = useCallback(() => {
    setCartData({
      items: [],
      restaurantId: null,
      lastUpdated: null,
    });
  }, [setCartData]);

  // Check if cart is stale (older than 24 hours)
  const isCartStale = useCallback(() => {
    if (!cartData.lastUpdated) return false;
    const lastUpdated = new Date(cartData.lastUpdated);
    const now = new Date();
    const diffHours = (now - lastUpdated) / (1000 * 60 * 60);
    return diffHours > 24;
  }, [cartData.lastUpdated]);

  return {
    cartData,
    updateCart,
    clearCart,
    isCartStale,
  };
};

export default useLocalStorage;