import React from 'react';
import { SocialSharingProps } from '../types';
import { generateSharingUrls } from '../utils/socialImageGenerator';

export const SocialSharingButtons: React.FC<SocialSharingProps> = ({
  url,
  title,
  description,
  showLabels = true,
  platforms = ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email']
}) => {
  const sharingUrls = generateSharingUrls(url, title, description);

  const platformConfig = {
    facebook: {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    twitter: {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-sky-500 hover:bg-sky-600',
      textColor: 'text-white'
    },
    linkedin: {
      name: 'LinkedIn',
      icon: '💼',
      color: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-white'
    },
    whatsapp: {
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    telegram: {
      name: 'Telegram',
      icon: '✈️',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    email: {
      name: 'Email',
      icon: '📧',
      color: 'bg-gray-600 hover:bg-gray-700',
      textColor: 'text-white'
    }
  };

  const handleShare = (platform: string, shareUrl: string) => {
    if (platform === 'email') {
      window.location.href = shareUrl;
    } else {
      window.open(
        shareUrl,
        `share-${platform}`,
        'width=600,height=400,scrollbars=yes,resizable=yes'
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => {
        const config = platformConfig[platform];
        const shareUrl = sharingUrls[platform];
        
        if (!config || !shareUrl) return null;

        return (
          <button
            key={platform}
            onClick={() => handleShare(platform, shareUrl)}
            className={`
              inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium
              transition-colors duration-200 ${config.color} ${config.textColor}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            `}
            aria-label={`Share on ${config.name}`}
          >
            <span className="mr-2">{config.icon}</span>
            {showLabels && <span>{config.name}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default SocialSharingButtons;