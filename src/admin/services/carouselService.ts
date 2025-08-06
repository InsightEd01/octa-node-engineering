// src/admin/services/carouselService.ts

export interface CarouselImage {
  id: number;
  src: string;
  caption: string;
}

// Mock database with some initial data
let images: CarouselImage[] = [
  { id: 1, src: 'https://via.placeholder.com/800x400/6366f1/ffffff?text=Slide+1', caption: 'First Slide' },
  { id: 2, src: 'https://via.placeholder.com/800x400/10b981/ffffff?text=Slide+2', caption: 'Second Slide' },
  { id: 3, src: 'https://via.placeholder.com/800x400/ef4444/ffffff?text=Slide+3', caption: 'Third Slide' },
];
let nextId = 4;

// Simulate API latency
const API_LATENCY = 500;

export const getImages = async (): Promise<CarouselImage[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...images]);
    }, API_LATENCY);
  });
};

export const addImage = async (data: { src: string; caption: string }): Promise<CarouselImage> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newImage: CarouselImage = {
        id: nextId++,
        ...data,
      };
      images.push(newImage);
      resolve(newImage);
    }, API_LATENCY);
  });
};

export const removeImage = async (id: number): Promise<{ success: true }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      images = images.filter(image => image.id !== id);
      resolve({ success: true });
    }, API_LATENCY);
  });
};

export const updateImageOrder = async (orderedIds: number[]): Promise<CarouselImage[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const orderedImages = orderedIds.map(id => images.find(img => img.id === id)).filter(Boolean) as CarouselImage[];
      images = orderedImages;
      resolve([...images]);
    }, API_LATENCY);
  });
};
