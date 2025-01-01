// components/ImageCarousel.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import CustomImage from '../../../components/shared/CustomImage';
import {
  AiOutlineUp,
  AiOutlineDown,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import useWindowSize from '@core/hooks/useWindowSize';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const windowSize = useWindowSize();
  const { width } = windowSize;

  // Determine layout based on screen width
  const isMobile = width < 768;
  const maxVisibleThumbnails = isMobile ? 2 : width < 1024 ? 3 : 4;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Automatically switch images every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const nextIndex =
        selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
      setSelectedIndex(nextIndex);

      // Update thumbnail visibility when switching automatically
      if (nextIndex >= visibleStartIndex + maxVisibleThumbnails) {
        setVisibleStartIndex(
          Math.min(visibleStartIndex + 1, images.length - maxVisibleThumbnails),
        );
      }
      if (nextIndex < visibleStartIndex) {
        setVisibleStartIndex(Math.max(visibleStartIndex - 1, 0));
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [
    selectedIndex,
    visibleStartIndex,
    images.length,
    maxVisibleThumbnails,
    isPaused,
  ]);

  const handleScrollUp = () => {
    if (visibleStartIndex > 0) {
      setVisibleStartIndex((prev) => Math.max(prev - 1, 0));
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleScrollDown = () => {
    if (visibleStartIndex + maxVisibleThumbnails < images.length) {
      setVisibleStartIndex((prev) =>
        Math.min(prev + 1, images.length - maxVisibleThumbnails),
      );
      setSelectedIndex((prev) => Math.min(prev + 1, images.length - 1));
    }
  };

  const handleScrollLeft = () => {
    if (visibleStartIndex > 0) {
      setVisibleStartIndex((prev) => Math.max(prev - 1, 0));
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleScrollRight = () => {
    if (visibleStartIndex + maxVisibleThumbnails < images.length) {
      setVisibleStartIndex((prev) =>
        Math.min(prev + 1, images.length - maxVisibleThumbnails),
      );
      setSelectedIndex((prev) => Math.min(prev + 1, images.length - 1));
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setIsZoomed(false);
    setZoomStyle({});
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    setIsZoomed(false);
    setZoomStyle({});
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isZoomed || !mainImageRef.current) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setZoomStyle({
      transformOrigin: `${xPercent}% ${yPercent}%`,
    });
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  const visibleThumbnails = images.slice(
    visibleStartIndex,
    visibleStartIndex + maxVisibleThumbnails,
  );

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      {/* Main Image */}
      <div className="flex-1 w-full md:w-auto md:flex-1 lg:flex-2 h-auto max-w-full">
        <div
          ref={mainImageRef}
          className="relative w-full h-64 sm:h-96 md:h-[450px] lg:h-[450px] border overflow-hidden cursor-zoom-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseMove={handleMouseMove}
          onClick={toggleZoom}
        >
          <CustomImage
            src={images[selectedIndex]}
            alt={`Selected Image ${selectedIndex + 1}`}
            fill
            style={{
              objectFit: isZoomed ? 'cover' : 'cover',
              transition: 'transform 0.3s ease',
              transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
              ...zoomStyle,
            }}
          />
        </div>
      </div>

      {/* Thumbnails with Scrolling */}
      <div
        className={`flex flex-col items-center mt-4 md:mt-0 ${
          isMobile ? 'flex-row md:flex-col ml-0 md:ml-4' : 'ml-4'
        } space-y-4 md:space-y-0 md:space-x-2`}
      >
        {/* Navigation Arrows */}
        {!isMobile ? (
          <>
            {/* Up Arrow */}
            <button
              className={`p-1 text-gray-500 hover:text-primary_1 ${
                visibleStartIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleScrollUp}
              disabled={visibleStartIndex === 0}
              aria-label="Scroll Up"
            >
              <AiOutlineUp size={24} />
            </button>
          </>
        ) : null}

        {/* Thumbnails */}
        <div
          className={`flex ${
            isMobile
              ? 'flex-row space-x-3 overflow-x-auto'
              : 'flex-col space-y-3 overflow-hidden'
          }`}
        >
          {visibleThumbnails.map((image, index) => {
            const actualIndex = visibleStartIndex + index;
            return (
              <div
                key={actualIndex}
                className="relative w-20 h-20 m-1 flex-shrink-0 cursor-pointer"
                onClick={() => setSelectedIndex(actualIndex)}
              >
                <CustomImage
                  src={image}
                  alt={`Thumbnail ${actualIndex + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={`${
                    selectedIndex === actualIndex ? 'ring-2 ring-primary_1' : ''
                  }`}
                />
              </div>
            );
          })}
        </div>

        {!isMobile ? (
          <>
            {/* Down Arrow */}
            <button
              className={`p-1 text-gray-500 hover:text-primary_1 ${
                visibleStartIndex + maxVisibleThumbnails >= images.length
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              onClick={handleScrollDown}
              disabled={
                visibleStartIndex + maxVisibleThumbnails >= images.length
              }
              aria-label="Scroll Down"
            >
              <AiOutlineDown size={24} />
            </button>
          </>
        ) : null}
      </div>

      {/* Mobile Navigation Arrows */}
      {isMobile && (
        <div className="flex space-x-2 mt-2">
          <button
            className={`p-1 text-gray-500 hover:text-primary_1 ${
              visibleStartIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleScrollLeft}
            disabled={visibleStartIndex === 0}
            aria-label="Scroll Left"
          >
            <AiOutlineLeft size={24} />
          </button>
          <button
            className={`p-1 text-gray-500 hover:text-primary_1 ${
              visibleStartIndex + maxVisibleThumbnails >= images.length
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={handleScrollRight}
            disabled={visibleStartIndex + maxVisibleThumbnails >= images.length}
            aria-label="Scroll Right"
          >
            <AiOutlineRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
