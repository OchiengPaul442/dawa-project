import Logo from '@public/assets/svgs/DAWA_VARIATION_04.svg';
import Link from 'next/link';
import React from 'react';
import {
  FaFacebook,
  FaHeadset,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 py-12 gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col items-start text-left">
          <Link href="/">
            <Logo className="w-auto h-24 -ml-8 -mb-5 mt-[-34px]" />
          </Link>
          <p className="mb-4 text-gray-600 max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex space-x-3">
            <SocialIconLink href="#" ariaLabel="Youtube" icon={<FaYoutube />} />
            <SocialIconLink
              href="#"
              ariaLabel="LinkedIn"
              icon={<FaLinkedin />}
            />
            <SocialIconLink href="#" ariaLabel="Twitter" icon={<FaTwitter />} />
            <SocialIconLink
              href="#"
              ariaLabel="Facebook"
              icon={<FaFacebook />}
            />
            <SocialIconLink
              href="#"
              ariaLabel="Instagram"
              icon={<FaInstagram />}
            />
          </div>
        </div>

        {/* Quick Links */}
        <FooterLinkSection
          title="Quick Links"
          links={[
            { href: '/about', label: 'About us' },
            { href: '#', label: 'Contact us' },
            { href: '/cat', label: 'Categories' },
            { href: '/login', label: 'Login' },
            { href: '/register', label: 'Sign Up' },
          ]}
        />

        {/* Customer Area */}
        <FooterLinkSection
          title="Customer Area"
          links={[
            { href: '/legal/terms', label: 'Terms' },
            { href: '/legal/privacy', label: 'Privacy Policy' },
            { href: '/legal/billing', label: 'Billing Policy' },
            { href: '/faqs', label: 'FAQs' },
            { href: '/subscriptions', label: 'Subscriptions' },
          ]}
        />

        {/* Contact */}
        <div className="text-left">
          <h3 className="text-lg font-bold mb-3 text-black">Contact</h3>
          <p className="mb-4 text-gray-600 max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut.
          </p>
          <div className="flex items-center space-x-2">
            <FaHeadset className="text-gray-600 text-2xl" />
            <div>
              <p className="text-sm">Have any question?</p>
              <a href="tel:+256702108552" className="text-primary_1 font-bold">
                +256 702 108 552
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-200 py-4 text-sm text-gray-500">
        <p>DAWA &copy; {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </footer>
  );
};

interface SocialIconLinkProps {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
}

const SocialIconLink: React.FC<SocialIconLinkProps> = ({
  href,
  ariaLabel,
  icon,
}) => (
  <a
    href={href}
    aria-label={ariaLabel}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-md text-[#4E4E4E] opacity-45 hover:opacity-100 bg-gray-200 hover:bg-primary_2 hover:text-primary_1 transition-colors duration-200"
  >
    {icon}
  </a>
);

interface FooterLinkSectionProps {
  title: string;
  links: { href: string; label: string }[];
}

const FooterLinkSection: React.FC<FooterLinkSectionProps> = ({
  title,
  links,
}) => (
  <div className="text-left">
    <h3 className="text-lg font-bold mb-3 text-black">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="hover:underline text-gray-600">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
