import { useState, useEffect } from 'react';

const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    let timeoutId = null;
    
    const handleResize = () => {
      // Debounce resize events
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Breakpoint utilities based on Tailwind CSS defaults
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  const isMobile = viewport.width < breakpoints.md;
  const isTablet = viewport.width >= breakpoints.md && viewport.width < breakpoints.lg;
  const isDesktop = viewport.width >= breakpoints.lg;
  const isLargeDesktop = viewport.width >= breakpoints.xl;

  // Check specific breakpoints
  const isSmallScreen = viewport.width < breakpoints.sm;
  const isMediumScreen = viewport.width >= breakpoints.sm && viewport.width < breakpoints.lg;
  const isLargeScreen = viewport.width >= breakpoints.lg;

  // Responsive utilities
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  const isPortrait = viewport.height > viewport.width;
  const isLandscape = viewport.width > viewport.height;

  return {
    width: viewport.width,
    height: viewport.height,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isPortrait,
    isLandscape,
    isTouchDevice: isTouchDevice(),
    breakpoints,
  };
};

// Hook for media queries
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

// Hook for detecting scroll direction
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let timeoutId = null;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    const onScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScrollDirection, 10);
    };

    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
};

// Hook for detecting element visibility
export const useIntersectionObserver = (elementRef, options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      if (entry.isIntersecting) {
        setHasBeenVisible(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, options]);

  return { isVisible, hasBeenVisible };
};

// Hook for detecting if element is near viewport
export const useNearViewport = (elementRef, offset = 100) => {
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      {
        rootMargin: `${offset}px`,
        threshold: 0,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, offset]);

  return isNearViewport;
};

export default useViewport;