import React from 'react';
import {
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
  FaLink,
  FaXTwitter,
} from 'react-icons/fa6';

interface ShareSectionProps {
  url?: string;
  title: string;
  description?: string;
}

const ShareSection: React.FC<ShareSectionProps> = ({
  url = window.location.href,
  title = document.title,
  description = '',
}) => {
  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      color: 'blue',
      bgColor: 'bg-blue-100',
      hoverBgColor: 'hover:bg-blue-200',
      textColor: 'text-blue-600',
      getShareUrl: () =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'X', // Updated name
      icon: FaXTwitter, // Updated icon
      color: 'neutral', // Updated color scheme for X
      bgColor: 'bg-gray-100', // Changed to a neutral gray
      hoverBgColor: 'hover:bg-gray-200',
      textColor: 'text-black', // X uses black as its primary color
      getShareUrl: () =>
        `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      color: 'blue',
      bgColor: 'bg-blue-100',
      hoverBgColor: 'hover:bg-blue-200',
      textColor: 'text-blue-700',
      getShareUrl: () =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'green',
      bgColor: 'bg-green-100',
      hoverBgColor: 'hover:bg-green-200',
      textColor: 'text-green-500',
      getShareUrl: () =>
        `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
      alert('Failed to copy link to clipboard');
    }
  };

  const handleShare = (shareUrl: string, platform: string) => {
    window.open(shareUrl, `Share on ${platform}`, 'width=600,height=400');
  };

  return (
    <div className="mt-10 flex items-center space-x-4">
      <span className="font-bold text-gray-800">Share:</span>

      {shareLinks.map((platform) => {
        const Icon = platform.icon;
        return (
          <button
            key={platform.name}
            onClick={() => handleShare(platform.getShareUrl(), platform.name)}
            className={`w-10 h-10 flex items-center justify-center ${platform.bgColor} ${platform.hoverBgColor} rounded-xl transition duration-300`}
            aria-label={`Share on ${platform.name}`}
          >
            <Icon className={platform.textColor} size={18} />
          </button>
        );
      })}

      <button
        onClick={handleCopyLink}
        className="w-10 h-10 flex items-center justify-center bg-orange-100 hover:bg-orange-200 rounded-xl transition duration-300"
        aria-label="Copy Link"
      >
        <FaLink className="text-orange-500" size={18} />
      </button>
    </div>
  );
};

export default ShareSection;
