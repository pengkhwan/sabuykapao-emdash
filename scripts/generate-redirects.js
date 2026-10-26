// scripts/generate-redirects.js
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sanity client
const client = createClient({
  projectId: 'ik92gukm',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function generateRedirects() {
  try {
    console.log('🔄 Fetching redirects from Sanity...');
    
    // Query all redirect documents
    const redirects = await client.fetch(`
      *[_type == "redirect"] | order(_createdAt desc) {
        source,
        destination,
        permanent
      }
    `);

    console.log(`✅ Found ${redirects.length} redirect(s) from Sanity`);

    // Read base redirects from public/_redirects (if exists)
    const publicRedirectsPath = path.resolve(__dirname, '../public/_redirects');
    let baseRedirects = '';
    
    if (fs.existsSync(publicRedirectsPath)) {
      baseRedirects = fs.readFileSync(publicRedirectsPath, 'utf-8');
      console.log('✅ Loaded base redirects from public/_redirects');
    }

    // Format Sanity redirects
    const redirectLines = redirects.map(r => {
      const statusCode = r.permanent ? '301' : '302';
      return `${r.source} ${r.destination} ${statusCode}`;
    });

    // Combine base redirects with Sanity redirects
    const fileContent = baseRedirects 
      ? `${baseRedirects}\n\n# === Redirects from Sanity CMS ===\n${redirectLines.join('\n')}`
      : [
          '# Cloudflare Pages Redirects',
          '# Generated from Sanity CMS',
          '# Format: source destination status-code',
          '',
          ...redirectLines
        ].join('\n');

    // Write to dist directory (will be created by Astro build)
    const distPath = path.resolve(__dirname, '../dist/_redirects');
    
    // Ensure dist directory exists
    const distDir = path.dirname(distPath);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    fs.writeFileSync(distPath, fileContent);

    console.log(`✅ Successfully generated _redirects file at: ${distPath}`);
    console.log('\n📋 Redirects content:');
    console.log(fileContent);
    
  } catch (error) {
    console.error('❌ Error generating redirects:', error);
    process.exit(1);
  }
}

generateRedirects();
