import React from 'react';
import { PuffLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <PuffLoader color="#FFA200" size={100} />
    </div>
  );
};

export default Loading;
