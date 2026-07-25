// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.hnsenfu.com',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => {
        if (item.url === 'https://www.hnsenfu.com/' || item.url === 'https://www.hnsenfu.com') {
          item.priority = 1.0;
        } else if (item.url.includes('/products/')) {
          item.priority = 0.9;
        } else if (item.url.includes('/zones/')) {
          item.priority = 0.8;
        } else if (item.url.includes('/about') || item.url.includes('/contact') || item.url.includes('/agents')) {
          item.priority = 0.8;
        } else {
          item.priority = 0.7;
        }
        return item;
      }
    })
  ]
});