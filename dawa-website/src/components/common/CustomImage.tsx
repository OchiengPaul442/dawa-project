'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import NextImage, { ImageProps } from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import DefaultImage from '@public/assets/images/default_image.webp';
import { cn } from '@/lib/utils';

interface CustomImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  className,
  fallbackSrc = DefaultImage.src,
  src,
  alt = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const mountedRef = useRef(false);
  const prevSrcRef = useRef<string | null | undefined>(src);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (src !== prevSrcRef.current) {
      prevSrcRef.current = src;
      setImgSrc(src || fallbackSrc);
      setIsLoading(true);
    }
  }, [src, fallbackSrc]);

  const handleLoadingComplete = useCallback(() => {
    if (mountedRef.current) {
      setIsLoading(false);
    }
  }, []);

  const handleError = useCallback(() => {
    if (mountedRef.current) {
      if (imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    }
  }, [fallbackSrc, imgSrc]);

  return (
    <div
      className={cn(
        'relative w-full h-full overflow-hidden rounded-lg',
        className,
      )}
    >
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}
      <NextImage
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        className={cn(
          'transition-opacity duration-300 rounded-lg',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default CustomImage;
