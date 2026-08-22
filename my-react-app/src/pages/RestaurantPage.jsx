import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MenuItemCard from '../components/ui/MenuItemCard';
import { getRestaurantById } from '../data/restaurants';
import { getMenuByRestaurant } from '../data/menu';
import useCartStore from '../store/cartStore';
import useAppStore from '../store/appStore';

const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = getRestaurantById(id);
  const menu = getMenuByRestaurant(id);

  const [activeMenuCat, setActiveMenuCat] = useState(menu?.categories[0] || '');
  const [searchMenuQuery, setSearchMenuQuery] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const categoryRefs = useRef({});
  const { setCartOpen } = useAppStore();
  const itemCount = useCartStore((state) => state.items.reduce((s, i) => s + i.quantity, 0));

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 340);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl">😕</span>
          <h2 className="text-headline-md font-semibold text-on-surface mt-4 mb-2">Restaurant not found</h2>
          <Link to="/" className="btn-primary inline-flex">Go Back Home</Link>
        </div>
      </div>
    );
  }

  const filteredItems = menu?.items.filter((item) => {
    if (!searchMenuQuery.trim()) return true;
    return item.name.toLowerCase().includes(searchMenuQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchMenuQuery.toLowerCase());
  }) || [];

  const scrollToCategory = (cat) => {
    setActiveMenuCat(cat);
    const el = categoryRefs.current[cat];
    if (el) {
      const offset = 160;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-85 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-card hover:bg-white transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface">arrow_back</span>
        </button>

        {/* Restaurant Info */}
        <div className="absolute bottom-0 left-0 right-0 px-10 pb-8 max-w-container mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[44px] font-bold text-white mb-1 drop-shadow-lg" style={{ letterSpacing: '-0.02em' }}>
                {restaurant.name}
              </h1>
              <p className="text-lg text-white/80 mb-3">{restaurant.cuisine} • {restaurant.priceRange}</p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 bg-rating text-white text-sm font-bold px-2.5 py-1 rounded shadow-sm">
                  <span className="material-symbols-outlined text-[14px] fill">star</span>
                  {restaurant.rating}
                </span>
                <span className="text-white/80 text-sm">
                  {restaurant.reviewCount} reviews
                </span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="text-white/80 text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {restaurant.deliveryTime} min
                </span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="text-white/80 text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">near_me</span>
                  {restaurant.distance}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ACTION BAR ===== */}
      <div className="bg-white border-b border-surface-variant shadow-nav">
        <div className="max-w-container mx-auto px-10 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="btn-primary">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Order Online
            </button>
            <button className="btn-secondary">
              <span className="material-symbols-outlined text-[18px] text-primary">directions</span>
              Directions
            </button>
            <button className="btn-secondary">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">bookmark_border</span>
              Save
            </button>
            <button className="btn-secondary">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">share</span>
              Share
            </button>
          </div>

          {/* Info Strip */}
          <div className="flex items-center gap-4 text-label-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">timer</span>
              {restaurant.deliveryTime} min delivery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">payments</span>
              Min. order ${restaurant.minOrder}
            </span>
            <span className={`flex items-center gap-1.5 font-semibold ${restaurant.isOpen ? 'text-rating' : 'text-error'}`}>
              <span className={`w-2 h-2 rounded-full ${restaurant.isOpen ? 'bg-rating' : 'bg-error'} animate-pulse-dot`} />
              {restaurant.isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-container mx-auto px-10 py-6">
        <div className="flex gap-8">
          
          {/* ===== LEFT: MENU ===== */}
          <div className="flex-1 min-w-0 pr-84">

            {/* Menu Search */}
            <div className="mb-6">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input
                  type="text"
                  value={searchMenuQuery}
                  onChange={(e) => setSearchMenuQuery(e.target.value)}
                  placeholder={`Search in ${restaurant.name}...`}
                  className="w-full pl-10 pr-4 py-3 border border-surface-variant rounded-lg bg-surface-alt text-body-sm placeholder:text-on-surface-variant focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Category Tabs - Sticky */}
            <div className={`transition-all duration-200 z-20 bg-white pb-3 mb-4 ${isSticky ? 'sticky top-20 border-b border-surface-variant pt-3 -mx-10 px-10 shadow-nav' : ''}`}>
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {menu?.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => scrollToCategory(cat)}
                    className={`px-4 py-1.5 rounded-pill text-label-sm font-semibold shrink-0 transition-all duration-200 border ${
                      activeMenuCat === cat
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-on-surface-variant border-surface-variant hover:border-primary hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Sections */}
            {searchMenuQuery ? (
              <div>
                <h3 className="text-title-lg font-semibold text-on-surface mb-4">
                  {filteredItems.length} results for &quot;{searchMenuQuery}&quot;
                </h3>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      restaurantId={id}
                      restaurantName={restaurant.name}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <span className="text-4xl mb-3 block">🔍</span>
                    <p className="text-on-surface-variant">No items match your search</p>
                  </div>
                )}
              </div>
            ) : (
              menu?.categories.map((cat) => {
                const items = menu.items.filter((i) => i.category === cat);
                if (items.length === 0) return null;
                return (
                  <div
                    key={cat}
                    ref={(el) => { categoryRefs.current[cat] = el; }}
                    className="mb-8"
                  >
                    <h3 className="text-title-lg font-semibold text-on-surface mb-1 pb-3 border-b border-surface-container">
                      {cat}
                      <span className="text-on-surface-variant text-body-sm font-normal ml-2">
                        ({items.length})
                      </span>
                    </h3>
                    {items.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        restaurantId={id}
                        restaurantName={restaurant.name}
                      />
                    ))}
                  </div>
                );
              })
            )}
          </div>

          {/* ===== RIGHT: RESTAURANT INFO (fixed at edge) ===== */}
          <aside className="fixed right-10 top-55 w-75">
            {/* Opening Hours Card */}
            <div className="bg-white rounded-card shadow-card border border-surface-variant p-5 mb-4">
              <h4 className="text-label-lg font-semibold text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                Hours & Info
              </h4>
              <div className="space-y-2 text-body-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Mon–Fri</span>
                  <span className="font-medium text-on-surface">11:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sat–Sun</span>
                  <span className="font-medium text-on-surface">10:00 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-surface-container">
                  <span>Avg delivery</span>
                  <span className="font-semibold text-primary">{restaurant.deliveryTime} min</span>
                </div>
              </div>
            </div>

            {/* Offer Card */}
            {restaurant.hasOffer && (
              <div className="bg-primary-light border border-red-200 rounded-card p-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">local_offer</span>
                  <div>
                    <p className="text-label-sm text-on-surface-variant">Available Offer</p>
                    <p className="text-label-lg text-primary font-bold">{restaurant.hasOffer}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Cart CTA when items are in cart */}
            {itemCount > 0 && (
              <button
                onClick={() => setCartOpen(true)}
                className="w-full btn-primary justify-between text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="bg-white/30 text-white text-xs font-bold w-5 h-5 rounded flex items-center justify-center">
                    {itemCount}
                  </span>
                  View Cart
                </span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            )}
          </aside>

        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
