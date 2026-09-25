const brand = '<i><b>un</b>dash</i>';

const en = {
  hero: {
    pill: 'Coming soon',
    tagline: 'One-click business intelligence dashboards.',
    taglineStrong: 'Private, fast and right in your browser.',
    points: ['No backend', 'No uploads', 'No account'],
    primary: { text: 'Get Started', link: '/guide/getting-started' },
    secondary: { text: 'Explore Features', link: '#features' },
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
    footer: 'Illustrative demo data · every chart cross-filters',
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
      orbit: ['rows', 'tables', 'models'],
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
      title: '21 Chart Types',
      text: 'From bar, line and area charts to scatter, heatmap, density, streamgraph, radar, KPI and choropleth maps. Facet any chart into small multiples.',
      names: {
        Bar: 'Bar',
        Line: 'Line',
        Area: 'Area',
        Scatter: 'Scatter',
        Heatmap: 'Heatmap',
        Density: 'Density',
        Streamgraph: 'Streamgraph',
        Radar: 'Radar',
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
    pill: 'Demnächst verfügbar',
    tagline: 'Business-Intelligence-Dashboards mit einem Klick.',
    taglineStrong: 'Privat, schnell und direkt in Ihrem Browser.',
    points: ['Kein Backend', 'Keine Uploads', 'Kein Konto'],
    primary: { text: 'Erste Schritte', link: '/de/guide/getting-started' },
    secondary: { text: 'Funktionen entdecken', link: '#features' },
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
    byRegion: 'Nach Region',
    clickToFilter: 'zum Filtern klicken',
    filter: (name: string) => `${name} filtern`,
    monthly: 'Monatlicher Umsatz',
    footer: 'Beispieldaten · jedes Diagramm filtert alle anderen',
    money: (k: number) => `${(k / 1000).toFixed(2).replace('.', ',')} Mio. €`,
    compact: (k: number) => `${(k / 1000).toFixed(1).replace('.', ',')} Mio.`,
  },
  flow: {
    eyebrow: 'KI-Dashboards mit einem Klick',
    title: 'Von der Tabelle zum Dashboard.',
    titleMuted: 'Mit einem Klick.',
    lead: 'Legen Sie eine Tabelle ab und lassen Sie die KI ein Modell, Dimensionen, Metriken und Diagramme vorschlagen. Nutzen Sie Ihren eigenen OpenAI- oder Anthropic-Schlüssel.',
    tags: ['Modell', 'Dimensionen', 'Metriken', 'Diagramme'],
    steps: [
      {
        title: 'Datei ablegen',
        text: 'Dateien mit bis zu 2 GB per Drag & Drop hinzufügen. Spaltentypen werden automatisch erkannt.',
      },
      {
        title: 'KI schlägt vor',
        text: 'Geteilt werden nur Tabellenstatistiken, nie Ihre Datensätze.',
      },
      {
        title: 'Dashboard fertig',
        text: 'Ein komplettes Dashboard, mit Cross-Filtering und bereit zum Präsentieren.',
      },
    ],
  },
  features: {
    eyebrow: 'Alles, was Sie brauchen',
    title: 'Ernsthafte Analysen.',
    titleMuted: 'Null Infrastruktur.',
    private: {
      title: 'Privat von Grund auf',
      text: `${brand} läuft vollständig in Ihrem Browser. Kein Backend, keine Uploads, kein Konto. Ihre Daten werden lokal auf Ihrem Rechner gespeichert und verlassen ihn nie.`,
      orbit: ['Zeilen', 'Tabellen', 'Modelle'],
    },
    engine: {
      title: 'Schnelle Abfrage-Engine',
      text: 'Angetrieben von DuckDB, direkt in Ihrem Browser. Analytische Abfragen auf Millionen von Zeilen laufen im Handumdrehen.',
    },
    import: {
      title: 'Mühelos importieren',
      text: 'Ziehen Sie CSV-, TSV-, JSON- oder Parquet-Dateien mit bis zu 2 GB pro Datei per Drag & Drop hinein. Spaltentypen werden automatisch erkannt. Keine manuelle Datenaufbereitung nötig.',
      types: ['ABC', '123', '1,5', 'Datum', 'W/F'],
    },
    sql: {
      title: 'Auf SQL gebaut',
      text: 'Jeder Datensatz ist eine einfache SQL-Abfrage. Verfeinern Sie Modelle mit Dimensionen, Metriken, Partitionen und Datums-Transformationen, oder werfen Sie einen Blick auf das SQL hinter jedem Diagramm. Für Profis: eine SQL-Konsole, die Ergebnisse schon während der Eingabe anzeigt.',
    },
    charts: {
      title: '21 Diagrammtypen',
      text: 'Von Balken-, Linien- und Flächendiagrammen bis zu Streudiagramm, Heatmap, Dichte-Diagramm, Streamgraph, Netzdiagramm, Leistungskennzahl und Choroplethenkarten. Jedes Diagramm lässt sich in Small Multiples aufteilen.',
      names: {
        Bar: 'Balken',
        Line: 'Linie',
        Area: 'Fläche',
        Scatter: 'Streuung',
        Heatmap: 'Heatmap',
        Density: 'Dichte',
        Streamgraph: 'Streamgraph',
        Radar: 'Netz',
        KPI: 'Kennzahl',
        Choropleth: 'Karte',
      },
    },
    filter: {
      title: 'Sofortiges Cross-Filtering',
      text: 'Interaktive Steuerelemente filtern alle Diagramme eines Dashboards auf einmal: Kategorieauswahl, Bereichsregler für Zahlen, Datum und Uhrzeit sowie Schalter für Wahrheitswerte. Voraggregation sorgt für flüssige Reaktionen.',
    },
    keys: {
      title: 'Tastatur zuerst',
      text: 'Navigieren, suchen, Ansichten wechseln und zu jedem Diagrammtyp springen, ohne die Tastatur zu verlassen. Tastenkürzel im Vim-Stil für alle, die es schnell mögen.',
    },
    offline: {
      title: 'Funktioniert offline',
      text: `Installieren Sie ${brand} einmal als App, und es funktioniert auch ohne Internetverbindung weiter. Oder öffnen Sie es einfach wie jede andere Website in Ihrem Browser.`,
      offline: 'Offline',
      working: 'Läuft weiter',
    },
    present: {
      title: 'Überall präsentieren',
      text: 'Ordnen Sie Diagramme per Drag & Drop oder mit intelligenten Layout-Vorlagen an. Präsentieren Sie Ihre Erkenntnisse im Vollbild oder zeigen Sie ein Dashboard im Kiosk-Modus auf einem Wandbildschirm.',
    },
    export: {
      title: 'Alles exportieren',
      text: 'Exportieren Sie Diagramme und Dashboards als Vektorgrafik in PDF oder SVG oder als PNG- und JPEG-Bild, in eigenen oder Standard-Papierformaten. Exportieren Sie Daten als CSV, Excel, JSON oder Parquet.',
      charts: 'Diagramme & Dashboards',
      data: 'Daten',
    },
    custom: {
      title: 'Ganz nach Ihrem Geschmack',
      text: 'Wählen Sie aus sechs Schriftarten, die für Datenvisualisierung gemacht sind. Wechseln Sie zwischen Hell- und Dunkelmodus, wählen Sie eine Primärfarbe und entscheiden Sie sich für monochromatische oder kategoriale Farben.',
    },
  },
  cta: {
    title: 'Business Intelligence,',
    titleAccent: 'neu gedacht.',
    text: `${brand} ist demnächst verfügbar. Folgen Sie uns und probieren Sie es als Erste aus.`,
    button: '@undashapp auf X folgen',
  },
};

export const messages: Record<string, LandingMessages> = { en, de };
