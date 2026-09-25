# Einstellungen

*undash* hat zwei Orte für Einstellungen: die **Einstellungsleiste** für Darstellung und Export und die **App-Einstellungen** für den KI-Assistenten und DuckDB-Server. Alle Einstellungen werden in Ihrem Browser gespeichert.

## Einstellungsleiste

Die Einstellungsleiste sitzt oben in der Seitenleiste. Fahren Sie mit der Maus über das Regler-Symbol oder drücken Sie `Ctrl+,`, um sie aufzuklappen.

Klicken Sie auf eine Einstellung, um zu ihrem nächsten Wert zu wechseln, und `Shift`+Klick, um zurückzugehen. Mit der Tastatur wechseln `h`/`l` oder `←`/`→` zwischen den Einstellungen, `k`/`↑` wählt den nächsten Wert und `j`/`↓` den vorherigen. `Escape` schließt die Leiste.

| Einstellung | Werte | Standard |
|---|---|---|
| **Hell-/Dunkelmodus** | auto, light (hell), dark (dunkel). *auto* folgt Ihrem Betriebssystem. | auto |
| **Sprache** | en (Englisch), de (Deutsch). Legt die Sprache der Anwendung sowie die Zahlen- und Datumsformate fest. | die Sprache Ihres Browsers |
| **Farbe** | Die Primärfarbe für Diagramme: Grau oder eine von sieben Farben. | Grau |
| **Farbpalette** | monochromatic (Abstufungen der Primärfarbe) oder categorical (unterschiedliche Farben) | monochromatic |
| **Schriftart** | Lato, Source Sans 3, Inter, Roboto, IBM Plex Sans, Open Sans | Lato |
| **Export-Dateityp** | pdf, svg, png, jpeg | pdf |
| **Export-Format** | custom (die Größe der Ansicht), a4, a3, a2, letter, legal, tabloid | custom |
| **Export-Farben** | mono (schwarz auf weiß) oder current (die Farben des aktuellen Designs) | mono |
| **Daten-Export-Format** | csv, xlsx, json, parquet | csv |

Die Export-Einstellungen gelten für [Diagramm- und Dashboard-Exporte](./dashboards#exportieren) und für [Datenexporte](./data#daten-exportieren).

## App-Einstellungen

Öffnen Sie die App-Einstellungen mit dem Zahnrad-Symbol oben in der Seitenleiste oder mit `Ctrl+Shift+,`. Klicken Sie auf **Aktualisieren**, um Ihre Änderungen zu übernehmen.

### KI-Assistent

| Einstellung | Beschreibung |
|---|---|
| **KI-Anbieter** | OpenAI oder Anthropic. |
| **OpenAI API-Schlüssel** / **Anthropic API-Schlüssel** | Ihr eigener Schlüssel für den Anbieter. |
| **Kategoriewerte teilen** | Sendet Beispielwerte kategorialer Spalten zusammen mit den Statistiken. Standardmäßig aktiviert. |
| **Auto-Modellierung** | Schlägt für jede importierte Tabelle ein Modell und ein Dashboard vor. Standardmäßig deaktiviert. |
| **Auto-Benennung** | Erzeugt einen Titel für jedes gespeicherte Diagramm. Standardmäßig deaktiviert. |

Details finden Sie unter [KI-Assistent](./ai).

### Zugangsdaten DuckDB-Server

| Einstellung | Beschreibung |
|---|---|
| **DuckDB-URI** | Die Adresse eines DuckDB-Servers, dessen Tabellen als Remote-Tabellen genutzt werden können (siehe [Daten importieren](./data#remote-tabellen)). Leer lassen, um vollständig im Browser zu arbeiten. |
| **Auth-Token** | Das Token des Servers, das mit jeder Anfrage gesendet wird. |

Die URI kann nicht geändert werden, solange Remote-Tabellen oder -Modelle von ihr abhängen.

## Updates

Wenn eine neue Version von *undash* verfügbar ist, zeigt ein Banner oben „Eine neue Version ist verfügbar“. Klicken Sie auf **Aktualisieren**, um die Anwendung mit der neuen Version neu zu laden. *undash* aktualisiert sich nie, während Sie arbeiten.

Klicken Sie auf die Versionsnummer neben dem App-Titel, um sie zu kopieren.
