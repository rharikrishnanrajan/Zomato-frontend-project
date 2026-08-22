import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  restaurantId: null,
  restaurantName: null,

  // Add item or increase quantity
  addItem: (item, restaurantId, restaurantName) => {
    set((state) => {
      // If adding from a different restaurant, confirm or clear
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        // Clear cart and start fresh with new restaurant
        return {
          items: [{ ...item, quantity: 1 }],
          restaurantId,
          restaurantName,
        };
      }

      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          restaurantId,
          restaurantName,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        restaurantId,
        restaurantName,
      };
    });
  },

  // Remove one quantity or remove item entirely
  removeItem: (itemId) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === itemId);
      if (!existing) return state;

      if (existing.quantity === 1) {
        const newItems = state.items.filter((i) => i.id !== itemId);
        return {
          items: newItems,
          restaurantId: newItems.length === 0 ? null : state.restaurantId,
          restaurantName: newItems.length === 0 ? null : state.restaurantName,
        };
      }
      return {
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    });
  },

  // Update quantity directly
  updateQty: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      ),
    }));
  },

  // Remove item completely
  deleteItem: (itemId) => {
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== itemId);
      return {
        items: newItems,
        restaurantId: newItems.length === 0 ? null : state.restaurantId,
        restaurantName: newItems.length === 0 ? null : state.restaurantName,
      };
    });
  },

  // Clear entire cart
  clearCart: () => set({ items: [], restaurantId: null, restaurantName: null }),

  // Computed: total item count
  getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  // Computed: subtotal
  getSubtotal: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  // Get quantity of a specific item
  getItemQty: (itemId) => {
    const item = get().items.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  },
}));

export default useCartStore;
