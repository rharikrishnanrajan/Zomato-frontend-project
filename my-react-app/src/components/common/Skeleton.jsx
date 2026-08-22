import React from 'react';

export const Skeleton = ({ className = '', width, height }) => {
  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`animate-shimmer bg-gray-200 rounded ${className}`}
      style={style}
    />
  );
};

export const RestaurantCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-zomato">
      <Skeleton className="w-full h-48" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

export const RestaurantListSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, index) => (
        <RestaurantCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const MenuItemSkeleton = () => {
  return (
    <div className="flex justify-between items-start p-4 border-b">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="w-24 h-24 ml-4 flex-shrink-0" />
    </div>
  );
};

export const MenuCategorySkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      {[...Array(3)].map((_, index) => (
        <MenuItemSkeleton key={index} />
      ))}
    </div>
  );
};

export const RestaurantDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="w-full h-64 md:h-96" />
      <div className="container mx-auto px-4 space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-6 w-1/2" />
        <div className="flex gap-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
    </div>
  );
};

export const SearchSkeleton = () => {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-3">
          <Skeleton className="w-12 h-12 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
