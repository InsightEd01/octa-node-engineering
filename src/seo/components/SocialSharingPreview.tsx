import React, { useState } from 'react';
import { SocialPreview } from './SocialPreview';
import { SocialSharingButtons } from './SocialSharingButtons';
import { SocialSharingProps } from '../types';
import { generateSocialImage, generateSocialImageAlt } from '../utils/socialImageGenerator';

// Import social media icons
import FacebookIcon from '../../../assets/facebook.svg';
import TwitterIcon from '../../../assets/twitter.svg';
import LinkedInIcon from '../../../assets/linkedin.svg';

interface SocialSharingPreviewProps extends SocialSharingProps {
  showPreview?: boolean;
  previewPlatform?: 'facebook' | 'twitter' | 'linkedin';
}

export const SocialSharingPreview: React.FC<SocialSharingPreviewProps> = ({
  url,
  title,
  description,
  image,
  showLabels = true,
  platforms = ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email'],
  showPreview = false,
  previewPlatform = 'facebook'
}) => {
  const [selectedPreviewPlatform, setSelectedPreviewPlatform] = useState<'facebook' | 'twitter' | 'linkedin'>(previewPlatform);
  const [showPreviewPanel, setShowPreviewPanel] = useState(showPreview);

  // Generate social image if not provided
  const socialImage = image || generateSocialImage({
    title,
    type: 'default'
  });

  const socialImageAlt = generateSocialImageAlt(title, description);

  return (
    <div className="space-y-4">
      {/* Social Sharing Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Share this page</h3>
          <SocialSharingButtons
            url={url}
            title={title}
            description={description}
            showLabels={showLabels}
            platforms={platforms}
          />
        </div>
        
        {/* Preview Toggle */}
        <button
          onClick={() => setShowPreviewPanel(!showPreviewPanel)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {showPreviewPanel ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      {/* Social Media Preview Panel */}
      {showPreviewPanel && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex flex-col space-y-4">
            {/* Platform Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Preview for:</span>
                <div className="flex space-x-2">
                  {([
                    { platform: 'facebook', icon: FacebookIcon, name: 'Facebook' },
                    { platform: 'twitter', icon: TwitterIcon, name: 'Twitter' },
                    { platform: 'linkedin', icon: LinkedInIcon, name: 'LinkedIn' }
                  ] as const).map(({ platform, icon, name }) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPreviewPlatform(platform)}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                        selectedPreviewPlatform === platform
                          ? 'bg-blue-100 border-2 border-blue-200 shadow-sm'
                          : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                      title={`Preview for ${name}`}
                      aria-label={`Preview for ${name}`}
                    >
                      <img src={icon} alt={`${name} icon`} className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div className="flex justify-center">
              <SocialPreview
                title={title}
                description={description}
                image={socialImage}
                url={url}
                type="website"
                platform={selectedPreviewPlatform}
                showPreview={true}
              />
            </div>

            {/* Preview Details */}
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Description:</strong> {description}</p>
              <p><strong>Image:</strong> {socialImage}</p>
              <p><strong>Image Alt:</strong> {socialImageAlt}</p>
              <p><strong>URL:</strong> {url}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialSharingPreview;