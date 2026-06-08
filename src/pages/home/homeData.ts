export const featureSections = [
  { id: 'education', label: 'Education' },
  { id: 'timing', label: 'Timing' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'operations', label: 'Operations' },
  { id: 'banking', label: 'Banking' },
] as const;

export const contactEmail = 'info@octanode.co';

export const buildMailto = (source: string, email?: string) => {
  const body = email
    ? `Hello Octa Node Engineering,%0D%0A%0D%0AI would like to discuss a project. My email is ${encodeURIComponent(email)}.`
    : 'Hello Octa Node Engineering,%0D%0A%0D%0AI would like to discuss a project.';

  return `mailto:${contactEmail}?subject=${encodeURIComponent(`Octa Node enquiry from ${source}`)}&body=${body}`;
};
