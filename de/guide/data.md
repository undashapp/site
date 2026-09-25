# Daten importieren

Jede Datei, die Sie importieren, wird zu einer **Tabelle**. Tabellen sind das Ausgangsmaterial für [Modelle](./models).

## Unterstützte Formate

| Format | Endung | Wie die Datei gelesen wird |
|---|---|---|
| CSV | `.csv` | Das Trennzeichen wird automatisch erkannt. Die erste Zeile ist die Kopfzeile. |
| TSV | `.tsv` | Wie CSV, mit Tabulatoren als Trennzeichen. |
| JSON | `.json` | Spaltennamen und Datentypen werden automatisch erkannt. |
| Parquet | `.parquet` | Wird unverändert gespeichert. |

Excel-Dateien können nicht importiert werden, Sie können aber nach Excel exportieren (siehe [Daten exportieren](#daten-exportieren)). Eine `.zip`-Datei wird als Projektsicherung behandelt (siehe [Projekt sichern](#projekt-sichern)).

## Dateien importieren

Ziehen Sie eine oder mehrere Dateien auf das Feld **Dateien** in der Seitenleiste, oder klicken Sie auf das Feld, um eine Dateiauswahl zu öffnen. Die Dateien werden nacheinander importiert, und eine Benachrichtigung bestätigt jede einzelne.

Während eine Datei importiert wird, zeigt *undash* „Analysiere Daten“ an. Beim Import

1. wandelt *undash* die Datei in Parquet um und speichert sie in Ihrem Browser,
2. erkennt den Datentyp jeder Spalte und
3. berechnet Statistiken für jede Spalte, etwa die Anzahl unterschiedlicher Werte, fehlende Werte, Minimum und Maximum. Bei Tabellen mit mehr als 10 Millionen Zeilen sind diese Statistiken Näherungswerte.

Schlägt ein Import fehl, bleibt nichts davon zurück.

### Größenbeschränkungen

Die Dateien eines Imports dürfen zusammen bis zu **2 GB** groß sein. Außerdem müssen sie in den Speicherplatz passen, den Ihr Browser *undash* zur Verfügung stellt. Andernfalls zeigt *undash* „Kein ausreichender Platz im Dateisystem des Browsers vorhanden!“ an.

### Spaltentypen

*undash* ordnet die von DuckDB erkannten Spaltentypen diesen Typen zu:

| Typ | Beispiele |
|---|---|
| Zeichenkette | Text, UUIDs |
| Wahrheitswert | true / false |
| Ganze Zahl | ganze Zahlen |
| Gleitkommazahl | Dezimalzahlen |
| Datum | `2026-09-24` |
| Datum mit Uhrzeit | `2026-09-24 14:30:00`, mit oder ohne Zeitzone |
| Uhrzeit | `14:30:00` |

Spalten anderer Typen, etwa Zeitspannen, werden angezeigt, können aber nicht für Diagramme verwendet werden.

::: tip TIPP
Wird eine Spalte mit dem falschen Typ erkannt, korrigieren Sie dies in der SQL-Abfrage des Modells, zum Beispiel mit `CAST(zip AS VARCHAR) AS zip`. Siehe [Modelle & SQL](./models).
:::

### Tabellennamen

Jede Tabelle hat einen **Titel**, der in der App angezeigt wird, und einen **Namen** (den „Name der Datenbank-Tabelle“), den Sie in SQL verwenden. Beide werden aus dem Dateinamen abgeleitet: Aus `Sales 2024.csv` wird die Tabelle `sales_2024` mit dem Titel „Sales 2024“.

Gibt es bereits eine Tabelle oder ein Modell mit diesem Namen, fragt *undash* vor dem Import nach einem anderen Namen. Bestehende Tabellen werden nie überschrieben.

## Tabellen verwalten

Jede Tabelle in der Liste **Tabellen** zeigt ihren Titel, die Anzahl der Spalten und Zeilen sowie ihren Namen. Klicken Sie auf den Namen, um ihn in die Zwischenablage zu kopieren.

| Aktion | So geht's |
|---|---|
| **Öffnen** | Klicken Sie auf die Tabelle, oder drücken Sie `Enter`. Dadurch öffnet sich ein neues Modell mit `SELECT * FROM <table>`. |
| **Bearbeiten** | ⋮-Menü → **Bearbeiten**, oder `e`. Ändert Titel und Namen. Der Name ist gesperrt, solange ein Modell die Tabelle verwendet. |
| **Exportieren** | ⋮-Menü → **Exportieren**, oder `d`. Lädt die Tabelle im Daten-Export-Format herunter. |
| **Löschen** | ⋮-Menü → **Löschen**, oder `Ctrl+Shift+D`. Nicht möglich, solange ein Modell die Tabelle verwendet. |

::: warning WARNUNG
Eine Tabelle wird sofort gelöscht. Es gibt keine Rückfrage und kein Rückgängigmachen.
:::

Titel können pro Sprache festgelegt werden. Klicken Sie im Bearbeitungsformular auf die Sprachschaltfläche neben dem Titelfeld (zum Beispiel „en“), um zwischen den Sprachen zu wechseln.

### Suchen und Sortieren

Sobald mindestens eine Tabelle oder ein Modell vorhanden ist, erscheint über den Listen ein Feld **Suche**. Es filtert Modelle und Tabellen während der Eingabe. Drücken Sie `/`, um in das Suchfeld zu springen, `Enter`, um den ersten Treffer zu öffnen, und `Escape`, um die Suche zu leeren.

Enthält eine Liste mehr als einen Eintrag, sortieren zwei Schaltflächen in ihrer Kopfzeile sie nach Zeit oder Alphabet, auf- oder absteigend.

## Daten exportieren

Tabellen und Modelle lassen sich über ⋮-Menü → **Exportieren** oder mit `d` exportieren. Die Datei wird nach der Tabelle bzw. dem Modell benannt, und das Format bestimmt die Einstellung **Daten-Export-Format** (siehe [Einstellungen](./settings)):

| Format | Ergebnis |
|---|---|
| CSV (Standard) | Kommagetrennt, mit Kopfzeile |
| XLSX | Eine Excel-Arbeitsmappe mit einem Tabellenblatt namens „undash“ |
| JSON | Ein JSON-Array von Datensätzen |
| Parquet | Eine Parquet-Datei |

Ein Modell wird mit dem Ergebnis seiner SQL-Abfrage exportiert.

::: tip TIPP
Der XLSX-Export ist das langsamste Format. Schlägt ein großer Export mit „Nicht genügend Speicher vorhanden!“ fehl, versuchen Sie es mit CSV oder Parquet.
:::

## Projekt sichern

Das Zip-Symbol in der Kopfzeile von **Dateien** (**Alle Dateien herunterladen**) lädt Ihr gesamtes Projekt als `undash_YYYYMMDD.zip` herunter. Das Archiv enthält alle Tabellen, Modelle, Diagramme und Dashboards. Ihre Einstellungen und API-Schlüssel sind nicht enthalten.

Um eine Sicherung wiederherzustellen, ziehen Sie die `.zip`-Datei allein auf das Feld **Dateien**.

::: danger GEFAHR
Das Importieren einer Sicherung **ersetzt Ihr gesamtes Projekt**. Alle aktuellen Tabellen, Modelle, Diagramme und Dashboards werden zuvor gelöscht. Es gibt keine Rückfrage.
:::

Auf diesem Weg können Sie ein Projekt auch in einen anderen Browser oder auf einen anderen Computer übertragen.

## Remote-Tabellen

Statt Dateien zu importieren, kann *undash* auch Tabellen auf einem DuckDB-Server abfragen. Nur die Abfrageergebnisse werden an den Browser übertragen.

1. Öffnen Sie die App-Einstellungen (`Ctrl+Shift+,`) und geben Sie unter **Zugangsdaten DuckDB-Server** die **DuckDB-URI** und bei Bedarf ein **Auth-Token** ein.
2. Sobald der Server erreichbar ist, erscheint in der Kopfzeile von **Tabellen** eine Schaltfläche **+** (**Remote-Tabelle hinzufügen**). Alternativ drücken Sie `Ctrl+Shift+N`.
3. Wählen Sie eine Tabelle des Servers aus, optional mit **Views einbeziehen**, und geben Sie ihr einen Namen.

Remote-Tabellen tragen ein Wolken-Symbol. Drücken Sie `Ctrl+R` auf einer Remote-Tabelle, um ihre Statistiken zu aktualisieren. Die Server-URI kann nicht geändert werden, solange Remote-Tabellen existieren.
