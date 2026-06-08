import React from 'react';

export type FeatureIconName = 'education' | 'timing' | 'commerce' | 'operations' | 'banking';

type FeatureIconProps = {
  name: FeatureIconName;
};

const paths: Record<FeatureIconName, React.ReactNode> = {
  education: (
    <>
      <path d="M3.5 8.5 12 4l8.5 4.5L12 13 3.5 8.5Z" />
      <path d="M6.5 10.2v4.1c0 1.2 2.5 2.7 5.5 2.7s5.5-1.5 5.5-2.7v-4.1" />
      <path d="M20.5 8.5v5" />
    </>
  ),
  timing: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 7.5V12l3 2" />
      <path d="M8.4 3.2 6.8 5" />
      <path d="M15.6 3.2 17.2 5" />
    </>
  ),
  commerce: (
    <>
      <path d="M7 9h10l-.7 9.2A2 2 0 0 1 14.3 20H9.7a2 2 0 0 1-2-1.8L7 9Z" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" />
      <path d="M9.5 13h5" />
    </>
  ),
  operations: (
    <>
      <rect x="4" y="5" width="16" height="13" rx="3" />
      <path d="M8 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
      <path d="M8 12h8" />
      <path d="M8 15h5" />
    </>
  ),
  banking: (
    <>
      <path d="M4 9h16L12 4 4 9Z" />
      <path d="M6 9v8" />
      <path d="M10 9v8" />
      <path d="M14 9v8" />
      <path d="M18 9v8" />
      <path d="M4 18.5h16" />
    </>
  ),
};

const FeatureIcon: React.FC<FeatureIconProps> = ({ name }) => (
  <span className="octa-feature-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      {paths[name]}
    </svg>
  </span>
);

export default FeatureIcon;
