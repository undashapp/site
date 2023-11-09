import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'undash',
  description: 'Unthink BI',
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }],

    sidebar: [],

    socialLinks: [{ icon: 'x', link: 'https://twitter.com/undashapp' }],
  },
});
