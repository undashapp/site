# Spalten & Transformationen

## Spalten

Der Bereich **Spalten** listet alle Spalten der Modellabfrage auf. Zu jeder Spalte sehen Sie ein Typsymbol, den Namen und eine Statistik.

Die Schaltfläche in der Kopfzeile des Bereichs (oder `p`) wechselt die Statistik:

| Modus | Zeigt |
|---|---|
| **Anzahl** (Σ) | Die Anzahl unterschiedlicher Werte. Ein `~` kennzeichnet genäherte oder gerundete Werte. Dezimalspalten zeigen stattdessen einen kleinen Boxplot aus Minimum, Quartilen, Median und Maximum. |
| **Fehlende Werte** | Den Anteil fehlender (Null-)Werte. |
| **Keine** | Nichts. |

Manche Spalten sind ausgegraut und können nicht verwendet werden: Spalten nicht unterstützter Typen (etwa Zeitspannen) und Spalten, die nur einen einzigen Wert enthalten.

### Schaltflächen einer Spalte

Fahren Sie mit der Maus über eine Spalte oder wählen Sie sie mit der Tastatur aus, um ihre Schaltflächen anzuzeigen:

| Schaltfläche | Aktion | Taste |
|---|---|---|
| Stift | Alias der Spalte bearbeiten | `e` |
| Spalte | Transformation hinzufügen | `t` |
| Filter | Filter hinzufügen oder entfernen | `f` / `Shift+F` |
| Regler | Steuerelement hinzufügen oder entfernen | `Ctrl+F` / `Ctrl+Shift+F` |
| Kategorie | Dimension hinzufügen oder entfernen | `d` / `Shift+D` |
| Summe | Metrik hinzufügen | `m` |

Weitere Tastenkürzel für eine ausgewählte Spalte:

