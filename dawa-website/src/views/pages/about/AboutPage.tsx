'use client';
import VideoSection from './VideoSection';
import CustomImage from '@/components/shared/CustomImage';
import mainConfig from '@/configs/mainConfigs';
import Logo from '@public/assets/svgs/DAWA_VARIATION_04.svg';
import {
  MdOutlineStar,
  MdOutlineSecurity,
  MdOutlineSupportAgent,
  MdOutlineFlashOn,
} from 'react-icons/md';

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className={`${mainConfig.maxWidthClass} w-full pt-12`}>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Text Section */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome to Dawa Marketplace
            </h1>
            <p className="mt-4 text-gray-600 text-lg lg:max-w-[500px] leading-relaxed">
              Dawa is Uganda’s premier online marketplace—your one-stop hub for
              buying, selling, and advertising products. Whether you’re a small
              business owner, a casual seller, or a bargain hunter, Dawa brings
              thousands of listings right to your fingertips.
            </p>
          </div>
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo className="w-40 h-auto" />
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className={`${mainConfig.maxWidthClass} w-full`}>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Image */}
          <div className="lg:col-span-2 rounded-xl w-full h-[220px] md:h-[320px] lg:h-[450px] overflow-hidden shadow-lg">
            <CustomImage
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
              alt="Marketplace hustle"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Stacked Images */}
          <div className="grid grid-rows-2 gap-6">
            <div className="rounded-xl w-full h-[220px] md:h-[320px] lg:h-[220px] overflow-hidden shadow-lg">
              <CustomImage
                src="https://images.unsplash.com/photo-1602526210198-d8f4a1d85b79?auto=format&fit=crop&w=800&q=80"
                alt="Local vendor showcasing products"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="rounded-xl w-full h-[220px] md:h-[320px] lg:h-[220px] overflow-hidden shadow-lg">
              <CustomImage
                src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=800&q=80"
                alt="Happy customers"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Core Values / Features Section */}
      <section className={`${mainConfig.maxWidthClass} text-center`}>
        <h2 className="text-3xl font-bold text-gray-900">Why Choose Dawa?</h2>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
          Our mission is to empower Ugandans to connect, trade, and grow their
          businesses in a trusted and secure environment.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {[
            {
              icon: MdOutlineStar,
              title: 'Trusted Listings',
              description:
                'Every listing is verified to ensure you shop with confidence.',
            },
            {
              icon: MdOutlineSecurity,
              title: 'Secure Transactions',
              description:
                'We prioritize your safety with secure payment and delivery options.',
            },
            {
              icon: MdOutlineSupportAgent,
              title: '24/7 Support',
              description:
                'Our customer support team is here to help you anytime.',
            },
            {
              icon: MdOutlineFlashOn,
              title: 'Fast & Easy',
              description:
                'Quick posting and seamless navigation to buy and sell with ease.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center max-w-[300px] px-6 py-12 rounded-xl border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary_1 text-white mb-4">
                <item.icon className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className={`${mainConfig.maxWidthClass} py-12`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <CustomImage
              src="https://images.unsplash.com/photo-1580910051073-9b4171ee4643?auto=format&fit=crop&w=1200&q=80"
              alt="Start trading on Dawa"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Join Thousands of Happy Traders
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              From fresh produce and electronics to fashion and home essentials,
              Dawa connects buyers and sellers from every corner of Uganda.
              Ready to start your trading journey?
            </p>
          </div>
        </div>
      </section>

      {/* More About Us Section */}
      <section className={`${mainConfig.maxWidthClass} py-12`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Our Story
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Founded with the vision to empower local businesses and foster
              community trade, Dawa has grown into Uganda’s go-to marketplace.
              Our platform is designed to make buying, selling, and advertising
              simple and accessible for everyone.
            </p>
          </div>

          {/* Image Section */}
          <div className="relative w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <CustomImage
              src="https://images.unsplash.com/photo-1518606374432-4e2a7f68f0d4?auto=format&fit=crop&w=1200&q=80"
              alt="Our journey at Dawa"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
