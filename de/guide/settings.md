# Einstellungen

Einstellungen finden Sie in *undash* an zwei Stellen: die **Einstellungsleiste** für Darstellung und Export und die **App-Einstellungen** für den KI-Assistenten und DuckDB-Server. Alle Einstellungen werden in Ihrem Browser gespeichert.

## Einstellungsleiste

Die Einstellungsleiste befindet sich oben in der Seitenleiste. Fahren Sie mit der Maus über das Regler-Symbol oder drücken Sie `Ctrl+,`, um sie aufzuklappen. Sie hat zwei Abschnitte, **Stil-Einstellungen** und **Export-Einstellungen**. Das erste Element der Leiste wechselt zwischen ihnen. Die Leiste öffnet sich immer mit dem Stil-Abschnitt.

Ein Klick auf eine Einstellung wählt den nächsten Wert, `Shift`+Klick den vorherigen. Mit der Tastatur wechseln `h`/`l` oder `←`/`→` zwischen den Einstellungen, `k`/`↑` wählt den nächsten Wert und `j`/`↓` den vorherigen. `Escape` schließt die Leiste.

### Stil-Einstellungen

| Einstellung | Werte | Standard |
|---|---|---|
| **Hell-/Dunkelmodus** | auto, light (hell), dark (dunkel). *auto* folgt Ihrem Betriebssystem. | auto |
| **Sprache** | en (Englisch), de (Deutsch). Legt die Sprache der Anwendung sowie die Zahlen- und Datumsformate fest. | die Sprache Ihres Browsers |
| **Farbe** | Die Primärfarbe für Diagramme: Grau oder eine von sieben Farben. | Grau |
| **Farbpalette** | monochromatic (Abstufungen der Primärfarbe) oder categorical (unterschiedliche Farben) | monochromatic |
| **Schriftart** | Lato, Source Sans 3, Inter, Roboto, IBM Plex Sans, Open Sans | Lato |
| **Stil** | glass (Glas) oder flat (flach). Das Symbol zeigt eine Vorschau des Stils. | glass |

### Export-Einstellungen

| Einstellung | Werte | Standard |
|---|---|---|
| **Export-Dateityp** | pdf, svg, png, jpeg | pdf |
| **Export-Format** | custom (die Größe der Ansicht), a4, a3, a2, letter, legal, tabloid | custom |
| **Export-Farben** | mono (schwarz auf weiß) oder current (die Farben des aktuellen Designs) | mono |
| **Daten-Export-Format** | csv, xlsx, json, parquet | csv |

Die Export-Einstellungen gelten für [Diagramm- und Dashboard-Exporte](./dashboards#exportieren) und für [Datenexporte](./data#daten-exportieren).

### Stil

Die Einstellung **Stil** legt fest, wie Diagramme gezeichnet werden:

- **Glas**: Jedes Diagramm liegt in einem durchscheinenden Rahmen mit abgerundeten Ecken, von einem weichen Schatten angehoben. Balken sind an ihrem Wertende abgerundet, und Balken und Flächen laufen zur Achse hin aus. Linien und Titel schweben leicht über dem Rahmen, und Punkte, Kreise und Kacheln sind passend schattiert.
- **Flach**: schlichte Diagramme in einem flachen Rahmen, ohne Schatten, Verläufe oder Rundungen.

Exporte übernehmen den Stil. Ein PDF eines Glas-Diagramms sieht aus wie das Diagramm auf dem Bildschirm. Sind die **Export-Farben** auf *mono* gestellt, wird der Rahmen flach gedruckt, die Markierungen behalten aber ihre Glas-Formen.

## App-Einstellungen

Öffnen Sie die App-Einstellungen mit dem Zahnrad-Symbol oben in der Seitenleiste oder mit `Ctrl+Shift+,`. Klicken Sie auf **Aktualisieren**, um Ihre Änderungen zu übernehmen.

### KI-Assistent

| Einstellung | Beschreibung |
|---|---|
| **KI-Anbieter** | OpenAI oder Anthropic. |
| **OpenAI API-Schlüssel** / **Anthropic API-Schlüssel** | Ihr eigener Schlüssel für den Anbieter. |
| **Kategoriewerte teilen** | Sendet Beispielwerte kategorialer Spalten zusammen mit den Statistiken. Standardmäßig aktiviert. |
| **Auto-Modellierung** | Schlägt für jede importierte Tabelle ein Modell und ein Dashboard vor. Standardmäßig deaktiviert. |
| **Auto-Benennung** | Erzeugt einen Titel für jedes gespeicherte Diagramm sowie Titel und Untertitel für jedes von Hand hinzugefügte Dashboard. Standardmäßig deaktiviert. |

Details finden Sie unter [KI-Assistent](./ai).

### Zugangsdaten DuckDB-Server

| Einstellung | Beschreibung |
|---|---|
| **DuckDB-URI** | Die Adresse eines DuckDB-Servers, dessen Tabellen als Remote-Tabellen genutzt werden können (siehe [Daten importieren](./data#remote-tabellen)). Leer lassen, um vollständig im Browser zu arbeiten. |
| **Auth-Token** | Das Token des Servers, das mit jeder Anfrage gesendet wird. |

Die URI kann nicht geändert werden, solange Remote-Tabellen oder -Modelle von ihr abhängen.

## Updates

Wenn eine neue Version von *undash* verfügbar ist, zeigt ein Banner oben „Eine neue Version ist verfügbar“. Klicken Sie auf **Aktualisieren**, um die Anwendung mit der neuen Version neu zu laden. *undash* aktualisiert sich nie ungefragt, während Sie arbeiten.

Klicken Sie auf die Versionsnummer neben dem App-Titel, um sie zu kopieren.
