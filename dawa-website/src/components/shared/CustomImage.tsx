'use client';

import React, { useState, useEffect, useRef } from 'react';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface CustomImageProps extends Omit<NextImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
}

const DEFAULT_FALLBACK_IMAGE = '/assets/images/default_image.webp';

const CustomImage: React.FC<CustomImageProps> = ({
  className,
  containerClassName,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  src,
  alt = '',
  quality = 85,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // A ref to track if the component is mounted.
  const isMounted = useRef(true);

  useEffect(() => {
    // Set mounted flag to false on unmount to avoid updating state after unmount.
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Update the image source when the provided src or fallbackSrc changes.
    setImgSrc(src || fallbackSrc);
    setIsLoading(true);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleLoadingComplete = () => {
    if (isMounted.current) {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    // If there's an error and the current source isn't already the fallback, use the fallback.
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    } else if (isMounted.current) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  return (
    <div
      className={cn(
        'relative w-full h-full overflow-hidden rounded-lg',
        containerClassName,
      )}
    >
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
      )}
      {!hasError && (
        <NextImage
          src={imgSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={quality}
          className={cn(
            'object-cover object-center w-full h-full transition-opacity duration-300 rounded-lg',
            isLoading ? 'opacity-0' : 'opacity-100',
            className,
          )}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
};

export default CustomImage;
