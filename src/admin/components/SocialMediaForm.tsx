import React, { useState, useEffect } from 'react';
import { SocialLink, getLinks, addLink as apiAddLink, removeLink as apiRemoveLink } from '../services/socialMediaService';

const SocialMediaForm: React.FC = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [newPlatform, setNewPlatform] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState<{ platform?: string; url?: string }>({});

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const fetchedLinks = await getLinks();
        setLinks(fetchedLinks);
      } catch (error) {
        console.error('Failed to fetch social media links:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const validate = () => {
    const newErrors: { platform?: string; url?: string } = {};
    if (!newPlatform.trim()) {
      newErrors.platform = 'Platform cannot be empty.';
    }
    if (!newUrl.trim()) {
      newErrors.url = 'URL cannot be empty.';
    } else {
      try {
        new URL(newUrl);
      } catch (_) {
        newErrors.url = 'Please enter a valid URL.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddLink = async () => {
    if (!validate() || isAdding) return;

    setIsAdding(true);
    try {
      const newLink = await apiAddLink({ platform: newPlatform, url: newUrl });
      setLinks([...links, newLink]);
      setNewPlatform('');
      setNewUrl('');
      setErrors({});
    } catch (error) {
      console.error('Failed to add link:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveLink = async (id: number) => {
    try {
      await apiRemoveLink(id);
      setLinks(links.filter(link => link.id !== id));
    } catch (error) {
      console.error('Failed to remove link:', error);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Manage Social Media Links</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Platform (e.g., Twitter)"
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value)}
            className="input-field w-full"
          />
          {errors.platform && <p className="error-text">{errors.platform}</p>}
        </div>
        <div className="flex-grow-[2]">
          <input
            type="url"
            placeholder="URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="input-field w-full"
          />
          {errors.url && <p className="error-text">{errors.url}</p>}
        </div>
        <button onClick={handleAddLink} className={`btn btn-primary ${isAdding ? 'is-loading' : ''}`} disabled={isAdding}>
          Add Link
        </button>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading links...</div>
      ) : (
        <div className="space-y-2">
          {links.map(link => (
            <div key={link.id} className="flex items-center justify-between p-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <span className="font-semibold">{link.platform}: </span>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="link">
                  {link.url}
                </a>
              </div>
              <button onClick={() => handleRemoveLink(link.id)} className="btn-danger-text">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialMediaForm;
