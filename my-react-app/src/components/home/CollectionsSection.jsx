import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card, RestaurantCardSkeleton } from '../common';
import { useCollectionsApi } from '../../hooks';

const CollectionsSection = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const { getCollections, loading } = useCollectionsApi();

  useEffect(() => {
    getCollections().then(setCollections);
  }, [getCollections]);

  const handleCollectionClick = (collection) => {
    navigate(`/collection/${collection.id}`);
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Collections
            </h2>
            <p className="text-gray-600">
              Explore curated lists of top restaurants, cafes, pubs, and bars
            </p>
          </div>
          <button
            onClick={() => navigate('/collections')}
            className="hidden md:flex items-center gap-2 text-zomato-red font-medium hover:gap-3 transition-all"
          >
            View All
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.slice(0, 8).map((collection) => (
            <Card
              key={collection.id}
              padding="none"
              hover
              onClick={() => handleCollectionClick(collection)}
              className="group overflow-hidden cursor-pointer"
            >
              {/* Collection Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Collection Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{collection.title}</h3>
                  <p className="text-sm opacity-90">{collection.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile View All Button */}
        <button
          onClick={() => navigate('/collections')}
          className="md:hidden flex items-center justify-center gap-2 w-full mt-6 py-3 text-zomato-red font-medium border border-zomato-red rounded-lg hover:bg-red-50 transition-colors"
        >
          View All Collections
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default CollectionsSection;