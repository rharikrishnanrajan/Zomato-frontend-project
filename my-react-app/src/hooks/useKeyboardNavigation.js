import { useEffect, useCallback } from 'react';

const useKeyboardNavigation = (items, selectedIndex, onSelect, isActive = true) => {
  const handleKeyDown = useCallback((event) => {
    if (!isActive || items.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
        onSelect(nextIndex);
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
        onSelect(prevIndex);
        break;
        
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          const selectedItem = items[selectedIndex];
          if (selectedItem.onClick) {
            selectedItem.onClick();
          }
        }
        break;
        
      case 'Escape':
        event.preventDefault();
        onSelect(-1);
        break;
        
      default:
        break;
    }
  }, [items, selectedIndex, onSelect, isActive]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, isActive]);
};

// Hook for managing focus within a component
export const useFocusManagement = (containerRef, focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') => {
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll(focusableSelector))
      .filter(el => !el.disabled && el.offsetParent !== null);
  }, [containerRef, focusableSelector]);

  const focusFirst = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[0].focus();
    }
  }, [getFocusableElements]);

  const focusLast = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[elements.length - 1].focus();
    }
  }, [getFocusableElements]);

  const trapFocus = useCallback((event) => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;

    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }, [getFocusableElements]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', trapFocus);
      return () => container.removeEventListener('keydown', trapFocus);
    }
  }, [containerRef, trapFocus]);

  return {
    focusFirst,
    focusLast,
    getFocusableElements,
  };
};

export default useKeyboardNavigation;