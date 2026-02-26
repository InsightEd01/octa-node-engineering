import { products } from '../data/products';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: { hreflang: string; href: string }[];
  images?: { loc: string; title: string; caption: string }[];
}

export class SitemapGenerator {
  private baseUrl: string;
  private alternateUrl: string;
  private currentDate: string;

  constructor(baseUrl: string = 'https://octanode.online', alternateUrl: string = 'https://octnode.co') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.alternateUrl = alternateUrl.replace(/\/$/, '');
    this.currentDate = new Date().toISOString().split('T')[0];
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
      priority: 1.0,
      alternates: [
        { hreflang: 'en', href: this.baseUrl + '/' },
        { hreflang: 'en', href: this.alternateUrl + '/' },
        { hreflang: 'x-default', href: this.baseUrl + '/' }
      ],
      images: [
        {
          loc: this.baseUrl + '/assets/logo.png',
          title: 'Octa Node Engineering Logo',
          caption: 'Octa Node Engineering - AI Solutions for Business and Education in Nigeria'
        }
      ]
    });

    // Product pages - high priority
    products.forEach(product => {
      const productPath = `/product/${product.id}`;
      const productImages = product.images.map((img) => ({
        loc: img.startsWith('http') ? img : this.baseUrl + img,
        title: `${product.name} - ${product.category} by Octa Node Engineering`,
        caption: `${product.name}: ${product.description.substring(0, 120)}`
      }));

      urls.push({
        loc: this.baseUrl + productPath,
        lastmod: this.currentDate,
        changefreq: 'monthly',
        priority: 0.9,
        alternates: [
          { hreflang: 'en', href: this.baseUrl + productPath },
          { hreflang: 'en', href: this.alternateUrl + productPath }
        ],
        images: productImages
      });
    });

    // Blog page
    urls.push({
      loc: this.baseUrl + '/blog',
      lastmod: this.currentDate,
      changefreq: 'weekly',
      priority: 0.7,
      alternates: [
        { hreflang: 'en', href: this.baseUrl + '/blog' },
        { hreflang: 'en', href: this.alternateUrl + '/blog' }
      ]
    });

    // Static pages - medium-low priority
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
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;

      // Add hreflang alternates
      if (url.alternates) {
        url.alternates.forEach(alt => {
          xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>\n`;
        });
      }

      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;

      // Add image info
      if (url.images) {
        url.images.forEach(img => {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${img.loc}</image:loc>\n`;
          xml += `      <image:title>${img.title}</image:title>\n`;
          xml += `      <image:caption>${img.caption}</image:caption>\n`;
          xml += '    </image:image>\n';
        });
      }

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

    console.log('Generated sitemap content:');
    console.log(sitemapContent);

    return sitemapContent;
  }
}

// Export default instance for easy use
export const sitemapGenerator = new SitemapGenerator();