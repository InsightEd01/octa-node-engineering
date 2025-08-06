import { writeFileSync } from 'fs';
import { join } from 'path';

// Import the products data (we need to handle ES modules in Node.js)
const products = [
  {
    id: 'stylus-ai',
    name: 'Stylus AI'
  },
  {
    id: 'ti-bot',
    name: 'TI-BOT'
  }
];

class RobotsGenerator {
  constructor(baseUrl = 'https://octanode.online') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  generateRobotsTxt() {
    let content = `# Robots.txt for Octa Node Engineering\n`;
    content += `# ${this.baseUrl}\n\n`;

    content += `# Allow all search engines to crawl the site\n`;
    content += `User-agent: *\n`;
    content += `Allow: /\n\n`;

    content += `# Disallow admin routes and sensitive areas\n`;
    content += `Disallow: /admin/\n`;
    content += `Disallow: /admin/*\n\n`;

    content += `# Allow specific important pages\n`;
    content += `Allow: /\n`;
    content += `Allow: /product/\n`;
    content += `Allow: /product/*\n`;
    content += `Allow: /privacy\n`;
    content += `Allow: /terms\n\n`;

    content += `# Crawl delay to be respectful to server resources\n`;
    content += `Crawl-delay: 1\n\n`;

    content += `# Sitemap location\n`;
    content += `Sitemap: ${this.baseUrl}/sitemap.xml\n\n`;

    content += `# Specific rules for major search engines\n`;
    content += `User-agent: Googlebot\n`;
    content += `Allow: /\n`;
    content += `Disallow: /admin/\n`;
    content += `Crawl-delay: 1\n\n`;

    content += `User-agent: Bingbot\n`;
    content += `Allow: /\n`;
    content += `Disallow: /admin/\n`;
    content += `Crawl-delay: 1\n\n`;

    content += `# Block any potential scraping bots from sensitive areas\n`;
    content += `User-agent: *\n`;
    content += `Disallow: /*.json$\n`;
    content += `Disallow: /api/\n`;
    content += `Disallow: /_*\n`;
    content += `Disallow: /.*\n`;

    return content;
  }
}

class SitemapGenerator {
  constructor(baseUrl = 'https://octanode.online') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  generateSitemapUrls() {
    const urls = [];

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
      { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
      { path: '/terms', changefreq: 'yearly', priority: 0.3 }
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

  generateXMLSitemap() {
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
}

// Generate sitemap and robots.txt
const sitemapGenerator = new SitemapGenerator();
const robotsGenerator = new RobotsGenerator();

const sitemapContent = sitemapGenerator.generateXMLSitemap();
const robotsContent = robotsGenerator.generateRobotsTxt();

// File paths
const publicSitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
const distSitemapPath = join(process.cwd(), 'dist', 'sitemap.xml');
const publicRobotsPath = join(process.cwd(), 'public', 'robots.txt');
const distRobotsPath = join(process.cwd(), 'dist', 'robots.txt');

try {
  // Write sitemap to public directory
  writeFileSync(publicSitemapPath, sitemapContent, 'utf8');
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
  
  // Write robots.txt to public directory
  writeFileSync(publicRobotsPath, robotsContent, 'utf8');
  console.log('✅ Robots.txt generated successfully at public/robots.txt');
  
  // Also write to dist directory if it exists
  try {
    writeFileSync(distSitemapPath, sitemapContent, 'utf8');
    writeFileSync(distRobotsPath, robotsContent, 'utf8');
    console.log('✅ Sitemap and robots.txt generated successfully in dist directory');
  } catch (distError) {
    // dist directory might not exist during development, that's okay
    console.log('ℹ️  dist directory not found, files written to public directory only');
  }
  
  console.log('\n📄 Generated sitemap with the following URLs:');
  const urls = sitemapGenerator.generateSitemapUrls();
  urls.forEach(url => {
    console.log(`  - ${url.loc} (priority: ${url.priority})`);
  });
  
  console.log('\n🤖 Generated robots.txt with proper crawling directives');
  console.log('   - Allows crawling of public pages');
  console.log('   - Blocks admin routes and sensitive areas');
  console.log('   - Includes sitemap location');
  console.log('   - Sets crawl delay for respectful crawling');
  
} catch (error) {
  console.error('❌ Error generating files:', error);
  process.exit(1);
}