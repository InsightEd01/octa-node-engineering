import React from 'react';
import { SocialSharingProps } from '../types';
import { generateSharingUrls } from '../utils/socialImageGenerator';

// Import social media icons
import FacebookIcon from '../../../assets/facebook.svg';
import TwitterIcon from '../../../assets/twitter.svg';
import LinkedInIcon from '../../../assets/linkedin.svg';
import WhatsAppIcon from '../../../assets/whatsapp.svg';
import TelegramIcon from '../../../assets/telegram.svg';
import EmailIcon from '../../../assets/email.svg';

export const SocialSharingButtons: React.FC<SocialSharingProps> = ({
  url,
  title,
  description,
  platforms = ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email']
}) => {
  const sharingUrls = generateSharingUrls(url, title, description);

  const platformConfig = {
    facebook: {
      name: 'Facebook',
      icon: FacebookIcon,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    twitter: {
      name: 'Twitter',
      icon: TwitterIcon,
      color: 'bg-sky-500 hover:bg-sky-600',
      textColor: 'text-white'
    },
    linkedin: {
      name: 'LinkedIn',
      icon: LinkedInIcon,
      color: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-white'
    },
    whatsapp: {
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    telegram: {
      name: 'Telegram',
      icon: TelegramIcon,
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    email: {
      name: 'Email',
      icon: EmailIcon,
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
              inline-flex items-center justify-center px-3 py-3 rounded-lg text-sm font-medium
              transition-colors duration-200 ${config.color} ${config.textColor}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              hover:scale-105 hover:shadow-lg
            `}
            aria-label={`Share on ${config.name}`}
            title={`Share on ${config.name}`}
          >
            <img src={config.icon} alt={`${config.name} icon`} className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
};

export default SocialSharingButtons;