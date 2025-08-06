import { render, screen } from '@testing-library/react';
import { SEOHead } from '../components/SEOHead';
import { seoConfig } from '../data/seoConfig';

describe('SEOHead Component', () => {
  const testProps = {
    title: 'Test Page',
    description: 'This is a test description',
    keywords: ['test', 'keywords'],
    url: '/test-url'
  };

  it('renders correct title tag', () => {
    render(<SEOHead {...testProps} />);
    expect(document.title).toBe(`${testProps.title} | ${seoConfig.defaultTitle}`);
  });

  it('renders meta description', () => {
    render(<SEOHead {...testProps} />);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      testProps.description
    );
  });

  it('renders canonical URL when provided', () => {
    render(<SEOHead {...testProps} canonical="https://example.com/test" />);
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://example.com/test'
    );
  });
});
