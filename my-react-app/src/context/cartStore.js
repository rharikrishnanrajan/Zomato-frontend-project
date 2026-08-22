import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      restaurantId: null,
      restaurantName: null,
      appliedCoupon: null,

      // Cart Actions
      addItem: (item, restaurantId, restaurantName) => {
        const { items: currentItems, restaurantId: currentRestaurantId } = get();

        // If cart has items from different restaurant, clear it first
        if (currentRestaurantId && currentRestaurantId !== restaurantId) {
          const shouldClear = window.confirm(
            'Your cart contains items from another restaurant. Would you like to reset your cart?'
          );
          if (!shouldClear) return false;
          get().clearCart();
        }

        const existingItemIndex = currentItems.findIndex(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItemIndex >= 0) {
          // Item exists, update quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += 1;
          set({ items: updatedItems });
        } else {
          // New item, add to cart
          set({
            items: [...currentItems, { ...item, quantity: 1 }],
            restaurantId,
            restaurantName,
          });
        }
        return true;
      },

      removeItem: (itemId) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.id !== itemId);
        
        set({
          items: updatedItems,
          restaurantId: updatedItems.length === 0 ? null : get().restaurantId,
          restaurantName: updatedItems.length === 0 ? null : get().restaurantName,
          appliedCoupon: updatedItems.length === 0 ? null : get().appliedCoupon,
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      incrementQuantity: (itemId) => {
        const { items } = get();
        const item = items.find((i) => i.id === itemId);
        if (item) {
          get().updateQuantity(itemId, item.quantity + 1);
        }
      },

      decrementQuantity: (itemId) => {
        const { items } = get();
        const item = items.find((i) => i.id === itemId);
        if (item) {
          get().updateQuantity(itemId, item.quantity - 1);
        }
      },

      clearCart: () => {
        set({
          items: [],
          restaurantId: null,
          restaurantName: null,
          appliedCoupon: null,
        });
      },

      // Coupon Actions
      applyCoupon: (coupon) => {
        set({ appliedCoupon: coupon });
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      },

      // Computed Values
      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getDiscount: () => {
        const { appliedCoupon } = get();
        const subtotal = get().getSubtotal();

        if (!appliedCoupon) return 0;

        if (subtotal < appliedCoupon.minOrder) return 0;

        let discount = 0;
        if (appliedCoupon.type === 'percentage') {
          discount = (subtotal * appliedCoupon.discountPercent) / 100;
        } else if (appliedCoupon.type === 'flat') {
          discount = appliedCoupon.maxDiscount;
        }

        return Math.min(discount, appliedCoupon.maxDiscount);
      },

      getDeliveryFee: () => {
        const { appliedCoupon } = get();
        const subtotal = get().getSubtotal();
        
        // Free delivery for orders above 199 or if free delivery coupon applied
        if (subtotal >= 199 || (appliedCoupon && appliedCoupon.type === 'delivery')) {
          return 0;
        }
        return 40;
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return ((subtotal - discount) * 0.05).toFixed(2); // 5% GST
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const deliveryFee = get().getDeliveryFee();
        const tax = parseFloat(get().getTax());
        return subtotal - discount + deliveryFee + tax;
      },
    }),
    {
      name: 'zomato-cart-storage',
    }
  )
);

export default useCartStore;
