import React from 'react';
import FlashCardManager from '../components/FlashCardManager';

const FlashCardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Flash Card Management</h1>
      <FlashCardManager />
    </div>
  );
};

export default FlashCardPage;
