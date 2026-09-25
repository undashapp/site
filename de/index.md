---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: undash
  text: Unthink BI
  tagline: "Business-Intelligence-Dashboards mit einem Klick<br />Privat, schnell und direkt in Ihrem Browser<br/><span style='font-size: 13px'>[demnächst verfügbar]</span>"
  image: {
    light: /images/light/logo.svg,
    dark: /images/dark/logo.svg,
    alt: undash-app
  }
  actions:
    - theme: brand
      text: Erste Schritte
      link: /de/guide/getting-started
    - theme: alt
      text: Was ist undash?
      link: /de/guide/

features:
  - icon: {
      dark: /images/dark/shield-lock-filled.svg,
      light: /images/light/shield-lock-filled.svg,
      alt: data-privacy,
      width: 32,
      height: 32
    }
    title: Privat von Grund auf
    details: "<i><b>un</b>dash</i> läuft vollständig in Ihrem Browser. Kein Backend, keine Uploads, kein Konto. Ihre Daten werden lokal auf Ihrem Rechner gespeichert und verlassen ihn nie."
  - icon: {
      dark: /images/dark/sparkles.svg,
      light: /images/light/sparkles.svg,
      alt: ai-dashboards,
      width: 32,
      height: 32
    }
    title: KI-Dashboards mit einem Klick
    details: "Legen Sie eine Tabelle ab und lassen Sie die KI ein Modell, Dimensionen, Metriken und Diagramme vorschlagen: ein komplettes Dashboard mit einem Klick. Nutzen Sie Ihren eigenen OpenAI- oder Anthropic-Schlüssel. Geteilt werden nur Tabellenstatistiken, nie Ihre Datensätze."
  - icon: {
      dark: /images/dark/rocket.svg,
      light: /images/light/rocket.svg,
      alt: fast-query-engine,
      width: 32,
      height: 32
    }
    title: Schnelle Abfrage-Engine
    details: "Angetrieben von DuckDB, direkt in Ihrem Browser. Analytische Abfragen auf Millionen von Zeilen laufen im Handumdrehen. Für Profis: eine SQL-Konsole, die Ergebnisse schon während der Eingabe anzeigt."
  - icon: {
      dark: /images/dark/database-import.svg,
      light: /images/light/database-import.svg,
      alt: import,
      width: 32,
      height: 32
    }
    title: Mühelos importieren
    details: "Ziehen Sie CSV-, TSV-, JSON- oder Parquet-Dateien mit bis zu 2 GB pro Datei per Drag & Drop hinein. Spaltentypen werden automatisch erkannt. Keine manuelle Datenaufbereitung nötig."
  - icon: {
      dark: /images/dark/chart-pie.svg,
      light: /images/light/chart-pie.svg,
      alt: chart-types,
      width: 32,
      height: 32
    }
    title: 21 Diagrammtypen
    details: "Von Balken-, Linien- und Flächendiagrammen bis zu Streudiagramm, Heatmap, Dichte-Diagramm, Streamgraph, Netzdiagramm, Leistungskennzahl und Choroplethenkarten. Jedes Diagramm lässt sich in Small Multiples aufteilen."
  - icon: {
      dark: /images/dark/filter.svg,
      light: /images/light/filter.svg,
      alt: cross-filtering,
      width: 32,
      height: 32
    }
    title: Sofortiges Cross-Filtering
    details: "Interaktive Steuerelemente filtern alle Diagramme eines Dashboards auf einmal: Kategorieauswahl, Bereichsregler für Zahlen, Datum und Uhrzeit sowie Schalter für Wahrheitswerte. Voraggregation sorgt für flüssige Reaktionen."
  - icon: {
      dark: /images/dark/presentation.svg,
      light: /images/light/presentation.svg,
      alt: presentation-mode,
      width: 32,
      height: 32
    }
    title: Überall präsentieren
    details: "Ordnen Sie Diagramme per Drag & Drop oder mit intelligenten Layout-Vorlagen an. Präsentieren Sie Ihre Erkenntnisse im Vollbild oder zeigen Sie ein Dashboard im Kiosk-Modus auf einem Wandbildschirm."
  - icon: {
      dark: /images/dark/network-off.svg,
      light: /images/light/network-off.svg,
      alt: works-offline,
      width: 32,
      height: 32
    }
    title: Funktioniert offline
    details: "Installieren Sie <i><b>un</b>dash</i> einmal als App, und es funktioniert auch ohne Internetverbindung weiter. Oder öffnen Sie es einfach wie jede andere Website in Ihrem Browser."
  - icon: {
      dark: /images/dark/file-export.svg,
      light: /images/light/file-export.svg,
      alt: export,
      width: 32,
      height: 32
    }
    title: Alles exportieren
    details: "Exportieren Sie Diagramme und Dashboards als Vektorgrafik in PDF oder SVG oder als PNG- und JPEG-Bild, in eigenen oder Standard-Papierformaten. Exportieren Sie Daten als CSV, Excel, JSON oder Parquet."
  - icon: {
      dark: /images/dark/adjustments.svg,
      light: /images/light/adjustments.svg,
      alt: customizable,
      width: 32,
      height: 32
    }
    title: Ganz nach Ihrem Geschmack
    details: "Wählen Sie aus sechs Schriftarten, die für Datenvisualisierung gemacht sind. Wechseln Sie zwischen Hell- und Dunkelmodus, wählen Sie eine Primärfarbe und entscheiden Sie sich für monochromatische oder kategoriale Farben."
  - icon: {
      dark: /images/dark/keyboard.svg,
      light: /images/light/keyboard.svg,
      alt: keyboard-first,
      width: 32,
      height: 32
    }
    title: Tastatur zuerst
    details: "Navigieren, suchen, Ansichten wechseln und zu jedem Diagrammtyp springen, ohne die Tastatur zu verlassen. Tastenkürzel im Vim-Stil für alle, die es schnell mögen."
  - icon: {
      dark: /images/dark/source-code.svg,
      light: /images/light/source-code.svg,
      alt: sql-models,
      width: 32,
      height: 32
    }
    title: Auf SQL gebaut
    details: "Jeder Datensatz ist eine einfache SQL-Abfrage. Verfeinern Sie Modelle mit Dimensionen, Metriken, Partitionen und Datums-Transformationen, oder werfen Sie einen Blick auf das SQL hinter jedem Diagramm."
---
