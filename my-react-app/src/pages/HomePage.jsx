import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/ui/RestaurantCard';
import { restaurants, categories } from '../data/restaurants';
import useAppStore from '../store/appStore';

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'rating', label: 'Rating' },
  { id: 'delivery_time', label: 'Delivery Time' },
  { id: 'price_low', label: 'Cost: Low to High' },
  { id: 'price_high', label: 'Cost: High to Low' },
];

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=85',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&q=85',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1400&q=85',
];

const priceRankMap = { '$': 1, '$$': 2, '$$$': 3 };

const HomePage = () => {
  const navigate = useNavigate();
  const { activeCategory, setActiveCategory, searchQuery, vegOnly, setVegOnly } = useAppStore();
  const [sortBy, setSortBy] = useState('relevance');
  const [heroIdx] = useState(0);

  // Filter & sort
  const filtered = useMemo(() => {
    let list = [...restaurants];

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter((r) => r.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }

    // Veg filter
    if (vegOnly) {
      list = list.filter((r) => r.isVeg);
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery_time':
        list.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
        break;
      case 'price_low':
        list.sort((a, b) => priceRankMap[a.priceRange] - priceRankMap[b.priceRange]);
        break;
      case 'price_high':
        list.sort((a, b) => priceRankMap[b.priceRange] - priceRankMap[a.priceRange]);
        break;
      default:
        // relevance: trending first
        list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    }

    return list;
  }, [activeCategory, searchQuery, vegOnly, sortBy]);

  const trendingRestaurants = restaurants.filter((r) => r.isTrending).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-105 overflow-hidden">
        {/* Background Image */}
        <img
          src={HERO_IMAGES[heroIdx]}
          alt="Delicious food"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />

        {/* Content */}
        <div className="relative z-10 max-w-container mx-auto px-10 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-[48px] leading-14 font-bold text-white mb-3 drop-shadow-lg" style={{ letterSpacing: '-0.02em' }}>
            Discover the best food &amp; drinks
          </h1>
          <p className="text-xl text-white/80 mb-8 font-medium">
            in New York City
          </p>

          {/* Hero Search Bar */}
          <div className="w-full max-w-2xl flex items-center bg-white rounded-lg overflow-hidden shadow-modal">
            <div className="flex items-center px-4 py-3.5 border-r border-surface-variant bg-surface-alt min-w-42.5">
              <span className="material-symbols-outlined text-primary text-xl mr-2">location_on</span>
              <span className="text-sm font-medium text-on-surface">New York City</span>
              <span className="material-symbols-outlined text-on-surface-variant ml-1">keyboard_arrow_down</span>
            </div>
            <div className="flex-1 flex items-center px-4 py-3.5">
              <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
              <input
                type="text"
                placeholder="Search for restaurant, cuisine or a dish"
                className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm placeholder:text-on-surface-variant"
              />
            </div>
            <button className="bg-primary text-white px-6 py-3.5 font-semibold text-sm hover:bg-primary-dark transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-container mx-auto px-10 py-8">

        {/* ===== CATEGORIES ===== */}
        <section className="mb-10">
          <h2 className="text-headline-md font-semibold text-on-surface mb-5">
            What&apos;s on your mind?
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-pill border text-sm font-semibold shrink-0 transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-primary-light border-primary text-primary shadow-focus-red'
                    : 'bg-white border-surface-variant text-on-surface-variant hover:border-primary hover:text-primary'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* ===== TRENDING NOW ===== */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-headline-md font-semibold text-on-surface">
                🔥 Trending Now
              </h2>
              <p className="text-body-sm text-on-surface-variant mt-0.5">
                Most ordered in your area today
              </p>
            </div>
            <button className="text-primary text-label-lg font-semibold hover:underline flex items-center gap-1">
              See all <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {trendingRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>

        {/* ===== ALL RESTAURANTS ===== */}
        <section>
          {/* Header + Filters */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
            <div>
              <h2 className="text-headline-md font-semibold text-on-surface">
                All Restaurants
                {activeCategory !== 'all' && (
                  <span className="text-primary ml-2 text-title-lg">— {activeCategory}</span>
                )}
              </h2>
              <p className="text-body-sm text-on-surface-variant mt-0.5">
                {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Veg Toggle */}
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`flex items-center gap-2 px-3 py-2 rounded-chip border text-label-sm font-semibold transition-all duration-200 ${
                  vegOnly
                    ? 'bg-green-50 border-rating text-rating'
                    : 'bg-white border-surface-variant text-on-surface-variant hover:border-rating hover:text-rating'
                }`}
              >
                <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${vegOnly ? 'border-rating' : 'border-surface-variant'}`}>
                  {vegOnly && <div className="w-1.5 h-1.5 bg-rating rounded-full" />}
                </div>
                Pure Veg
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-surface-variant rounded-chip text-label-sm font-semibold text-on-surface bg-white focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {filtered.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-6xl mb-4">🍽️</span>
              <h3 className="text-title-lg font-semibold text-on-surface mb-2">No restaurants found</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => { setActiveCategory('all'); setVegOnly(false); }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* ===== OFFERS BANNER ===== */}
        <section className="mt-16 mb-8">
          <div className="relative rounded-xl overflow-hidden shadow-card-hover">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1280&q=80"
              alt="Special offers"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-primary/90 to-primary-dark/80 flex items-center px-10">
              <div className="text-white">
                <p className="text-label-sm font-bold uppercase tracking-wider mb-1 opacity-80">Limited Time Offer</p>
                <h3 className="text-[32px] font-bold leading-tight mb-3">
                  Get 30% OFF your<br />first 3 orders 🎉
                </h3>
                <button className="bg-white text-primary font-bold px-6 py-2.5 rounded-btn text-sm hover:bg-surface-alt transition-colors shadow-sm">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
