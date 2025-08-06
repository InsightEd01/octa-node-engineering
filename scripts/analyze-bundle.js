#!/usr/bin/env node

// Bundle analysis script for monitoring code splitting effectiveness
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundle() {
  if (!fs.existsSync(DIST_DIR)) {
    console.log('❌ Build directory not found. Run "npm run build" first.');
    return;
  }

  console.log('📊 Bundle Analysis Report\n');
  console.log('='.repeat(50));

  const files = fs.readdirSync(ASSETS_DIR);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const cssFiles = files.filter(file => file.endsWith('.css'));
  const imageFiles = files.filter(file => /\.(png|jpg|jpeg|svg|gif)$/.test(file));

  let totalSize = 0;
  let jsSize = 0;
  let cssSize = 0;
  let imageSize = 0;

  console.log('\n📦 JavaScript Chunks:');
  jsFiles.forEach(file => {
    const filePath = path.join(ASSETS_DIR, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    jsSize += size;
    totalSize += size;
    
    let chunkType = 'Unknown';
    if (file.includes('vendor')) chunkType = 'Vendor';
    else if (file.includes('admin')) chunkType = 'Admin';
    else if (file.includes('ui')) chunkType = 'UI Components';
    else if (file.includes('index')) chunkType = 'Main App';
    
    console.log(`  ${chunkType.padEnd(15)} ${file.padEnd(30)} ${formatBytes(size)}`);
  });

  console.log('\n🎨 CSS Files:');
  cssFiles.forEach(file => {
    const filePath = path.join(ASSETS_DIR, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    cssSize += size;
    totalSize += size;
    console.log(`  ${file.padEnd(45)} ${formatBytes(size)}`);
  });

  console.log('\n🖼️  Images:');
  imageFiles.forEach(file => {
    const filePath = path.join(ASSETS_DIR, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    imageSize += size;
    totalSize += size;
    console.log(`  ${file.padEnd(45)} ${formatBytes(size)}`);
  });

  console.log('\n📈 Summary:');
  console.log('='.repeat(50));
  console.log(`JavaScript:     ${formatBytes(jsSize)} (${((jsSize/totalSize)*100).toFixed(1)}%)`);
  console.log(`CSS:            ${formatBytes(cssSize)} (${((cssSize/totalSize)*100).toFixed(1)}%)`);
  console.log(`Images:         ${formatBytes(imageSize)} (${((imageSize/totalSize)*100).toFixed(1)}%)`);
  console.log(`Total:          ${formatBytes(totalSize)}`);

  // Performance recommendations
  console.log('\n💡 Recommendations:');
  console.log('='.repeat(50));
  
  if (jsSize > 500 * 1024) {
    console.log('⚠️  JavaScript bundle is large. Consider more aggressive code splitting.');
  } else {
    console.log('✅ JavaScript bundle size is optimal.');
  }
  
  if (imageSize > 2 * 1024 * 1024) {
    console.log('⚠️  Images are large. Consider optimizing or using WebP format.');
  } else {
    console.log('✅ Image sizes are reasonable.');
  }
  
  if (cssSize > 100 * 1024) {
    console.log('⚠️  CSS bundle is large. Consider purging unused styles.');
  } else {
    console.log('✅ CSS bundle size is optimal.');
  }

  console.log('\n🚀 Performance Tips:');
  console.log('- Use lazy loading for non-critical components');
  console.log('- Implement image optimization and WebP format');
  console.log('- Consider using a CDN for static assets');
  console.log('- Monitor Core Web Vitals in production');
}

analyzeBundle();