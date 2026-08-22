export { cuisines, dietaryPreferences } from './cuisines';
export { cities, popularLocalities } from './cities';
export { restaurants } from './restaurants';
export { menuData, reviewsData } from './menuItems';
export { collections, offers, coupons } from './collections';

// Helper functions to work with mock data
export const getRestaurantById = (id) => {
  return restaurants.find(r => r.id === parseInt(id));
};

export const getRestaurantBySlug = (slug) => {
  return restaurants.find(r => r.slug === slug);
};

export const getRestaurantsByCity = (city) => {
  return restaurants.filter(r => r.city === city);
};

export const getRestaurantsByLocality = (locality) => {
  return restaurants.filter(r => r.locality === locality);
};

export const getMenuByRestaurantId = (id) => {
  return menuData[id] || { categories: [] };
};

export const getReviewsByRestaurantId = (id) => {
  return reviewsData[id] || [];
};

export const searchRestaurants = (query) => {
  const lowerQuery = query.toLowerCase();
  return restaurants.filter(r => 
    r.name.toLowerCase().includes(lowerQuery) ||
    r.cuisines.some(c => c.toLowerCase().includes(lowerQuery)) ||
    r.locality.toLowerCase().includes(lowerQuery) ||
    r.city.toLowerCase().includes(lowerQuery)
  );
};

export const filterRestaurants = (filters) => {
  return restaurants.filter(restaurant => {
    // Filter by cuisines
    if (filters.cuisines && filters.cuisines.length > 0) {
      const hasCuisine = filters.cuisines.some(cuisine => 
        restaurant.cuisines.includes(cuisine)
      );
      if (!hasCuisine) return false;
    }

    // Filter by rating
    if (filters.rating && restaurant.rating < filters.rating) {
      return false;
    }

    // Filter by cost
    if (filters.costForTwo) {
      if (filters.costForTwo.min && restaurant.costForTwo < filters.costForTwo.min) {
        return false;
      }
      if (filters.costForTwo.max && restaurant.costForTwo > filters.costForTwo.max) {
        return false;
      }
    }

    // Filter by dietary preference
    if (filters.dietary === 'veg' && !restaurant.isPureVeg) {
      return false;
    }

    // Filter by city
    if (filters.city && restaurant.city !== filters.city) {
      return false;
    }

    // Filter by locality
    if (filters.locality && restaurant.locality !== filters.locality) {
      return false;
    }

    return true;
  });
};

export const sortRestaurants = (restaurants, sortBy) => {
  const sorted = [...restaurants];
  
  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'cost-low-high':
      return sorted.sort((a, b) => a.costForTwo - b.costForTwo);
    case 'cost-high-low':
      return sorted.sort((a, b) => b.costForTwo - a.costForTwo);
    case 'delivery-time':
      return sorted.sort((a, b) => a.deliveryTime - b.deliveryTime);
    case 'popularity':
    default:
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
  }
};
