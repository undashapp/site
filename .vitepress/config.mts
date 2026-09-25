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
      themeConfig: {
        nav: [{ text: 'Home', link: '/' }],
      },
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
      description: 'BI neu gedacht. Business-Intelligence-Dashboards auf Knopfdruck, privat in Ihrem Browser.',
      themeConfig: {
        nav: [{ text: 'Start', link: '/de/' }],

        notFound: {
          title: 'Seite nicht gefunden',
          quote: 'Diese Seite existiert nicht.',
          linkLabel: 'Zur Startseite',
          linkText: 'Zur Startseite',
        },
        langMenuLabel: 'Sprache ändern',
        returnToTopLabel: 'Zurück nach oben',
        sidebarMenuLabel: 'Menü',
        darkModeSwitchLabel: 'Erscheinungsbild',
        lightModeSwitchTitle: 'Zum hellen Modus wechseln',
        darkModeSwitchTitle: 'Zum dunklen Modus wechseln',
        skipToContentLabel: 'Zum Inhalt springen',
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { light: '/images/light/logo.svg', dark: '/images/dark/logo.svg', alt: 'undash' },

    socialLinks: [{ icon: 'x', link: 'https://twitter.com/undashapp' }],
  },
});
