import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isAuthModalOpen: false,
      authMode: 'login', // 'login' or 'signup'

      // Auth Actions
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
          isAuthModalOpen: false,
        });
      },

      signup: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
          isAuthModalOpen: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      // Modal Actions
      openAuthModal: (mode = 'login') => {
        set({
          isAuthModalOpen: true,
          authMode: mode,
        });
      },

      closeAuthModal: () => {
        set({ isAuthModalOpen: false });
      },

      setAuthMode: (mode) => {
        set({ authMode: mode });
      },

      // User Preferences
      addAddress: (address) => {
        const { user } = get();
        const addresses = user?.addresses || [];
        set({
          user: {
            ...user,
            addresses: [...addresses, { ...address, id: Date.now() }],
          },
        });
      },

      updateAddress: (addressId, updatedAddress) => {
        const { user } = get();
        const addresses = user?.addresses || [];
        set({
          user: {
            ...user,
            addresses: addresses.map((addr) =>
              addr.id === addressId ? { ...addr, ...updatedAddress } : addr
            ),
          },
        });
      },

      deleteAddress: (addressId) => {
        const { user } = get();
        const addresses = user?.addresses || [];
        set({
          user: {
            ...user,
            addresses: addresses.filter((addr) => addr.id !== addressId),
          },
        });
      },

      setDefaultAddress: (addressId) => {
        const { user } = get();
        const addresses = user?.addresses || [];
        set({
          user: {
            ...user,
            addresses: addresses.map((addr) => ({
              ...addr,
              isDefault: addr.id === addressId,
            })),
          },
        });
      },

      addFavoriteRestaurant: (restaurantId) => {
        const { user } = get();
        const favorites = user?.favorites || [];
        if (!favorites.includes(restaurantId)) {
          set({
            user: {
              ...user,
              favorites: [...favorites, restaurantId],
            },
          });
        }
      },

      removeFavoriteRestaurant: (restaurantId) => {
        const { user } = get();
        const favorites = user?.favorites || [];
        set({
          user: {
            ...user,
            favorites: favorites.filter((id) => id !== restaurantId),
          },
        });
      },

      isFavorite: (restaurantId) => {
        const { user } = get();
        const favorites = user?.favorites || [];
        return favorites.includes(restaurantId);
      },

      // Order History
      addOrder: (order) => {
        const { user } = get();
        const orders = user?.orders || [];
        set({
          user: {
            ...user,
            orders: [{ ...order, id: Date.now(), date: new Date().toISOString() }, ...orders],
          },
        });
      },
    }),
    {
      name: 'zomato-auth-storage',
    }
  )
);

export default useAuthStore;
