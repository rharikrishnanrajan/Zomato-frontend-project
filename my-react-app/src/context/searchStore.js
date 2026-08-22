import { create } from 'zustand';

const useSearchStore = create((set, get) => ({
  // State
  searchQuery: '',
  searchResults: [],
  searchSuggestions: [],
  isSearching: false,
  searchHistory: JSON.parse(localStorage.getItem('zomato-search-history') || '[]'),
  filters: {
    cuisines: [],
    rating: null,
    costForTwo: { min: null, max: null },
    dietary: null,
    sortBy: 'popularity',
  },
  activeFilters: [],

  // Search Actions
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setSearchResults: (results) => {
    set({ searchResults: results });
  },

  setSearchSuggestions: (suggestions) => {
    set({ searchSuggestions: suggestions });
  },

  setIsSearching: (isSearching) => {
    set({ isSearching });
  },

  addToSearchHistory: (query) => {
    if (!query.trim()) return;
    
    const { searchHistory } = get();
    const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10);
    
    set({ searchHistory: newHistory });
    localStorage.setItem('zomato-search-history', JSON.stringify(newHistory));
  },

  clearSearchHistory: () => {
    set({ searchHistory: [] });
    localStorage.removeItem('zomato-search-history');
  },

  removeFromSearchHistory: (query) => {
    const { searchHistory } = get();
    const newHistory = searchHistory.filter(item => item !== query);
    
    set({ searchHistory: newHistory });
    localStorage.setItem('zomato-search-history', JSON.stringify(newHistory));
  },

  // Filter Actions
  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().updateActiveFilters();
  },

  resetFilters: () => {
    set({
      filters: {
        cuisines: [],
        rating: null,
        costForTwo: { min: null, max: null },
        dietary: null,
        sortBy: 'popularity',
      },
      activeFilters: [],
    });
  },

  addCuisineFilter: (cuisine) => {
    const { filters } = get();
    const cuisines = [...filters.cuisines];
    
    if (!cuisines.includes(cuisine)) {
      cuisines.push(cuisine);
      get().updateFilters({ cuisines });
    }
  },

  removeCuisineFilter: (cuisine) => {
    const { filters } = get();
    const cuisines = filters.cuisines.filter(c => c !== cuisine);
    get().updateFilters({ cuisines });
  },

  toggleCuisineFilter: (cuisine) => {
    const { filters } = get();
    if (filters.cuisines.includes(cuisine)) {
      get().removeCuisineFilter(cuisine);
    } else {
      get().addCuisineFilter(cuisine);
    }
  },

  setRatingFilter: (rating) => {
    get().updateFilters({ rating });
  },

  setCostFilter: (min, max) => {
    get().updateFilters({ costForTwo: { min, max } });
  },

  setDietaryFilter: (dietary) => {
    get().updateFilters({ dietary });
  },

  setSortBy: (sortBy) => {
    get().updateFilters({ sortBy });
  },

  updateActiveFilters: () => {
    const { filters } = get();
    const activeFilters = [];

    if (filters.cuisines.length > 0) {
      activeFilters.push({
        type: 'cuisines',
        label: `Cuisines (${filters.cuisines.length})`,
        value: filters.cuisines,
      });
    }

    if (filters.rating) {
      activeFilters.push({
        type: 'rating',
        label: `Rating ${filters.rating}+`,
        value: filters.rating,
      });
    }

    if (filters.costForTwo.min || filters.costForTwo.max) {
      const min = filters.costForTwo.min || 0;
      const max = filters.costForTwo.max || '∞';
      activeFilters.push({
        type: 'costForTwo',
        label: `₹${min} - ₹${max}`,
        value: filters.costForTwo,
      });
    }

    if (filters.dietary) {
      activeFilters.push({
        type: 'dietary',
        label: filters.dietary === 'veg' ? 'Pure Veg' : filters.dietary,
        value: filters.dietary,
      });
    }

    set({ activeFilters });
  },

  removeActiveFilter: (filterType) => {
    const { filters } = get();
    const updatedFilters = { ...filters };

    switch (filterType) {
      case 'cuisines':
        updatedFilters.cuisines = [];
        break;
      case 'rating':
        updatedFilters.rating = null;
        break;
      case 'costForTwo':
        updatedFilters.costForTwo = { min: null, max: null };
        break;
      case 'dietary':
        updatedFilters.dietary = null;
        break;
      default:
        break;
    }

    set({ filters: updatedFilters });
    get().updateActiveFilters();
  },

  // Computed values
  hasActiveFilters: () => {
    const { activeFilters } = get();
    return activeFilters.length > 0;
  },

  getFilterCount: () => {
    const { activeFilters } = get();
    return activeFilters.length;
  },

  clearSearch: () => {
    set({
      searchQuery: '',
      searchResults: [],
      searchSuggestions: [],
      isSearching: false,
    });
  },
}));

export default useSearchStore;