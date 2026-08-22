import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLocationStore = create(
  persist(
    (set, get) => ({
      // State
      selectedCity: null,
      selectedLocality: null,
      deliveryAddress: null,
      coordinates: null,

      // Actions
      setCity: (city) => {
        set({
          selectedCity: city,
          selectedLocality: null, // Reset locality when city changes
        });
      },

      setLocality: (locality) => {
        set({ selectedLocality: locality });
      },

      setDeliveryAddress: (address) => {
        set({
          deliveryAddress: address,
          coordinates: address.coordinates || null,
        });
      },

      setCoordinates: (lat, lng) => {
        set({
          coordinates: { lat, lng },
        });
      },

      clearLocation: () => {
        set({
          selectedCity: null,
          selectedLocality: null,
          deliveryAddress: null,
          coordinates: null,
        });
      },

      // Get current location
      getCurrentLocation: async () => {
        return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
            return;
          }

          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              set({ coordinates });
              resolve(coordinates);
            },
            (error) => {
              reject(error);
            }
          );
        });
      },

      // Check if location is set
      hasLocation: () => {
        const { selectedCity, deliveryAddress } = get();
        return Boolean(selectedCity || deliveryAddress);
      },

      // Get display location
      getDisplayLocation: () => {
        const { selectedCity, selectedLocality, deliveryAddress } = get();
        
        if (deliveryAddress) {
          return deliveryAddress.area || deliveryAddress.city;
        }
        
        if (selectedLocality) {
          return `${selectedLocality}, ${selectedCity}`;
        }
        
        if (selectedCity) {
          return selectedCity;
        }
        
        return 'Select Location';
      },
    }),
    {
      name: 'zomato-location-storage',
    }
  )
);

export default useLocationStore;
