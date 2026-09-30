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
      filter: (page) => {
        const pathname = decodeURIComponent(new URL(page).pathname);
        return !pathname.includes('/404') && pathname !== '/news/链接测试/';
      }
    })
  ]
});