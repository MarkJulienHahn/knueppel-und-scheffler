import { useState, useEffect } from 'react';

const useDevicePixelRatio = () => {
  const [viewportWidth, setViewportWidth] = useState(null);
  const [actualPixelWidth, setActualPixelWidth] = useState(null);
  const [pixelRatio, setPixelRatio] = useState(null);

  useEffect(() => {
    const updateDimensions = () => {
      setViewportWidth(window.innerWidth);
      setActualPixelWidth(screen.width);
      setPixelRatio(window.devicePixelRatio);
    };

    // Set initial values
    updateDimensions();

    // Update values on resize
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const factor = actualPixelWidth && viewportWidth ? actualPixelWidth / viewportWidth : null;

  return { viewportWidth, actualPixelWidth, pixelRatio, factor };
};

export default useDevicePixelRatio;
