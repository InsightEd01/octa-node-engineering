// src/admin/services/flashCardService.ts

export interface FlashCard {
  id: number;
  frontContent: string;
  backContent: string;
  isActive: boolean;
  scheduledDate: string | null;
  isNew?: boolean; // This is a UI-only property, won't be in the real API
}

// Mock database
let flashCards: FlashCard[] = [];
let nextId = 1;

// Simulate API latency
const API_LATENCY = 500;

export const getFlashCards = async (): Promise<FlashCard[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...flashCards]);
    }, API_LATENCY);
  });
};

export const addFlashCard = async (data: { frontContent: string; backContent: string; scheduledDate: string | null }): Promise<FlashCard> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newCard: FlashCard = {
        id: nextId++,
        ...data,
        isActive: true,
      };
      flashCards = [newCard, ...flashCards];
      resolve(newCard);
    }, API_LATENCY);
  });
};

export const removeFlashCard = async (id: number): Promise<{ success: true }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      flashCards = flashCards.filter(card => card.id !== id);
      resolve({ success: true });
    }, API_LATENCY);
  });
};

export const updateFlashCard = async (id: number, updates: Partial<FlashCard>): Promise<FlashCard> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cardIndex = flashCards.findIndex(card => card.id === id);
      if (cardIndex === -1) {
        return reject(new Error('Flash card not found'));
      }
      const updatedCard = { ...flashCards[cardIndex], ...updates };
      flashCards[cardIndex] = updatedCard;
      resolve(updatedCard);
    }, API_LATENCY);
  });
};
