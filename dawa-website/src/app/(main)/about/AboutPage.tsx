'use client';
import VideoSection from '@/components/about/VideoSection';
import CustomImage from '@/components/common/CustomImage';
import Logo from '@public/assets/svgs/DAWA_VARIATION_04.svg';
import {
  MdOutlineStar,
  MdOutlineSecurity,
  MdOutlineSupportAgent,
  MdOutlineFlashOn,
} from 'react-icons/md';

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-64">
      <section className="container mx-auto px-4 sm:px-6 lg:px-0 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Text Section */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900">About Dawa</h1>
            <p className="mt-4 text-gray-600 text-lg lg:max-w-[500px] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo className="w-40 h-auto" />
          </div>
        </div>

        {/* Images Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Image (Larger) */}
          <div className="lg:col-span-2 rounded-xl w-auto h-[200px] md:h-[300px] lg:h-[430px] overflow-hidden shadow-lg">
            <CustomImage
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9mZmljZSUyMHdvcmtlcnMlMjBhZnJpY2Fuc3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Team Working"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Right Images (Stacked) */}
          <div className="grid grid-rows-2 gap-6">
            <div className="rounded-xl w-auto h-[200px] md:h-[300px] lg:h-[200px] overflow-hidden shadow-lg">
              <CustomImage
                src="https://images.unsplash.com/photo-1560264357-8d9202250f21?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fG9mZmljZSUyMHdvcmtlcnMlMjBhZnJpY2FucyUyMHByZXNlbnRhdGlvbnN8ZW58MHx8MHx8fDA%3D"
                alt="Team Meeting"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="rounded-xl w-auto h-[200px] md:h-[300px] lg:h-[200px] overflow-hidden shadow-lg">
              <CustomImage
                src="https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fG9mZmljZSUyMHdvcmtlcnMlMjBhZnJpY2FucyUyMHByZXNlbnRhdGlvbnN8ZW58MHx8MHx8fDA%3D"
                alt="Collaboration"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Video Section */}
      <section>
        <VideoSection />
      </section>
      {/* Core Values Section */}
      <section className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">Our Company Core</h2>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {[
            { icon: MdOutlineStar, title: 'Trusted Product' },
            { icon: MdOutlineSecurity, title: 'Secure' },
            { icon: MdOutlineSupportAgent, title: '24/7 Support' },
            { icon: MdOutlineFlashOn, title: 'Fast Response' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center max-w-[300px] px-6 py-12 rounded-xl border border-gray-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary_1 text-white mb-4">
                <item.icon className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
            <CustomImage
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Great Results"
              fill
              style={{ objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
              We believe in great results must have a long progress
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel eros
              eget felis fringilla rutrum.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Always give the best all we have to clear customer
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel eros
              eget felis fringilla rutrum.
            </p>
          </div>

          {/* Image Section */}
          <div className="relative w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
            <CustomImage
              src="https://images.unsplash.com/photo-1584697964357-97a05429b8a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Best Customer Service"
              fill
              style={{ objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
