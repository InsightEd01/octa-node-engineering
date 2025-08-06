import { products } from '../data/products';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export class SitemapGenerator {
  private baseUrl: string;
  private currentDate: string;

  constructor(baseUrl: string = 'https://octanode.online') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  /**
   * Generate all sitemap URLs for the website
   */
  generateSitemapUrls(): SitemapUrl[] {
    const urls: SitemapUrl[] = [];

    // Home page - highest priority
    urls.push({
      loc: this.baseUrl + '/',
      lastmod: this.currentDate,
      changefreq: 'weekly',
      priority: 1.0
    });

    // Product pages - high priority
    products.forEach(product => {
      urls.push({
        loc: this.baseUrl + `/product/${product.id}`,
        lastmod: this.currentDate,
        changefreq: 'monthly',
        priority: 0.8
      });
    });

    // Static pages - medium priority
    const staticPages = [
      { path: '/privacy', changefreq: 'yearly' as const, priority: 0.3 },
      { path: '/terms', changefreq: 'yearly' as const, priority: 0.3 }
    ];

    staticPages.forEach(page => {
      urls.push({
        loc: this.baseUrl + page.path,
        lastmod: this.currentDate,
        changefreq: page.changefreq,
        priority: page.priority
      });
    });

    return urls;
  }

  /**
   * Generate XML sitemap content
   */
  generateXMLSitemap(): string {
    const urls = this.generateSitemapUrls();
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    
    return xml;
  }

  /**
   * Generate sitemap for build process
   */
  static generateSitemapForBuild(_outputPath: string, baseUrl?: string): string {
    const generator = new SitemapGenerator(baseUrl);
    const sitemapContent = generator.generateXMLSitemap();
    
    // This would be used in a build script
    console.log('Generated sitemap content:');
    console.log(sitemapContent);
    
    return sitemapContent;
  }
}

// Export default instance for easy use
export const sitemapGenerator = new SitemapGenerator();