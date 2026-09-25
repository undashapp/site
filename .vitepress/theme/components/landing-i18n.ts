const brand = '<i><b>un</b>dash</i>';

const en = {
  hero: {
    pill: 'Coming soon',
    tagline: 'One-click business intelligence dashboards.',
    taglineStrong: 'Private, fast and right in your browser.',
    points: ['No backend', 'No uploads', 'No account'],
    guide: { text: 'Get Started', link: '/guide/getting-started' },
    explore: { text: 'Explore Features', link: '#features' },
    follow: { text: 'Follow @undashapp', link: 'https://twitter.com/undashapp' },
  },
  demo: {
    title: 'Sales · Dashboard',
    local: 'Local',
    region: 'Region',
    regions: ['North', 'South', 'East', 'West'],
    categories: ['Hardware', 'Software', 'Services'],
    months: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    reset: 'Reset',
    revenue: 'Revenue',
    ofRegions: (n: number) => `${n} of 4 regions`,
    byCategory: 'By category',
    byRegion: 'Revenue by region',
    clickToFilter: 'click to filter',
    filter: (name: string) => `Filter ${name}`,
    monthly: 'Monthly revenue',
    footer: 'Illustrative demo · Dashboards in the undash app look different',
    money: (k: number) => `$${(k / 1000).toFixed(2)}M`,
    compact: (k: number) => `${(k / 1000).toFixed(1)}M`,
  },
  flow: {
    eyebrow: 'One-click AI dashboards',
    title: 'From Raw Table to Dashboard.',
    titleMuted: 'In One Click.',
    lead: 'Drop in a table and let AI propose a model, dimensions, measures and charts. Bring your own OpenAI or Anthropic key.',
    tags: ['model', 'dimensions', 'measures', 'charts'],
    steps: [
      {
        title: 'Drop a File',
        text: 'Drag and drop files up to 2 GB each. Column types are detected automatically.',
      },
      {
        title: 'AI Proposes',
        text: 'Only table statistics are shared, never your rows.',
      },
      {
        title: 'Dashboard Ready',
        text: 'A whole dashboard, cross-filtered and ready to present.',
      },
    ],
  },
  features: {
    eyebrow: 'Everything you need',
    title: 'Serious Analytics.',
    titleMuted: 'Zero Infrastructure.',
    private: {
      title: 'Private by Design',
      text: `${brand} runs entirely in your browser. No backend, no uploads, no account. Your data is stored locally on your machine and never leaves it.`,
      orbit: ['Dashboards', 'Tables', 'Models'],
    },
    engine: {
      title: 'Fast Query Engine',
      text: 'Powered by DuckDB right in your browser. Analytical queries on millions of rows run in no time.',
    },
    import: {
      title: 'Effortless Import',
      text: 'Drag and drop CSV, TSV, JSON or Parquet files, up to 2 GB each. Column types are detected automatically. No manual data wrangling required.',
      types: ['ABC', '123', '1.5', 'Date', 'T/F'],
    },
    sql: {
      title: 'Built on SQL',
      text: 'Every dataset is a plain SQL query. Refine models with dimensions, measures, bins and date transforms, or peek at the SQL behind any chart. For professionals: an SQL console that shows results as you type.',
    },
    charts: {
      title: '20+ Chart Types',
      text: 'From bar, line and area charts to scatter, heatmap, density, streamgraph, radar, KPI and choropleth maps. Facet any chart into small multiples.',
      names: {
        Bar: 'Bar',
        Lollipop: 'Lollipop',
        Line: 'Line',
        Area: 'Area',
        Scatter: 'Scatter',
        ConnectedScatter: 'Connected Scatter',
        Balloon: 'Balloon',
        Heatmap: 'Heatmap',
        Density: 'Density',
        Density2D: '2D Density',
        Streamgraph: 'Streamgraph',
        Radar: 'Radar',
        Donut: 'Donut',
        KPI: 'KPI',
        Choropleth: 'Choropleth',
      } as Record<string, string>,
    },
    filter: {
      title: 'Instant Cross-Filtering',
      text: 'Interactive controls filter every chart of a dashboard at once: category pickers, range sliders for numbers, dates and times, and boolean toggles. Pre-aggregation keeps it snappy.',
    },
    keys: {
      title: 'Keyboard First',
      text: 'Navigate, search, switch views and jump to any chart type without leaving the keyboard. Vim-style shortcuts for those who love speed.',
    },
    offline: {
      title: 'Works Offline',
      text: `Install ${brand} once as an app and it keeps working without an internet connection. Or simply open it in your browser like any other website.`,
      offline: 'Offline',
      working: 'Still working',
    },
    present: {
      title: 'Present Anywhere',
      text: 'Arrange charts with drag and drop or smart layout templates. Present your insights in full screen or run a dashboard in kiosk mode on a wall display.',
    },
    export: {
      title: 'Export Everything',
      text: 'Export charts and dashboards as vector graphics in PDF or SVG, or as PNG and JPEG images, on custom or standard paper sizes. Export data as CSV, Excel, JSON or Parquet.',
      charts: 'Charts & dashboards',
      data: 'Data',
    },
    custom: {
      title: 'Make It Yours',
      text: 'Choose from six fonts made for data visualization. Switch between light and dark mode, pick a primary color and go monochromatic or categorical.',
    },
  },
  cta: {
    title: 'Business Intelligence,',
    titleAccent: 'Unthought.',
    text: `${brand} is coming soon. Follow along to be the first to try it.`,
    button: 'Follow @undashapp on X',
  },
};

