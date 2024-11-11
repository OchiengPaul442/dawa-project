import NextImage, { ImageProps } from 'next/image';
import DefaultImage from '@public/assets/images/default_image.webp';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CustomImageProps extends ImageProps {
  className?: string;
  fallbackSrc?: string;
}

const CustomImage = ({
  className,
  fallbackSrc = DefaultImage.src,
  src,
  alt,
  ...props
}: CustomImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(fallbackSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!src) {
      setImgSrc(fallbackSrc);
      setIsLoading(false);
      return;
    }

    const image = new window.Image();
    image.src = typeof src === 'string' ? src : src.toString();
    image.onload = () => {
      setImgSrc(typeof src === 'string' ? src : src.toString());
      setIsLoading(false);
    };
    image.onerror = () => {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
    };

    // Cleanup to avoid memory leaks
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src, fallbackSrc]);

  return (
    <div
      className={cn('relative', className)}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* Fallback or Placeholder Image */}
      {isLoading && (
        <NextImage
          src={fallbackSrc}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0"
          priority
          {...props}
        />
      )}

      {/* Main Image */}
      {!hasError && (
        <NextImage
          src={imgSrc}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          className={cn(
            'transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100',
          )}
          onLoadingComplete={() => setIsLoading(false)}
          {...props}
        />
      )}

      {/* Handle Error by Showing Fallback */}
      {hasError && !isLoading && (
        <NextImage
          src={fallbackSrc}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0"
          {...props}
        />
      )}
    </div>
  );
};

export default CustomImage;
