import { create } from 'zustand';

const useAppStore = create((set) => ({
  // Location
  location: 'New York City',
  setLocation: (location) => set({ location }),

  // Search
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  // Cart sidebar visibility
  isCartOpen: false,
  setCartOpen: (isCartOpen) => set({ isCartOpen }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  // Active nav tab
  activeTab: 'delivery',
  setActiveTab: (activeTab) => set({ activeTab }),

  // Filter
  activeCategory: 'all',
  setActiveCategory: (activeCategory) => set({ activeCategory }),

  // Sort
  sortBy: 'relevance',
  setSortBy: (sortBy) => set({ sortBy }),

  // Veg-only filter
  vegOnly: false,
  setVegOnly: (vegOnly) => set({ vegOnly }),

  // Order success state
  orderPlaced: false,
  orderId: null,
  setOrderPlaced: (orderId) => set({ orderPlaced: true, orderId }),
  resetOrder: () => set({ orderPlaced: false, orderId: null }),
}));

export default useAppStore;
