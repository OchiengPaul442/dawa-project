'use client';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-primary_1 text-white py-2">
      <div className="container mx-auto flex flex-wrap justify-between items-center text-sm px-4 gap-y-2">
        {/* Left Section */}
        <div className="flex flex-wrap gap-4 items-center">
          <a
            href="tel:+256702108552"
            aria-label="Call us at +256 702108552"
            className="flex items-center space-x-2"
          >
            <FaPhoneAlt aria-hidden="true" />
            <span className="hover:underline focus:outline-none focus:underline hidden md:inline">
              +256 702108552
            </span>
          </a>

          <a
            href="mailto:dawaonlinestore@gmail.com"
            aria-label="Email us at dawaonlinestore@gmail.com"
            className="flex items-center space-x-2"
          >
            <FaEnvelope aria-hidden="true" />
            <span className="hover:underline focus:outline-none focus:underline hidden md:inline">
              dawaonlinestore@gmail.com
            </span>
          </a>
        </div>

        {/* Right Section */}
        <a
          href="#"
          aria-label="View store locations"
          className="flex items-center space-x-2"
        >
          <FaMapMarkerAlt aria-hidden="true" />
          <span className="hover:underline focus:outline-none focus:underline hidden md:inline">
            Store Locations
          </span>
        </a>
      </div>
    </div>
  );
};

export default TopBar;
