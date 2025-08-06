import { useState, useEffect } from 'react';
import { generateSharingUrls, generateSocialImage } from '../utils/socialImageGenerator';

interface UseSocialSharingProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'default' | 'product' | 'article';
}

export const useSocialSharing = ({
  title,
  description,
  url,
  image,
  type = 'default'
}: UseSocialSharingProps) => {
  const [currentUrl, setCurrentUrl] = useState(url || '');
  const [socialImage, setSocialImage] = useState(image || '');
  const [sharingUrls, setSharingUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    // Set current URL if not provided
    if (!url && typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  useEffect(() => {
    // Generate social image if not provided
    if (!image) {
      const generatedImage = generateSocialImage({ title, type });
      setSocialImage(generatedImage);
    }
  }, [image, title, type]);

  useEffect(() => {
    // Generate sharing URLs when dependencies change
    if (currentUrl && title && description) {
      const urls = generateSharingUrls(currentUrl, title, description);
      setSharingUrls(urls);
    }
  }, [currentUrl, title, description]);

  const shareToSocial = (platform: string) => {
    const shareUrl = sharingUrls[platform];
    if (!shareUrl) return;

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  };

  const canShare = () => {
    return 'share' in navigator;
  };

  const nativeShare = async () => {
    if (!canShare()) return false;

    try {
      await navigator.share({
        title,
        text: description,
        url: currentUrl
      });
      return true;
    } catch (error) {
      console.error('Native sharing failed:', error);
      return false;
    }
  };

  return {
    currentUrl,
    socialImage,
    sharingUrls,
    shareToSocial,
    copyToClipboard,
    canShare,
    nativeShare
  };
};

export default useSocialSharing;