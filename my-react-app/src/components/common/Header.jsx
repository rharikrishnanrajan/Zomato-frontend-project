import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Heart,
  Clock,
  Settings,
  LogOut
} from 'lucide-react';
import { Button, Dropdown, DropdownItem, DropdownDivider, Badge } from './index';
import { useAuthStore, useLocationStore, useCartStore, useAppStore } from '../../context';
import { useViewport } from '../../hooks';

const Header = () => {
  const navigate = useNavigate();
  const { isMobile } = useViewport();
  
  // Store hooks
  const { user, isAuthenticated, openAuthModal, logout } = useAuthStore();
  const { getDisplayLocation, setLocationModalOpen } = useLocationStore();
  const { getItemCount } = useCartStore();
  const { isMobileMenuOpen, toggleMobileMenu } = useAppStore();
  
  const cartItemCount = getItemCount();

  const handleLocationClick = () => {
    setLocationModalOpen(true);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLoginClick = () => {
    openAuthModal('login');
  };

  const handleSignupClick = () => {
    openAuthModal('signup');
  };

  const handleLogout = () => {
    logout();
  };

  const userMenuTrigger = (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
      <div className="w-8 h-8 bg-zomato-red text-white rounded-full flex items-center justify-center">
        {user ? user.name?.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
      </div>
      {!isMobile && (
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {user ? user.name : 'Account'}
          </span>
        </div>
      )}
      <ChevronDown className="w-4 h-4 text-gray-500" />
    </div>
  );

  return (
    <>
      <header className="bg-white shadow-zomato sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zomato-red rounded text-white font-bold flex items-center justify-center">
                Z
              </div>
              {!isMobile && (
                <span className="text-2xl font-bold text-zomato-gray-dark">
                  zomato
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="flex items-center gap-6 flex-1 max-w-2xl mx-8">
                {/* Location Selector */}
                <button
                  onClick={handleLocationClick}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-zomato-red transition-colors"
                >
                  <MapPin className="w-5 h-5 text-zomato-red" />
                  <span className="text-sm font-medium max-w-32 truncate">
                    {getDisplayLocation()}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for restaurants, cuisines..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zomato-red focus:border-transparent"
                    onClick={() => navigate('/search')}
                    readOnly
                  />
                </div>
              </div>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              )}

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={`Cart with ${cartItemCount} items`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="primary"
                    size="sm"
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center text-xs"
                  >
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Badge>
                )}
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <Dropdown trigger={userMenuTrigger} align="right">
                  <DropdownItem 
                    onClick={() => navigate('/profile')}
                    icon={<User className="w-4 h-4" />}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem 
                    onClick={() => navigate('/orders')}
                    icon={<Clock className="w-4 h-4" />}
                  >
                    Orders
                  </DropdownItem>
                  <DropdownItem 
                    onClick={() => navigate('/favorites')}
                    icon={<Heart className="w-4 h-4" />}
                  >
                    Favorites
                  </DropdownItem>
                  <DropdownItem 
                    onClick={() => navigate('/settings')}
                    icon={<Settings className="w-4 h-4" />}
                  >
                    Settings
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem 
                    onClick={handleLogout}
                    icon={<LogOut className="w-4 h-4" />}
                  >
                    Logout
                  </DropdownItem>
                </Dropdown>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleLoginClick}>
                    Log in
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSignupClick}>
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isMobile && (
            <div className="pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zomato-red"
                  onClick={() => navigate('/search')}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleMobileMenu}>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Location */}
              <button
                onClick={handleLocationClick}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg mb-4"
              >
                <MapPin className="w-5 h-5 text-zomato-red" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-gray-600">{getDisplayLocation()}</div>
                </div>
              </button>

              {/* Mobile Menu Items */}
              <nav className="space-y-1">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                      onClick={toggleMobileMenu}
                    >
                      <User className="w-5 h-5" />
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                      onClick={toggleMobileMenu}
                    >
                      <Clock className="w-5 h-5" />
                      Orders
                    </Link>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                      onClick={toggleMobileMenu}
                    >
                      <Heart className="w-5 h-5" />
                      Favorites
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-3 pt-4">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        handleLoginClick();
                        toggleMobileMenu();
                      }}
                    >
                      Log in
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => {
                        handleSignupClick();
                        toggleMobileMenu();
                      }}
                    >
                      Sign up
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;