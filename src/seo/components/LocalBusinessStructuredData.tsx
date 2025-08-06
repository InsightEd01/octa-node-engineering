import React from 'react';
import { localBusinessStructuredData } from '../data/structuredData';

interface LocalBusinessStructuredDataProps {
  customData?: Partial<typeof localBusinessStructuredData>;
}

const LocalBusinessStructuredData: React.FC<LocalBusinessStructuredDataProps> = ({ 
  customData 
}) => {
  const structuredData = {
    ...localBusinessStructuredData,
    ...customData,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

export default LocalBusinessStructuredData;