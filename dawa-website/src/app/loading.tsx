import React from 'react';

const Loading: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      aria-busy="true"
      aria-label="Loading"
    >
      {/* Central "D" with Radiating Pulse Effect */}
      <div className="relative flex items-center justify-center">
        {/* Pulse Effect */}
        <div className="absolute w-24 h-24 rounded-full bg-[#FFA200] opacity-30 animate-pulse"></div>
        <div className="absolute w-32 h-32 rounded-full bg-[#FFA200] opacity-20 animate-pulse-slow"></div>
        <div className="absolute w-40 h-40 rounded-full bg-[#FFA200] opacity-10 animate-pulse-slower"></div>

        {/* Letter D */}
        <div className="text-6xl font-bold text-[#FFA200] z-10">D</div>
      </div>
    </div>
  );
};

export default Loading;
