import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'undash',
  description: 'Unthink BI. One-click business intelligence dashboards that run privately in your browser.',
  head: [
    ['meta', { name: "apple-mobile-web-app-title", content: "undash"}],
    ['meta', { name: "application-name", content: "undash"}],
    ['meta', { name: "msapplication-TileColor", content: "#333333"}],
    ['meta', { name: "msapplication-config", content: "/images/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/images/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/images/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/images/favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "/images/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/images/safari-pinned-tab.svg", color: "#333333"}],
    ['link', { rel: "shortcut icon", href: "/images/favicon.ico"}],
  ],
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is undash?', link: '/guide/' },
            { text: 'First Steps', link: '/guide/getting-started' },
            { text: 'The Interface', link: '/guide/interface' },
          ],
        },
        {
          text: 'Data',
          items: [
            { text: 'Importing Data', link: '/guide/data' },
            { text: 'Models & SQL', link: '/guide/models' },
            { text: 'Fields & Transforms', link: '/guide/fields-transforms' },
            { text: 'Dimensions & Measures', link: '/guide/dimensions-measures' },
            { text: 'Filters & Controls', link: '/guide/filters-controls' },
          ],
        },
        {
          text: 'Visualization',
          items: [
            { text: 'Charts', link: '/guide/charts' },
            { text: 'Chart Types', link: '/guide/chart-types' },
            { text: 'Dashboards', link: '/guide/dashboards' },
          ],
        },
        {
          text: 'More',
          items: [
            { text: 'AI Assistant', link: '/guide/ai' },
            { text: 'Settings', link: '/guide/settings' },
            { text: 'Privacy, Storage & Offline', link: '/guide/privacy-storage' },
            { text: 'Keyboard Shortcuts', link: '/guide/shortcuts' },
          ],
        },
      ],
    },

    search: { provider: 'local' },

    outline: { level: [2, 3] },

    socialLinks: [{ icon: 'x', link: 'https://twitter.com/undashapp' }],
  },
});
