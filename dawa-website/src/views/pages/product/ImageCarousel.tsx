'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  ZoomIn,
  ZoomOut,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

interface ImageType {
  image_id: number;
  image_url: string;
}

interface ImageCarouselProps {
  images: ImageType[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Safely get current image
  const currentImage = images[currentIndex] || images[0];

  const handlePrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!images || images.length === 0) {
    return (
      <Card className="relative aspect-[4/3] bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <Card className="relative overflow-hidden bg-gray-100">
        <div className="relative aspect-[4/3] md:aspect-[16/9]">
          <div
            className={`relative h-full w-full transition-transform duration-300 ${
              isZoomed ? 'cursor-zoom-out scale-150' : 'cursor-zoom-in'
            }`}
          >
            <Image
              src={currentImage.image_url || '/placeholder.svg'}
              alt={`Product image ${currentIndex + 1}`}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              onClick={toggleZoom}
            />
          </div>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4" />
                <VisuallyHidden>Previous image</VisuallyHidden>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
                <VisuallyHidden>Next image</VisuallyHidden>
              </Button>
            </>
          )}

          {/* Controls */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/80 hover:bg-white shadow-lg"
              onClick={toggleZoom}
            >
              {isZoomed ? (
                <ZoomOut className="h-4 w-4" />
              ) : (
                <ZoomIn className="h-4 w-4" />
              )}
              <VisuallyHidden>
                {isZoomed ? 'Zoom out' : 'Zoom in'}
              </VisuallyHidden>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/80 hover:bg-white shadow-lg"
              onClick={() => setShowFullscreen(true)}
            >
              <Expand className="h-4 w-4" />
              <VisuallyHidden>View fullscreen</VisuallyHidden>
            </Button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1.5 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </Card>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 px-1">
          {images.map((image, index) => (
            <button
              key={image.image_id}
              onClick={() => setCurrentIndex(index)}
              className={`
                relative aspect-square rounded-lg overflow-hidden
                transition-all duration-200
                ${
                  currentIndex === index
                    ? 'ring-2 ring-primary ring-offset-2'
                    : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-1'
                }
              `}
            >
              <Image
                src={image.image_url || '/placeholder.svg'}
                alt={`Thumbnail ${index + 1}`}
                fill
                className={`
                  object-cover
                  ${currentIndex === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
                `}
                sizes="(max-width: 768px) 20vw, 10vw"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <DialogTitle className="sr-only">Fullscreen Image View</DialogTitle>
          <div className="relative w-full h-full">
            <Image
              src={currentImage.image_url || '/placeholder.svg'}
              alt={`Product image ${currentIndex + 1} fullscreen`}
              fill
              className="object-contain"
              priority
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white shadow-lg"
              onClick={() => setShowFullscreen(false)}
            >
              <X className="h-4 w-4" />
              <VisuallyHidden>Close fullscreen view</VisuallyHidden>
            </Button>

            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <VisuallyHidden>Previous image</VisuallyHidden>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                  <VisuallyHidden>Next image</VisuallyHidden>
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageCarousel;
