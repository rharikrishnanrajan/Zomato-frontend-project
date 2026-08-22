import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  // UI State
  isMobileMenuOpen: false,
  isLocationModalOpen: false,
  isLoading: false,
  notifications: [],
  theme: 'light',

  // App Actions
  setMobileMenuOpen: (isOpen) => {
    set({ isMobileMenuOpen: isOpen });
  },

  toggleMobileMenu: () => {
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }));
  },

  setLocationModalOpen: (isOpen) => {
    set({ isLocationModalOpen: isOpen });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  // Notification Actions
  addNotification: (notification) => {
    const id = Date.now();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification,
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto remove notification after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  // Theme Actions
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem('zomato-theme', theme);
  },

  toggleTheme: () => {
    const { theme } = get();
    const newTheme = theme === 'light' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },

  // Utility Actions
  showSuccess: (message) => {
    get().addNotification({
      type: 'success',
      title: 'Success',
      message,
    });
  },

  showError: (message) => {
    get().addNotification({
      type: 'error',
      title: 'Error',
      message,
      duration: 7000,
    });
  },

  showWarning: (message) => {
    get().addNotification({
      type: 'warning',
      title: 'Warning',
      message,
    });
  },

  showInfo: (message) => {
    get().addNotification({
      type: 'info',
      title: 'Info',
      message,
    });
  },

  // Initialize app
  initialize: () => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('zomato-theme');
    if (savedTheme) {
      set({ theme: savedTheme });
    }

    // Set loading to false after initialization
    set({ isLoading: false });
  },
}));

export default useAppStore;