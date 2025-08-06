import React from 'react';
import { organizationStructuredData } from '../data/structuredData';

interface OrganizationStructuredDataProps {
  customData?: Partial<typeof organizationStructuredData>;
}

const OrganizationStructuredData: React.FC<OrganizationStructuredDataProps> = ({ 
  customData 
}) => {
  const structuredData = {
    ...organizationStructuredData,
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

export default OrganizationStructuredData;