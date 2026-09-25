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
      },
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
      description: 'BI neu gedacht. Business-Intelligence-Dashboards mit einem Klick, privat in Ihrem Browser.',
      themeConfig: {
        nav: [
          { text: 'Start', link: '/de/' },
          { text: 'Handbuch', link: '/de/guide/getting-started', activeMatch: '/de/guide/' },
        ],

        sidebar: {
          '/de/guide/': [
            {
              text: 'Einführung',
              items: [
                { text: 'Was ist undash?', link: '/de/guide/' },
                { text: 'Erste Schritte', link: '/de/guide/getting-started' },
                { text: 'Die Oberfläche', link: '/de/guide/interface' },
              ],
            },
            {
              text: 'Daten',
              items: [
                { text: 'Daten importieren', link: '/de/guide/data' },
                { text: 'Modelle & SQL', link: '/de/guide/models' },
                { text: 'Spalten & Transformationen', link: '/de/guide/fields-transforms' },
                { text: 'Dimensionen & Metriken', link: '/de/guide/dimensions-measures' },
                { text: 'Filter & Steuerelemente', link: '/de/guide/filters-controls' },
              ],
            },
            {
              text: 'Visualisierung',
              items: [
                { text: 'Diagramme', link: '/de/guide/charts' },
                { text: 'Diagrammtypen', link: '/de/guide/chart-types' },
                { text: 'Dashboards', link: '/de/guide/dashboards' },
              ],
            },
            {
              text: 'Mehr',
              items: [
                { text: 'KI-Assistent', link: '/de/guide/ai' },
                { text: 'Einstellungen', link: '/de/guide/settings' },
                { text: 'Datenschutz, Speicher & Offline', link: '/de/guide/privacy-storage' },
                { text: 'Tastenkürzel', link: '/de/guide/shortcuts' },
              ],
            },
          ],
        },

        outline: { level: [2, 3], label: 'Auf dieser Seite' },
        docFooter: { prev: 'Vorherige Seite', next: 'Nächste Seite' },
        lastUpdated: { text: 'Zuletzt aktualisiert' },
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

    search: {
      provider: 'local',
      options: {
        locales: {
          de: {
            translations: {
              button: { buttonText: 'Suchen', buttonAriaLabel: 'Suchen' },
              modal: {
                displayDetails: 'Detaillierte Liste anzeigen',
                resetButtonTitle: 'Suche zurücksetzen',
                backButtonTitle: 'Suche schließen',
                noResultsText: 'Keine Ergebnisse für',
                footer: {
                  selectText: 'Auswählen',
                  selectKeyAriaLabel: 'Eingabe',
                  navigateText: 'Navigieren',
                  navigateUpKeyAriaLabel: 'Pfeil nach oben',
                  navigateDownKeyAriaLabel: 'Pfeil nach unten',
                  closeText: 'Schließen',
                  closeKeyAriaLabel: 'Escape',
                },
              },
            },
          },
        },
      },
    },

    outline: { level: [2, 3] },

    socialLinks: [{ icon: 'x', link: 'https://twitter.com/undashapp' }],
  },
});
