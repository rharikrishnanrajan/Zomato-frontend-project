import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from './useViewport';

const useLazyImage = (src, placeholder = null) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const imgRef = useRef();
  const { isVisible } = useIntersectionObserver(imgRef, {
    threshold: 0.1,
    rootMargin: '50px',
  });

  useEffect(() => {
    setImageRef(imgRef.current);
  }, []);

  useEffect(() => {
    if (isVisible && src && imageSrc !== src) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        setIsError(false);
      };
      
      img.onerror = () => {
        setIsError(true);
        setIsLoaded(false);
      };
      
      img.src = src;
    }
  }, [isVisible, src, imageSrc]);

  return {
    ref: imgRef,
    src: imageSrc,
    isLoaded,
    isError,
  };
};

// Hook for managing multiple lazy images
export const useLazyImages = (images, placeholder = null) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [errorImages, setErrorImages] = useState(new Set());

  const loadImage = (src, index) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]));
        resolve(src);
      };
      
      img.onerror = () => {
        setErrorImages(prev => new Set([...prev, index]));
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });
  };

  const preloadImages = async () => {
    const promises = images.map((src, index) => 
      loadImage(src, index).catch(() => null)
    );
    
    await Promise.allSettled(promises);
  };

  const getImageSrc = (index) => {
    const hasLoaded = loadedImages.has(index);
    const hasError = errorImages.has(index);
    
    if (hasError) return placeholder;
    if (hasLoaded) return images[index];
    return placeholder;
  };

  const isImageLoaded = (index) => loadedImages.has(index);
  const hasImageError = (index) => errorImages.has(index);

  return {
    preloadImages,
    getImageSrc,
    isImageLoaded,
    hasImageError,
    loadedCount: loadedImages.size,
    errorCount: errorImages.size,
  };
};

export default useLazyImage;