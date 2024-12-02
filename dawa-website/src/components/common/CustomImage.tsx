'use client';

import React from 'react';
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
  const [imgSrc, setImgSrc] = React.useState<string>(src || fallbackSrc);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setIsLoading(true);
  }, [src, fallbackSrc]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

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
