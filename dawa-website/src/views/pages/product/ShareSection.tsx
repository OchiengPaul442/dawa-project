import React from 'react';
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
  FaLink,
} from 'react-icons/fa';

const ShareSection: React.FC = () => {
  return (
    <div className="mt-10 flex items-center space-x-4">
      <span className="font-bold text-gray-800">Share:</span>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-xl hover:bg-blue-200 transition duration-300"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="text-blue-600" size={18} />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center bg-sky-100 rounded-xl hover:bg-sky-200 transition duration-300"
        aria-label="Share on Twitter"
      >
        <FaTwitter className="text-sky-500" size={18} />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-xl hover:bg-blue-200 transition duration-300"
        aria-label="Share on Facebook"
      >
        <FaFacebook className="text-blue-700" size={18} />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-xl hover:bg-green-200 transition duration-300"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp className="text-green-500" size={18} />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-xl hover:bg-orange-200 transition duration-300"
        aria-label="Copy Link"
      >
        <FaLink className="text-orange-500" size={18} />
      </a>
    </div>
  );
};

export default ShareSection;