- `Ctrl+D` fügt eine Transformation hinzu und macht sie in einem Schritt zur Dimension.
- `Shift+T` entfernt alle Transformationen der Spalte, `Shift+M` alle ihre Metriken.
- `Space` wählt die Spalte für eine [bivariate Metrik](./dimensions-measures#bivariate-metriken) vor.

Ist eine Rolle aktiv, erscheint die zugehörige Schaltfläche fett. Ist sie für die Spalte nicht möglich, wird die Schaltfläche ausgeblendet.

Ein Klick auf eine Spalte (oder `Enter`) führt die naheliegende Aktion aus: Dezimalzahlen erhalten eine Metrik, kategoriale Spalten werden zu Dimensionen, und Spalten, die zuerst eine Transformation benötigen (etwa Datumswerte), erhalten eine.

### Aliase

Ein Alias gibt einer Spalte einen verständlicheren Namen, ohne die Daten zu verändern. Klicken Sie auf den Stift oder drücken Sie `e`, geben Sie den Alias ein und drücken Sie `Enter`. `Escape` bricht ab.

- Ein Alias besteht aus Kleinbuchstaben, Ziffern und Unterstrichen und beginnt mit einem Buchstaben oder Unterstrich, zum Beispiel `revenue_eur`.
- Er darf nicht der Name einer anderen Spalte sein.
- Um einen Alias zu entfernen, leeren Sie ihn oder geben Sie den ursprünglichen Namen der Spalte ein.

Der Alias wird überall im Modell angezeigt: in Transformationen, Metriken (`sum_revenue_eur`), Filtern, Diagrammen und Legenden. Fahren Sie mit der Maus über eine Spalte mit Alias, um den ursprünglichen Spaltennamen zu sehen. Aliase gelten nur für das jeweilige Modell. Zwei Modelle auf derselben Tabelle können eine Spalte also unterschiedlich benennen.

::: tip TIPP
Aliase helfen auch dem [KI-Assistenten](./ai). Eine Spalte namens `c1` sagt ihm nichts, ein Alias `revenue` dagegen schon.
:::

## Transformationen

Eine Transformation leitet aus einer bestehenden Spalte eine neue ab, zum Beispiel den Monat eines Datums oder Partitionen einer Zahl. Transformierte Spalten erscheinen im Bereich **Transformationen**. Sie werden ausschließlich als **Dimensionen** verwendet; sie können weder gefiltert noch aggregiert werden.

Fügen Sie eine Transformation mit der Spalten-Schaltfläche einer Spalte oder mit `t` hinzu. *undash* wählt die erste Transformation, die zum Typ der Spalte passt. Anschließend passen Sie sie in der Zeile der Transformation an:

| Aktion | Taste / Maus |
|---|---|
| Nächste / vorherige Option (z. B. Anzahl der Partitionen) | `l`/`→` und `h`/`←`, oder Klick auf das Badge (`Shift`+Klick: vorherige) |
| Nächster / vorheriger Transformationstyp | `Shift+L` und `Shift+H`, oder Klick auf das Symbol (`Shift`+Klick: vorheriger) |
| Als Dimension hinzufügen / Dimension entfernen | `d` / `Shift+D` |
| Weitere Transformation auf derselben Spalte hinzufügen | `t` |
| Transformation entfernen | `Backspace` oder × |

Transformierte Spalten werden nach der Spalte und der Transformation benannt, zum Beispiel `order_date_date_bin` oder `revenue_bin_index`.

### Partition

Für Spalten vom Typ **Ganze Zahl** und **Gleitkommazahl**. Teilt den Wertebereich in 2 bis 128 gleich große Partitionen. Es gibt zwei Varianten:

- **Partitionsbeginn**: die untere Grenze jeder Partition als Dezimalzahl. Gut geeignet für Streudiagramme und ähnliche Darstellungen.
- **Partitionsindex**: die Nummer der Partition, von 1 bis n. Erforderlich für **Histogramme** und **Heatmaps**.

Die Optionen bieten „runde“ Partitionsbreiten (das 1-, 2-, 2,5- oder 5-Fache einer Zehnerpotenz) sowie Partitionsanzahlen nach den statistischen Regeln von Sturges, Rice, Scott und Freedman-Diaconis. Das Badge zeigt die Regel und die Anzahl der Partitionen, zum Beispiel „sturges 12“.

### Partition Datum

Für Spalten vom Typ **Datum**, **Datum mit Uhrzeit** und **Uhrzeit**. Rundet Werte auf einen Zeitraum ab: Jahr, Quartal, Monat, Woche, Tag, Stunde, Minute, Sekunde oder Millisekunde. Wochen beginnen am Montag.

Angeboten werden nur Zeiträume, die für den Wertebereich der Spalte zwischen 2 und 256 Partitionen ergeben. Für reine Datumswerte gibt es keine Zeiträume unter einem Tag, für Uhrzeiten nur Stunden und kleinere Einheiten.

### Extrakt Datum

Für Spalten vom Typ **Datum**, **Datum mit Uhrzeit** und **Uhrzeit**. Extrahiert einen Teil des Werts als ganze Zahl:

| Teil | Werte |
|---|---|
| Jahr | die Jahre in den Daten |
| Quartal | 1–4 |
| Monat | 1–12 |
| Woche | 1–53 |
| Tag | 1–31 |
| Stunde | 0–23 |
| Minute | 0–59 |
| Sekunde | 0–59 |
| Millisekunde | 0–999 |
| Wochentag | 0–6 |
| Tag im Jahr | 1–366 |

Verwenden Sie Extrakt Datum, um Zeiträume zu vergleichen, zum Beispiel den Umsatz nach Monat über mehrere Jahre hinweg.

### Gruppierung

Für kategoriale Spalten mit mehr als zwei Werten. Drücken Sie `e` oder klicken Sie auf die Zeile, um die Kategorienliste zu öffnen, und wählen Sie dann die Kategorien aus, die erhalten bleiben sollen. Alle anderen Kategorien werden zu **Sonstige** zusammengefasst. Mindestens eine Kategorie muss ausgewählt bleiben.

### Top-N und Bottom-N

Für kategoriale Spalten. Behält die N Kategorien mit dem größten (Top-N) oder kleinsten (Bottom-N) Wert der Metrik des Diagramms. N reicht von 1 bis 20 und darüber hinaus in Stufen bis 100. Top-N und Bottom-N benötigen mindestens eine Metrik im Modell und funktionieren in Säulen-, Balken-, Kreis-, Donut- und Netzdiagrammen.

### Geo

Für Spalten vom Typ **Zeichenkette**, die Regionscodes enthalten. Geo-Spalten sind für Diagramme vom Typ **Karte** erforderlich. Unterstützte Regionen:

| Region | Codes |
|---|---|
| Länder | ISO 3166 Alpha-2 (`DE`) oder Alpha-3 (`DEU`) |
| US-Bundesstaaten | USPS-Codes (`CA`) |
| Bundesländer | Amtliche Gemeindeschlüssel der Länder (AGS) |
| Landkreise | Amtliche Gemeindeschlüssel der Kreise (AGS) |

Die Geo-Transformation wird nur angeboten, wenn *alle* Werte der Spalte gültige Codes einer Region sind. Passen die Codes zu mehreren Regionen, wechseln Sie mit dem Badge zwischen ihnen.
