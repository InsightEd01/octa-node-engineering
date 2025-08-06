// src/admin/services/socialMediaService.ts

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

// Mock database with some initial data
let links: SocialLink[] = [
  { id: 1, platform: 'Twitter', url: 'https://twitter.com/example' },
  { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com/in/example' },
];
let nextId = 3;

// Simulate API latency
const API_LATENCY = 500;

export const getLinks = async (): Promise<SocialLink[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...links]);
    }, API_LATENCY);
  });
};

export const addLink = async (data: { platform: string; url: string }): Promise<SocialLink> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newLink: SocialLink = {
        id: nextId++,
        ...data,
      };
      links = [...links, newLink];
      resolve(newLink);
    }, API_LATENCY);
  });
};

export const removeLink = async (id: number): Promise<{ success: true }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      links = links.filter(link => link.id !== id);
      resolve({ success: true });
    }, API_LATENCY);
  });
};
