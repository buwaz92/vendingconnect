// Main Astro settings for the site.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Your real web address. Used for sitemap, canonical links and social previews.
  site: 'https://vendingconnect.com.au',
  integrations: [
    // Builds sitemap-index.xml automatically. Skips pages Google doesn't need.
    sitemap({ filter: (page) => !page.includes('/thanks/') && !page.includes('/admin/') }),
  ],
  build: { format: 'directory' },
});