export type LandingMessages = typeof en;

const de: LandingMessages = {
  hero: {
    pill: 'Bald verfügbar',
    tagline: 'Business-Intelligence-Dashboards auf Knopfdruck.',
    taglineStrong: 'Privat, schnell und direkt im Browser.',
    points: ['Kein Backend', 'Keine Uploads', 'Kein Konto'],
    guide: { text: 'Erste Schritte', link: '/de/guide/getting-started' },
    explore: { text: 'Funktionen entdecken', link: '#features' },
    follow: { text: '@undashapp folgen', link: 'https://twitter.com/undashapp' },
  },
  demo: {
    title: 'Vertrieb · Dashboard',
    local: 'Lokal',
    region: 'Region',
    regions: ['Nord', 'Süd', 'Ost', 'West'],
    categories: ['Hardware', 'Software', 'Services'],
    months: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    reset: 'Zurücksetzen',
    revenue: 'Umsatz',
    ofRegions: (n: number) => `${n} von 4 Regionen`,
    byCategory: 'Nach Kategorie',
    byRegion: 'Nach Region (Mio. €)',
    clickToFilter: 'zum Filtern anklicken',
    filter: (name: string) => `${name} filtern`,
    monthly: 'Monatlicher Umsatz',
    footer: 'Beispielansicht · Dashboards in der undash-App sehen anders aus',
    money: (k: number) => `${(k / 1000).toFixed(2).replace('.', ',')} Mio. €`,
    compact: (k: number) => (k / 1000).toFixed(1).replace('.', ','),
  },
  flow: {
    eyebrow: 'KI-Dashboards auf Knopfdruck',
    title: 'Von der Tabelle zum Dashboard.',
    titleMuted: 'Mit nur einem Klick.',
    lead: 'Tabelle hinzufügen, und die KI schlägt Modell, Dimensionen, Metriken und Diagramme vor. Mit Ihrem eigenen API-Schlüssel von OpenAI oder Anthropic.',
    tags: ['Modell', 'Dimensionen', 'Metriken', 'Diagramme'],
    steps: [
      {
        title: 'Datei hinzufügen',
        text: 'Dateien bis 2 GB einfach hineinziehen. Die Spaltentypen werden automatisch erkannt.',
      },
      {
        title: 'KI macht Vorschläge',
        text: 'Die KI sieht nur Tabellenstatistiken, niemals Ihre Daten.',
      },
      {
        title: 'Dashboard steht',
        text: 'Ein vollständiges Dashboard mit Cross-Filtering, bereit für die Präsentation.',
      },
    ],
  },
  features: {
    eyebrow: 'Alles, was Sie brauchen',
    title: 'Professionelle Analysen.',
    titleMuted: 'Ganz ohne Infrastruktur.',
    private: {
      title: 'Privat von Grund auf',
      text: `${brand} läuft komplett im Browser. Kein Backend, keine Uploads, kein Konto. Ihre Daten bleiben lokal auf Ihrem Rechner und verlassen ihn nie.`,
      orbit: ['Dashboards', 'Tabellen', 'Modelle'],
    },
    engine: {
      title: 'Blitzschnelle Abfragen',
      text: 'Mit DuckDB direkt im Browser. Analytische Abfragen über Millionen von Zeilen sind im Nu erledigt.',
    },
    import: {
      title: 'Import ohne Aufwand',
      text: 'CSV-, TSV-, JSON- oder Parquet-Dateien bis 2 GB einfach per Drag & Drop hinzufügen. Die Spaltentypen werden automatisch erkannt, aufwendiges Aufbereiten der Daten entfällt.',
      types: ['ABC', '123', '1,5', 'Datum', 'W/F'],
    },
    sql: {
      title: 'Basiert auf SQL',
      text: 'Jeder Datensatz ist eine gewöhnliche SQL-Abfrage. Verfeinern Sie Modelle mit Dimensionen, Metriken, Partitionen und Datumstransformationen, oder sehen Sie sich das SQL hinter jedem Diagramm an. Für Profis gibt es eine SQL-Konsole, die Ergebnisse schon beim Tippen anzeigt.',
    },
    charts: {
      title: '20+ Diagrammtypen',
      text: 'Von Balken-, Linien- und Flächendiagrammen über Streudiagramme, Heatmaps, Dichtediagramme, Streamgraphs und Netzdiagramme bis hin zu Kennzahlen und Choroplethenkarten. Jedes Diagramm lässt sich zudem in Small Multiples aufteilen.',
      names: {
        Bar: 'Balken',
        Lollipop: 'Lollipop',
        Line: 'Linie',
        Area: 'Fläche',
        Scatter: 'Streuung',
        ConnectedScatter: 'Verbundene Streuung',
        Balloon: 'Ballon',
        Heatmap: 'Heatmap',
        Density: 'Dichte',
        Density2D: '2D-Dichte',
        Streamgraph: 'Streamgraph',
        Radar: 'Netz',
        Donut: 'Donut',
        KPI: 'Kennzahl',
        Choropleth: 'Karte',
      },
    },
    filter: {
      title: 'Cross-Filtering in Echtzeit',
      text: 'Interaktive Steuerelemente filtern alle Diagramme eines Dashboards gleichzeitig: Kategorieauswahl, Schieberegler für Zahlen, Datum und Uhrzeit sowie Ja/Nein-Schalter. Dank Voraggregation reagiert alles ohne Verzögerung.',
    },
    keys: {
      title: 'Alles per Tastatur',
      text: 'Navigieren, suchen, Ansichten wechseln oder direkt zu jedem Diagrammtyp springen, ganz ohne Maus. Mit Tastenkürzeln im Vim-Stil für alle, die es eilig haben.',
    },
    offline: {
      title: 'Auch offline nutzbar',
      text: `Einmal als App installiert, funktioniert ${brand} auch ohne Internetverbindung. Oder Sie öffnen es wie jede andere Website einfach im Browser.`,
      offline: 'Offline',
      working: 'Läuft weiter',
    },
    present: {
      title: 'Präsentieren, wo Sie wollen',
      text: 'Ordnen Sie Diagramme per Drag & Drop oder mit cleveren Layout-Vorlagen an. Präsentieren Sie Ihre Ergebnisse im Vollbild oder zeigen Sie ein Dashboard im Kiosk-Modus auf einem Wandbildschirm.',
    },
    export: {
      title: 'Alles exportieren',
      text: 'Diagramme und Dashboards lassen sich als Vektorgrafik (PDF, SVG) oder als Bild (PNG, JPEG) exportieren, in eigenen oder gängigen Papierformaten. Daten exportieren Sie als CSV, Excel, JSON oder Parquet.',
      charts: 'Diagramme & Dashboards',
      data: 'Daten',
    },
    custom: {
      title: 'Ganz nach Ihrem Geschmack',
      text: 'Sechs Schriftarten, gemacht für Datenvisualisierung. Heller oder dunkler Modus, eine Primärfarbe Ihrer Wahl und wahlweise monochrome oder kategoriale Farben.',
    },
  },
  cta: {
    title: 'Business Intelligence,',
    titleAccent: 'neu gedacht.',
    text: `${brand} ist bald verfügbar. Folgen Sie uns und seien Sie von Anfang an dabei.`,
    button: '@undashapp auf X folgen',
  },
};

export const messages: Record<string, LandingMessages> = { en, de };
