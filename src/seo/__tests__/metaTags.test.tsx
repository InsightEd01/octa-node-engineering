import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { seoConfig } from '../data/seoConfig';

describe('Meta Tag Integration Tests', () => {
  it('renders default meta tags on homepage', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(document.title).toContain(seoConfig.defaultTitle);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      seoConfig.defaultDescription
    );
  });

  it('renders page-specific meta tags on product pages', () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <App />
      </MemoryRouter>
    );

    expect(document.title).toContain('Product');
  });
});
