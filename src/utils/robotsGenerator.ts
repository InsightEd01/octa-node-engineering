export interface RobotsRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
  crawlDelay?: number;
}

export class RobotsGenerator {
  private baseUrl: string;
  private alternateUrl: string;
  private rules: RobotsRule[];
  private sitemaps: string[];

  constructor(baseUrl: string = 'https://octanode.online', alternateUrl: string = 'https://octanode.co') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.alternateUrl = alternateUrl.replace(/\/$/, '');
    this.rules = [];
    this.sitemaps = [];
  }

  /**
   * Add a robots rule
   */
  addRule(rule: RobotsRule): void {
    this.rules.push(rule);
  }

  /**
   * Add sitemap URL
   */
  addSitemap(sitemapUrl: string): void {
    this.sitemaps.push(sitemapUrl);
  }

  /**
   * Generate default rules for Octa Node Engineering
   */
  generateDefaultRules(): void {
    // General rule for all bots
    this.addRule({
      userAgent: '*',
      allow: [
        '/',
        '/product/',
        '/product/*',
        '/privacy',
        '/terms',
        '/blog'
      ],
      disallow: [
        '/admin/',
        '/admin/*',
        '/*.json$',
        '/api/',
        '/_*',
        '/.*'
      ],
      crawlDelay: 1
    });

    // Specific rules for major search engines
    this.addRule({
      userAgent: 'Googlebot',
      allow: ['/'],
      disallow: ['/admin/'],
      crawlDelay: 1
    });

    this.addRule({
      userAgent: 'Googlebot-Image',
      allow: ['/assets/', '/images/']
    });

    this.addRule({
      userAgent: 'Bingbot',
      allow: ['/'],
      disallow: ['/admin/'],
      crawlDelay: 1
    });

    this.addRule({
      userAgent: 'Yandex',
      allow: ['/'],
      disallow: ['/admin/'],
      crawlDelay: 2
    });

    this.addRule({
      userAgent: 'Baiduspider',
      allow: ['/'],
      disallow: ['/admin/'],
      crawlDelay: 2
    });

    this.addRule({
      userAgent: 'DuckDuckBot',
      allow: ['/'],
      disallow: ['/admin/']
    });

    // Social media bots for rich previews
    this.addRule({
      userAgent: 'facebookexternalhit',
      allow: ['/']
    });

    this.addRule({
      userAgent: 'Twitterbot',
      allow: ['/']
    });

    this.addRule({
      userAgent: 'LinkedInBot',
      allow: ['/']
    });

    this.addRule({
      userAgent: 'WhatsApp',
      allow: ['/']
    });

    // Add sitemaps for both domains
    this.addSitemap(`${this.baseUrl}/sitemap.xml`);
    this.addSitemap(`${this.alternateUrl}/sitemap.xml`);
  }

  /**
   * Generate robots.txt content
   */
  generateRobotsTxt(): string {
    let content = `# Robots.txt for Octa Node Engineering (OctaNode)\n`;
    content += `# Primary: ${this.baseUrl}\n`;
    content += `# Alternate: ${this.alternateUrl}\n\n`;

    // Add rules
    this.rules.forEach(rule => {
      content += `User-agent: ${rule.userAgent}\n`;

      // Add allow rules
      if (rule.allow && rule.allow.length > 0) {
        rule.allow.forEach(path => {
          content += `Allow: ${path}\n`;
        });
      }

      // Add disallow rules
      if (rule.disallow && rule.disallow.length > 0) {
        rule.disallow.forEach(path => {
          content += `Disallow: ${path}\n`;
        });
      }

      // Add crawl delay
      if (rule.crawlDelay) {
        content += `Crawl-delay: ${rule.crawlDelay}\n`;
      }

      content += '\n';
    });

    // Add sitemaps
    if (this.sitemaps.length > 0) {
      content += '# Sitemap locations\n';
      this.sitemaps.forEach(sitemap => {
        content += `Sitemap: ${sitemap}\n`;
      });
      content += '\n';
    }

    // Add Host directive
    content += `# Preferred host\nHost: ${this.baseUrl}\n`;

    return content;
  }

  /**
   * Generate robots.txt for build process
   */
  static generateRobotsForBuild(baseUrl?: string): string {
    const generator = new RobotsGenerator(baseUrl);
    generator.generateDefaultRules();
    return generator.generateRobotsTxt();
  }
}

// Export default instance for easy use
export const robotsGenerator = new RobotsGenerator();