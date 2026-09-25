# Was ist undash?

*undash* ist ein Business-Intelligence-Werkzeug, das vollständig in Ihrem Browser läuft. Sie laden eine Datendatei, und *undash* macht daraus Diagramme und interaktive Dashboards. Es gibt kein Backend, keinen Upload und kein Konto: Die Daten bleiben auf Ihrem Rechner.

Unter der Haube verwendet *undash* [DuckDB](https://duckdb.org), eine analytische SQL-Datenbank, die nach WebAssembly kompiliert ist. Jede Abfrage läuft lokal in Ihrem Browser-Tab, selbst bei Dateien mit Millionen von Zeilen.

## Wie undash aufgebaut ist

Alles in *undash* baut auf vier Arten von Objekten auf:

| Objekt | Was es ist |
|---|---|
| **Tabelle** | Eine importierte Datendatei, etwa eine CSV- oder Parquet-Datei. Tabellen sind schreibgeschützt. |
| **Modell** | Eine benannte SQL-Abfrage über eine oder mehrere Tabellen (oder andere Modelle). Ein Modell enthält alles, was Sie auf den Daten aufbauen. |
| **Diagramm** | Eine Visualisierung eines Modells, aufgebaut aus den Dimensionen und Metriken des Modells. |
| **Dashboard** | Die Anordnung der Diagramme eines Modells auf einer Fläche. Jedes Modell hat genau ein Dashboard. |

Innerhalb eines Modells bereiten Sie die Daten auf, bevor Sie sie visualisieren:

- **Spalten** sind die Spalten der Abfrage des Modells.
- **Transformationen** leiten neue Spalten ab, zum Beispiel Partitionen, Datumsbestandteile oder die Top-N-Kategorien.
- **Dimensionen** sind die Spalten, nach denen Sie gruppieren.
- **Metriken** sind Aggregationen wie Summen, Mittelwerte oder Anzahlen.
- **Filter** schränken die Daten ein, die ein Modell anzeigt, und **Steuerelemente** sind interaktive Filter, die Betrachter auf dem Dashboard ändern können.

## Voraussetzungen

*undash* benötigt einen größeren Bildschirm: einen Desktop-Rechner, Laptop oder ein Tablet (iPads funktionieren) mit einer aktuellen Version von Chrome, Firefox, Safari oder Edge. Smartphones werden nicht unterstützt.

Beim ersten Start ist eine Internetverbindung nötig, um die DuckDB-Engine herunterzuladen, die etwa 35 MB groß ist. Danach funktioniert *undash* auch offline. Siehe [Datenschutz, Speicher & Offline](./privacy-storage).

## Wie es weitergeht

- Neu bei *undash*? Beginnen Sie mit [Erste Schritte](./getting-started). Dort gelangen Sie in wenigen Minuten von einer Datendatei zu einem Dashboard.
- Einen Rundgang durch den Bildschirm bietet [Die Oberfläche](./interface).
- Die übrigen Kapitel beschreiben jeden Teil der Anwendung im Detail.
