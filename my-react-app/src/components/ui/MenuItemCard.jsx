import useCartStore from '../../store/cartStore';
import useAppStore from '../../store/appStore';

const MenuItemCard = ({ item, restaurantId, restaurantName }) => {
  const { addItem, removeItem, getItemQty } = useCartStore();
  const { setCartOpen } = useAppStore();

  const qty = useCartStore((state) => {
    const found = state.items.find((i) => i.id === item.id);
    return found ? found.quantity : 0;
  });

  const handleAdd = () => {
    addItem(item, restaurantId, restaurantName);
    setCartOpen(true);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex gap-4 py-5 border-b border-surface-container group animate-fade-in">
      {/* Left: Info */}
      <div className="flex-1 min-w-0">
        {/* Veg / Non-veg indicator */}
        <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center mb-2 shrink-0 ${item.isVeg ? 'border-rating' : 'border-red-600'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-rating' : 'bg-red-600'}`} />
        </div>

        {/* Name */}
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h4 className="text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors duration-200">
            {item.name}
          </h4>
          {item.isBestSeller && (
            <span className="text-[10px] font-bold text-yellow-800 bg-gold-light border border-yellow-300 px-2 py-0.5 rounded-sm">
              Best Seller
            </span>
          )}
          {item.isSpicy && (
            <span className="text-[10px] text-red-600">🌶 Spicy</span>
          )}
        </div>

        {/* Price */}
        <p className="text-body-md font-bold text-on-surface mb-1.5">
          ${item.price.toFixed(2)}
        </p>

        {/* Description */}
        {item.description && (
          <p className="text-body-sm text-on-surface-variant leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Right: Image + Add Button */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        {/* Image */}
        <div className="relative w-28 h-24 rounded-lg overflow-hidden bg-surface-container shadow-sm">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          )}
        </div>

        {/* Add / Qty Control */}
        {qty === 0 ? (
          <button
            onClick={handleAdd}
            className="w-28 py-1.5 border-2 border-primary text-primary text-label-lg font-bold rounded-lg
                       hover:bg-primary hover:text-white transition-all duration-200 active:scale-95
                       flex items-center justify-center gap-1 shadow-sm bg-white"
          >
            <span className="text-lg leading-none font-bold">+</span>
            ADD
          </button>
        ) : (
          <div className="w-28 flex items-center justify-center border-2 border-primary rounded-lg overflow-hidden bg-primary">
            <button
              onClick={handleRemove}
              className="flex-1 h-8 text-white text-xl font-bold hover:bg-primary-dark transition-colors flex items-center justify-center"
            >
              −
            </button>
            <span className="w-10 text-center text-white text-label-lg font-bold">
              {qty}
            </span>
            <button
              onClick={handleAdd}
              className="flex-1 h-8 text-white text-xl font-bold hover:bg-primary-dark transition-colors flex items-center justify-center"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
