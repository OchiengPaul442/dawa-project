'use client';

import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
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
  quality = 85, // Increased default quality
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // If the incoming src changes and doesn't match the current imgSrc,
    // update the imgSrc state to trigger reloading.
    if (src !== imgSrc) {
      setImgSrc(src || fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src, fallbackSrc, imgSrc]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  }, [fallbackSrc, imgSrc]);

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
