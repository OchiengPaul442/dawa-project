import React from 'react';
import Link from 'next/link';

interface LinkProps {
  href: string;
  label: string;
}

interface FooterLinkSectionProps {
  title: string;
  links: LinkProps[];
  isAuthenticated?: boolean;
}

const FooterLinkSection: React.FC<FooterLinkSectionProps> = ({
  title,
  links,
  isAuthenticated = false, // Default to false if not provided
}) => {
  // Filter out 'Login' and 'Sign Up' links if authenticated
  const filteredLinks = links.filter((link) => {
    if (isAuthenticated) {
      return link.href !== '/login' && link.href !== '/register';
    }
    return true;
  });

  return (
    <div className="text-left">
      <h3 className="text-lg font-bold mb-3 text-black">{title}</h3>
      <ul className="space-y-2">
        {filteredLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="hover:underline text-gray-600">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkSection;
