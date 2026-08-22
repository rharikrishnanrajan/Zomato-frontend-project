import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import useAppStore from '../../store/appStore';

const CartSidebar = () => {
  const navigate = useNavigate();
  const { items, addItem, removeItem, deleteItem, restaurantName } = useCartStore();
  const { isCartOpen, setCartOpen } = useAppStore();

  const subtotal = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  );
  const itemCount = useCartStore((state) =>
    state.items.reduce((s, i) => s + i.quantity, 0)
  );

  const deliveryFee = subtotal > 0 ? (subtotal > 30 ? 0 : 2.99) : 0;
  const taxes = subtotal * 0.08;
  const total = subtotal + deliveryFee + taxes;

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-20 right-0 h-[calc(100vh-80px)] w-[320px] z-40 bg-white shadow-modal flex flex-col transition-transform duration-300 border-l border-surface-variant ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxHeight: 'calc(100vh - 80px)' }}
      >
        {/* Header */}
        <div className="p-5 border-b border-surface-variant shrink-0">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-title-lg font-semibold text-primary">My Order</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          {restaurantName && (
            <p className="text-body-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">store</span>
              {restaurantName}
              {' • '}
              <span className="font-medium">{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
            </p>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[40px] text-on-surface-variant wght-300">
                  shopping_cart
                </span>
              </div>
              <p className="text-title-lg font-semibold text-on-surface mb-1">Your cart is empty</p>
              <p className="text-body-sm text-on-surface-variant">Add items to get started</p>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onAdd={() => addItem(item, useCartStore.getState().restaurantId, useCartStore.getState().restaurantName)}
                onRemove={() => removeItem(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            ))
          )}
        </div>

        {/* Coupon */}
        {items.length > 0 && (
          <div className="px-4 py-3 border-t border-surface-variant shrink-0">
            <div className="flex items-center gap-2 bg-primary-light rounded-chip px-3 py-2 cursor-pointer hover:bg-red-100 transition-colors group">
              <span className="material-symbols-outlined text-primary text-[18px]">
                local_offer
              </span>
              <span className="text-label-lg text-primary flex-1">Apply Coupon</span>
              <span className="material-symbols-outlined text-primary text-[18px]">
                chevron_right
              </span>
            </div>
          </div>
        )}

        {/* Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-surface-variant p-4 shrink-0 space-y-2">
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Subtotal</span>
              <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Delivery Fee</span>
              <span className={deliveryFee === 0 ? 'text-rating font-semibold' : 'font-medium text-on-surface'}>
                {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Taxes & Fees</span>
              <span className="font-medium text-on-surface">${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-title-lg font-bold text-on-surface pt-2 border-t border-surface-variant">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full btn-primary justify-center mt-3 text-base py-3"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

// Cart Item sub-component
const CartItem = ({ item, onAdd, onRemove, onDelete }) => {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      {/* Veg/Non-veg indicator */}
      <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center shrink-0 mt-1 ${item.isVeg ? 'border-rating' : 'border-red-600'}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-rating' : 'bg-red-600'}`} />
      </div>

      {/* Item Info */}
      <div className="flex-1 min-w-0">
        <p className="text-label-lg text-on-surface truncate">{item.name}</p>
        <p className="text-label-sm text-on-surface-variant">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      {/* Qty Controls */}
      <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden shrink-0">
        <button
          onClick={onRemove}
          className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors text-lg leading-none"
        >
          −
        </button>
        <span className="w-8 text-center text-label-sm font-semibold text-on-surface">
          {item.quantity}
        </span>
        <button
          onClick={onAdd}
          className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary-light transition-colors text-lg leading-none font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
