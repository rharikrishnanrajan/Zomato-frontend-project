import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { SearchBar } from '../common';
import { useLocationStore, useSearchStore } from '../../context';
import { useSearchSuggestionsApi } from '../../hooks';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const { getDisplayLocation, hasLocation, setLocationModalOpen } = useLocationStore();
  const { setSearchQuery: setGlobalSearchQuery, addToSearchHistory } = useSearchStore();
  const { getSuggestions, loading: suggestionsLoading } = useSearchSuggestionsApi();

  useEffect(() => {
    if (searchQuery.length >= 2) {
      getSuggestions(searchQuery).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, getSuggestions]);

  const handleSearch = (query) => {
    if (query.trim()) {
      setGlobalSearchQuery(query);
      addToSearchHistory(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'restaurant') {
      navigate(`/restaurant/${suggestion.id}`);
    } else {
      handleSearch(suggestion.name);
    }
  };

  const handleLocationClick = () => {
    setLocationModalOpen(true);
  };

  const suggestionComponents = suggestions.map((suggestion, index) => (
    <div
      key={index}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => handleSuggestionClick(suggestion)}
    >
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        {suggestion.type === 'restaurant' ? (
          <div className="w-8 h-8 bg-zomato-red rounded text-white text-xs font-semibold flex items-center justify-center">
            {suggestion.name.charAt(0)}
          </div>
        ) : (
          <Search className="w-5 h-5 text-gray-500" />
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{suggestion.name}</div>
        <div className="text-sm text-gray-500">{suggestion.subtitle}</div>
      </div>
    </div>
  ));

  return (
    <section className="relative bg-gradient-to-br from-red-50 to-pink-50 py-12 md:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-zomato-red rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-zomato-red rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-zomato-red rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-zomato-red rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Discover the best
            <span className="text-zomato-red"> food & drinks </span>
            in your city
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
            Find restaurants, cafes, bars, and more near you. Order online or book a table.
          </p>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-zomato-lg p-4 md:p-6 mx-auto max-w-3xl">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Location Selector */}
              <div className="flex-shrink-0">
                <button
                  onClick={handleLocationClick}
                  className="flex items-center gap-2 px-4 py-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors min-w-[200px] w-full md:w-auto"
                >
                  <MapPin className="w-5 h-5 text-zomato-red flex-shrink-0" />
                  <div className="flex-1 md:flex-none">
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-medium text-gray-900 truncate">
                      {hasLocation() ? getDisplayLocation() : 'Select location'}
                    </div>
                  </div>
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex-1">
                <SearchBar
                  placeholder="Search for restaurants, cuisines, dishes..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  suggestions={suggestionComponents}
                  loading={suggestionsLoading}
                  className="h-full"
                />
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-8 md:mt-12">
            <p className="text-gray-600 mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'Pizza', 'Biryani', 'Burger', 'Chinese', 'South Indian', 
                'North Indian', 'Desserts', 'Coffee'
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-zomato-red hover:text-white transition-colors shadow-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-zomato-red">1000+</div>
              <div className="text-gray-600 text-sm md:text-base">Restaurants</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-zomato-red">50+</div>
              <div className="text-gray-600 text-sm md:text-base">Cities</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-zomato-red">100k+</div>
              <div className="text-gray-600 text-sm md:text-base">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-zomato-red">24/7</div>
              <div className="text-gray-600 text-sm md:text-base">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;