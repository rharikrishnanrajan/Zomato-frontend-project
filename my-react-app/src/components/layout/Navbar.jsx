import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import useAppStore from '../../store/appStore';

const NAV_TABS = [
  { id: 'delivery', label: 'Delivery' },
  { id: 'dining', label: 'Dining Out' },
  { id: 'nightlife', label: 'Nightlife' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

  const { location, setLocation, searchQuery, setSearchQuery, activeTab, setActiveTab } = useAppStore();
  const { getItemCount } = useCartStore();
  const { toggleCart } = useAppStore();

  const itemCount = useCartStore((state) => state.items.reduce((s, i) => s + i.quantity, 0));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-nav h-20">
      <div className="max-w-container mx-auto px-10 h-full flex items-center justify-between gap-6">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 group"
          onClick={() => navigate('/')}
        >
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-focus-red transition-all duration-200">
            <span className="material-symbols-outlined text-white text-xl fill">
              restaurant
            </span>
          </div>
          <span className="text-[22px] font-bold text-primary tracking-tight">
            zomato
          </span>
        </Link>

        {/* Search Bar */}
        <div
          className={`flex-1 max-w-2xl flex items-center bg-white border rounded-lg overflow-hidden transition-all duration-200 ${
            searchFocused || locationFocused
              ? 'border-primary shadow-focus-red'
              : 'border-surface-variant shadow-card'
          }`}
        >
          {/* Location */}
          <div className="flex items-center px-3 py-2.5 border-r border-surface-variant min-w-47.5 bg-surface-alt">
            <span className="material-symbols-outlined text-primary text-xl mr-1.5 shrink-0">
              location_on
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setLocationFocused(true)}
              onBlur={() => setLocationFocused(false)}
              placeholder="Location"
              className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm font-medium placeholder:text-on-surface-variant truncate w-0"
            />
            <span className="material-symbols-outlined text-on-surface-variant text-lg cursor-pointer shrink-0">
              keyboard_arrow_down
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 flex items-center px-3 py-2.5">
            <span className="material-symbols-outlined text-on-surface-variant text-xl mr-2 shrink-0">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search for restaurant, cuisine or a dish"
              className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm placeholder:text-on-surface-variant"
            />
          </div>
        </div>

        {/* Nav Tabs + Actions */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Nav Tabs */}
          <nav className="flex items-center gap-1">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-chip transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary rounded-none'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant hover:text-primary group"
            aria-label="Open cart"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              shopping_cart
            </span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* User Button */}
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant hover:text-primary group"
            aria-label="User account"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              account_circle
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
