import { Link } from 'react-router-dom';

const TAG_COLORS = {
  'Best Seller': 'bg-gold-light text-yellow-800 border-yellow-300',
  'Trending': 'bg-primary-light text-primary border-red-200',
  'Pure Veg': 'bg-green-50 text-rating border-green-200',
  'New': 'bg-blue-50 text-blue-700 border-blue-200',
  'Must Try': 'bg-purple-50 text-purple-700 border-purple-200',
  'Premium': 'bg-yellow-50 text-yellow-800 border-yellow-300',
  'Popular': 'bg-orange-50 text-orange-700 border-orange-200',
  'Budget': 'bg-green-50 text-green-700 border-green-200',
  'Cafe': 'bg-amber-50 text-amber-800 border-amber-200',
  'Desserts': 'bg-pink-50 text-pink-700 border-pink-200',
};

const RestaurantCard = ({ restaurant }) => {
  const {
    id, name, cuisine, rating, reviewCount,
    deliveryTime, minOrder, distance, priceRange,
    image, tags, isPureVeg, isTrending, hasOffer, isOpen
  } = restaurant;

  return (
    <Link
      to={`/restaurant/${id}`}
      className="card block group cursor-pointer hover:-translate-y-1 transition-all duration-300"
      style={{ textDecoration: 'none' }}
    >
      {/* Image Container */}
      <div className="relative h-45 overflow-hidden bg-surface-container rounded-t-card">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm border backdrop-blur-sm ${
                  TAG_COLORS[tag] || 'bg-white/90 text-on-surface border-surface-variant'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Offer Badge */}
        {hasOffer && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <span className="bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-pill shadow-sm">
              🎉 {hasOffer}
            </span>
          </div>
        )}

        {/* Closed Overlay */}
        {!isOpen && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-t-card">
            <span className="bg-on-surface/80 text-white text-label-sm font-semibold px-3 py-1 rounded-pill">
              Currently Closed
            </span>
          </div>
        )}

        {/* Pure Veg Badge */}
        {isPureVeg && (
          <div className="absolute top-3 right-3">
            <span className="bg-white text-rating text-[10px] font-bold px-1.5 py-0.5 rounded border border-rating/30 shadow-sm">
              PURE VEG
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Name & Rating */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-title-lg font-semibold text-on-surface leading-snug group-hover:text-primary transition-colors duration-200 truncate">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-rating text-white text-label-sm font-bold px-2 py-0.5 rounded shrink-0">
            <span className="material-symbols-outlined text-[12px] fill">star</span>
            {rating}
          </div>
        </div>

        {/* Cuisine */}
        <p className="text-body-sm text-on-surface-variant mb-3 truncate">{cuisine}</p>

        {/* Meta Row */}
        <div className="flex items-center gap-3 text-label-sm text-on-surface-variant border-t border-surface-container pt-3">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {deliveryTime} min
          </span>
          <span className="w-1 h-1 rounded-full bg-surface-dim" />
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">near_me</span>
            {distance}
          </span>
          <span className="w-1 h-1 rounded-full bg-surface-dim" />
          <span>{priceRange} for one</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
