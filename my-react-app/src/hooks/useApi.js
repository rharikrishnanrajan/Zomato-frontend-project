import { useState, useCallback } from 'react';
import { 
  restaurants, 
  getRestaurantById, 
  getRestaurantBySlug, 
  getRestaurantsByCity,
  getRestaurantsByLocality,
  getMenuByRestaurantId,
  getReviewsByRestaurantId,
  searchRestaurants,
  filterRestaurants,
  sortRestaurants,
  collections,
  popularLocalities,
  cuisines,
  cities,
  offers,
  coupons
} from '../data';

// Simulate API delay
const simulateDelay = (min = 500, max = 1500) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Generic API hook
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate network delay
      await simulateDelay();
      
      const result = await apiCall();
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
};

// Restaurants API
export const useRestaurantsApi = () => {
  const { execute, loading, error } = useApi();

  const getAllRestaurants = useCallback(() => {
    return execute(() => Promise.resolve(restaurants));
  }, [execute]);

  const getRestaurant = useCallback((id) => {
    return execute(() => {
      const restaurant = getRestaurantById(id);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      return Promise.resolve(restaurant);
    });
  }, [execute]);

  const getRestaurantBySlugApi = useCallback((slug) => {
    return execute(() => {
      const restaurant = getRestaurantBySlug(slug);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      return Promise.resolve(restaurant);
    });
  }, [execute]);

  const getRestaurantsByLocation = useCallback((city, locality = null) => {
    return execute(() => {
      let results = getRestaurantsByCity(city);
      if (locality) {
        results = getRestaurantsByLocality(locality);
      }
      return Promise.resolve(results);
    });
  }, [execute]);

  const searchRestaurantsApi = useCallback((query, filters = {}, sortBy = 'popularity') => {
    return execute(() => {
      let results = [];
      
      if (query) {
        results = searchRestaurants(query);
      } else {
        results = [...restaurants];
      }

      // Apply filters
      if (Object.keys(filters).length > 0) {
        results = filterRestaurants(filters);
      }

      // Apply sorting
      results = sortRestaurants(results, sortBy);

      return Promise.resolve(results);
    });
  }, [execute]);

  return {
    getAllRestaurants,
    getRestaurant,
    getRestaurantBySlug: getRestaurantBySlugApi,
    getRestaurantsByLocation,
    searchRestaurants: searchRestaurantsApi,
    loading,
    error,
  };
};

// Menu API
export const useMenuApi = () => {
  const { execute, loading, error } = useApi();

  const getMenu = useCallback((restaurantId) => {
    return execute(() => {
      const menu = getMenuByRestaurantId(restaurantId);
      return Promise.resolve(menu);
    });
  }, [execute]);

  const getReviews = useCallback((restaurantId) => {
    return execute(() => {
      const reviews = getReviewsByRestaurantId(restaurantId);
      return Promise.resolve(reviews);
    });
  }, [execute]);

  return {
    getMenu,
    getReviews,
    loading,
    error,
  };
};

// Collections API
export const useCollectionsApi = () => {
  const { execute, loading, error } = useApi();

  const getCollections = useCallback(() => {
    return execute(() => Promise.resolve(collections));
  }, [execute]);

  const getPopularLocalities = useCallback(() => {
    return execute(() => Promise.resolve(popularLocalities));
  }, [execute]);

  return {
    getCollections,
    getPopularLocalities,
    loading,
    error,
  };
};

// Location API
export const useLocationApi = () => {
  const { execute, loading, error } = useApi();

  const getCities = useCallback(() => {
    return execute(() => Promise.resolve(cities));
  }, [execute]);

  const getCuisines = useCallback(() => {
    return execute(() => Promise.resolve(cuisines));
  }, [execute]);

  return {
    getCities,
    getCuisines,
    loading,
    error,
  };
};

// Offers API
export const useOffersApi = () => {
  const { execute, loading, error } = useApi();

  const getOffers = useCallback(() => {
    return execute(() => Promise.resolve(offers));
  }, [execute]);

  const getCoupons = useCallback(() => {
    return execute(() => Promise.resolve(coupons));
  }, [execute]);

  const validateCoupon = useCallback((code, orderValue) => {
    return execute(() => {
      const coupon = coupons.find(c => c.code === code);
      
      if (!coupon) {
        throw new Error('Invalid coupon code');
      }

      if (orderValue < coupon.minOrder) {
        throw new Error(`Minimum order value should be ₹${coupon.minOrder}`);
      }

      return Promise.resolve(coupon);
    });
  }, [execute]);

  return {
    getOffers,
    getCoupons,
    validateCoupon,
    loading,
    error,
  };
};

// Search suggestions API
export const useSearchSuggestionsApi = () => {
  const { execute, loading, error } = useApi();

  const getSuggestions = useCallback((query) => {
    return execute(() => {
      if (!query || query.length < 2) {
        return Promise.resolve([]);
      }

      const restaurantSuggestions = restaurants
        .filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
        .map(r => ({
          type: 'restaurant',
          id: r.id,
          name: r.name,
          subtitle: `${r.locality}, ${r.city}`,
        }));

      const cuisineSuggestions = cuisines
        .filter(c => c.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3)
        .map(c => ({
          type: 'cuisine',
          name: c,
          subtitle: 'Cuisine',
        }));

      const citySuggestions = cities
        .filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 2)
        .map(c => ({
          type: 'city',
          name: c.name,
          subtitle: 'City',
        }));

      return Promise.resolve([
        ...restaurantSuggestions,
        ...cuisineSuggestions,
        ...citySuggestions,
      ]);
    });
  }, [execute]);

  return {
    getSuggestions,
    loading,
    error,
  };
};

export default useApi;