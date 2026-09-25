# Was ist undash?

*undash* ist ein Business-Intelligence-Werkzeug, das komplett im Browser läuft. Sie laden eine Datendatei, und *undash* macht daraus Diagramme und interaktive Dashboards. Es gibt kein Backend, keinen Upload und kein Konto: Die Daten bleiben auf Ihrem Rechner.

Im Hintergrund arbeitet [DuckDB](https://duckdb.org), eine analytische SQL-Datenbank, die als WebAssembly direkt im Browser läuft. Jede Abfrage wird lokal in Ihrem Browser-Tab ausgeführt, selbst bei Dateien mit Millionen von Zeilen.

## Wie undash aufgebaut ist

Alles in *undash* baut auf vier Arten von Objekten auf:

| Objekt | Was es ist |
|---|---|
| **Tabelle** | Eine importierte Datendatei, etwa eine CSV- oder Parquet-Datei. Tabellen sind schreibgeschützt. |
| **Modell** | Eine benannte SQL-Abfrage über eine oder mehrere Tabellen (oder andere Modelle). In einem Modell steckt alles, was Sie auf Basis der Daten erstellen. |
| **Diagramm** | Eine Visualisierung, die aus den Dimensionen und Metriken eines Modells entsteht. |
| **Dashboard** | Die Anordnung der Diagramme eines Modells auf einer Fläche. Jedes Modell hat genau ein Dashboard. |

Innerhalb eines Modells bereiten Sie die Daten auf, bevor Sie sie visualisieren:

- **Spalten** sind die Ergebnisspalten der Modellabfrage.
- **Transformationen** leiten neue Spalten ab, zum Beispiel Partitionen, Datumsbestandteile oder die Top-N-Kategorien.
- **Dimensionen** sind die Spalten, nach denen Sie gruppieren.
- **Metriken** sind Aggregationen wie Summen, Mittelwerte oder Anzahlen.
- **Filter** schränken die Daten eines Modells ein. **Steuerelemente** sind interaktive Filter, die Betrachter direkt im Dashboard ändern können.

## Voraussetzungen

*undash* benötigt einen größeren Bildschirm: einen Desktop-Rechner, Laptop oder ein Tablet (auch iPads) mit einer aktuellen Version von Chrome, Firefox, Safari oder Edge. Smartphones werden nicht unterstützt.

Beim ersten Start braucht *undash* eine Internetverbindung, um die rund 35 MB große DuckDB-Engine herunterzuladen. Danach funktioniert *undash* auch offline. Siehe [Datenschutz, Speicher & Offline](./privacy-storage).

## Wie es weitergeht

- Neu bei *undash*? Beginnen Sie mit [Erste Schritte](./getting-started). Dort gelangen Sie in wenigen Minuten von einer Datendatei zu einem Dashboard.
- Einen Überblick über den Bildschirm gibt [Die Oberfläche](./interface).
- Die übrigen Kapitel beschreiben jeden Teil der Anwendung im Detail.
