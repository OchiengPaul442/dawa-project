'use client';
import React from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import { MdOutlineStar, MdPlayArrow } from 'react-icons/md';
import PuffLoader from 'react-spinners/PuffLoader';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePlay = () => {
    setIsPlaying(true); // Trigger playing state
    setIsLoading(true); // Show loading state until video is ready
  };

  const handleReady = () => {
    setIsLoading(false); // Hide loading state when video is ready
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border border-primary_1">
            <MdOutlineStar className="text-primary_1 text-2xl" />
          </div>
        </div>

        {/* Text Section */}
        <h2 className="text-3xl font-bold text-gray-900">
          We serve customers around the world <br />
          with the best electronic products
        </h2>
        <p className="mt-4 text-gray-600 text-lg max-w-5xl mx-auto leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      {/* Video Section */}
      <div className="mt-10 relative w-full container mx-auto">
        {/* Placeholder Image */}
        {!isPlaying && (
          <div className="relative group rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9mZmljZSUyMHdvcmtlcnMlMjBhZnJpY2Fuc3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Video Preview"
              width={1200}
              height={600}
              className="object-cover w-full h-[400px]"
            />
            {/* Play Button */}
            <div
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <div className="bg-primary_1 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                <MdPlayArrow className="text-white text-4xl" />
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isPlaying && isLoading && (
          <div className="flex items-center bg-black rounded-xl justify-center absolute w-full h-full">
            <PuffLoader color="#FFA200" />
          </div>
        )}

        {/* Video Player */}
        {isPlaying && (
          <div className="rounded-xl overflow-hidden shadow-lg">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              playing
              controls
              width="100%"
              height="400px"
              className="rounded-xl"
              onReady={handleReady}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
