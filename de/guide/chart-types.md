# Diagrammtypen

*undash* bietet 21 Diagrammtypen. Diese Seite zeigt für jeden Typ die verfügbaren Kanäle. Pflichtkanäle sind wie im Konfigurator mit `*` markiert.

Zusätzlich unterstützt jeder Diagrammtyp die optionalen Kanäle `row` und `col` für [Small Multiples](./charts#small-multiples). Sie sind in den Tabellen nicht extra aufgeführt.

::: info Dimensionen oder Metriken?
Manche Diagramme stellen **Dimensionen** direkt dar, ohne Aggregation: Jeder Datenpunkt wird zu einer Markierung (Streu-, Dichte-, Tick-Diagramm). Andere stellen **Metriken** dar, eine Markierung pro Gruppe (Säulen-, Linien-, Kreisdiagramm). Die Tabellen zeigen, was jeweils gilt.
:::

## Kategorien vergleichen

### Säulendiagramm

Senkrechte Balken, einer pro Kategorie.

| Kanal | Inhalt |
|---|---|
| `x`* | Eine Dimension: Kategorien, ganze Zahlen oder Datumswerte. Top-N und Bottom-N funktionieren hier. |
| `y_max`* | Eine Metrik: die Höhe des Balkens. |
| `y_min` | Eine Metrik. Macht aus den Balken schwebende Balken von `y_min` bis `y_max`. |
| `color` | Eine Dimension. |

Der Kanal `color` verhält sich automatisch:

- Mit derselben Dimension wie `x` erhält jeder Balken eine eigene Farbe.
- Mit einer anderen Dimension und einer Metrik **Summe** oder **Anzahl** werden die Balken **gestapelt**.
- Bei anderen Metriken und bei schwebenden Balken wird der Farbkanal ignoriert, da sich die Werte nicht stapeln lassen.

### Balkendiagramm

Waagerechte Balken. Wie das Säulendiagramm mit vertauschten Achsen: `y`* für die Kategorien, `x_max`* und `x_min` für die Metriken sowie `color`.

### Lollipop-Diagramm und horizontales Lollipop-Diagramm

Wie Säulen- und Balkendiagramm, gezeichnet als Linie mit einem Punkt. Mit `y_min` (bzw. `x_min`) zeigen sie Spannen als Hanteln. Sie haben keinen Kanal `color`.

### Ballondiagramm

Ein Raster aus Kreisen für zwei kategoriale Dimensionen, zum Beispiel Produkt nach Region.

| Kanal | Inhalt |
|---|---|
| `x`*, `y`* | Kategoriale Dimensionen. |
| `r`* | Eine Metrik: die Größe der Kreise. |
| `color` | Eine Dimension. |

### Netzdiagramm

Eine Speiche pro Kategorie, ein Polygon pro Reihe. Gut geeignet für Profile, etwa Punktzahlen in mehreren Disziplinen.

| Kanal | Inhalt |
|---|---|
| `angle`* | Eine Dimension: die Speichen. Top-N und Bottom-N funktionieren hier. |
| `r`* | Eine Metrik: der Abstand zur Mitte. Sortieren Sie sie, um die Speichen nach Wert zu ordnen. |
| `color` | Eine Dimension: ein Polygon pro Kategorie. |

### Leistungskennzahl

Eine einzelne große Zahl, etwa der Gesamtumsatz.

| Kanal | Inhalt |
|---|---|
| `text`* | Eine Metrik. |

Mit `row` oder `col` zeigen Sie eine Kachel pro Kategorie.

## Teile eines Ganzen

### Kreisdiagramm und Donut-Diagramm

Segmente eines Kreises. Das Donut-Diagramm ist ein Kreisdiagramm mit Loch.

| Kanal | Inhalt |
|---|---|
| `color`* | Eine Dimension: die Segmente. Top-N und Bottom-N funktionieren hier. |
| `angle`* | Eine Metrik **Summe** oder **Anzahl**: die Größe der Segmente. |

Segmente werden beschriftet, wenn genug Platz ist; die Legende wird dann ausgeblendet.

## Veränderungen über die Zeit

### Liniendiagramm

| Kanal | Inhalt |
|---|---|
| `x`* | Eine Dimension: Datumswerte, Uhrzeiten oder Zahlen. Für monatliche oder jährliche Linien verwenden Sie eine Transformation [Partition Datum](./fields-transforms#partition-datum). |
| `y`* | Eine Metrik. |
| `color` | Eine Dimension: eine Linie pro Kategorie. |

Bei sehr vielen Punkten wird die Linie auf die darstellbare Auflösung ausgedünnt, ohne dass Spitzen verloren gehen.

### Flächendiagramm

Dieselben Kanäle wie das Liniendiagramm. Mehrere Reihen überlagern sich auf einer gemeinsamen Grundlinie; sie werden nicht gestapelt.

### Streamgraph

Dieselben Kanäle wie das Flächendiagramm, aber die Reihen werden um eine fließende Mittellinie gestapelt. `y`* benötigt eine Metrik **Summe** oder **Anzahl**.

### Verbundenes Streudiagramm

Punkte, die der Reihe nach verbunden sind, zum Beispiel wie sich Preis und Menge über die Jahre entwickelt haben.

| Kanal | Inhalt |
|---|---|
| `x`*, `y`* | Metriken. |
| `z`* | Eine geordnete Dimension, etwa Jahre oder eine Partition Datum: die Reihenfolge, in der die Punkte verbunden werden. Die Punkte werden damit beschriftet. |
| `color` | Eine Dimension. |

## Zusammenhänge

### Streudiagramm

Ein Punkt pro Datenpunkt.

| Kanal | Inhalt |
|---|---|
| `x`*, `y`* | Numerische oder Datums-**Dimensionen** (nicht aggregiert). |
| `color` | Eine Dimension. |

Bei sehr vielen Punkten werden Punkte, die auf dasselbe Pixel fallen, zusammengefasst; ihre Deckkraft zeigt, wie viele es sind.

### Blasendiagramm

Eine Blase pro Kategorie, platziert anhand zweier Metriken.

| Kanal | Inhalt |
|---|---|
| `x`*, `y`* | Metriken. |
| `z`* | Eine kategoriale Dimension: eine Blase pro Kategorie, damit beschriftet. |
| `r` | Eine Metrik: die Größe der Blasen. Darf `x` oder `y` wiederholen. |
| `color` | Eine Dimension. |

### 2D-Dichte-Diagramm

Eine geglättete Dichte von Punkten in zwei Dimensionen. Nützlich, wenn ein Streudiagramm zu viele Punkte hat, um es zu lesen.

| Kanal | Inhalt |
|---|---|
| `x`*, `y`* | Numerische oder Datums-Dimensionen. |
| `color` | Eine Dimension: eine Dichte pro Kategorie. |

## Verteilungen

### Histogramm

| Kanal | Inhalt |
|---|---|
| `x`* | Eine Dimension **Partitionsindex** aus einer Transformation [Partition](./fields-transforms#partition). |
| `y`* | Eine Metrik, meist **Anzahl**. |
| `color` | Eine Dimension. |

Die Anzahl der Partitionen ändern Sie am Badge der Transformation Partition.

### Dichte-Diagramm

Eine geglättete Kurve der Verteilung einer Dimension.

| Kanal | Inhalt |
|---|---|
| `x`* | Eine numerische oder Datums-Dimension. |
| `color` | Eine Dimension: eine Kurve pro Kategorie. |

### Tick-Diagramm

Ein Strich pro Datenpunkt entlang einer Achse, optional in einer Zeile pro Kategorie.

| Kanal | Inhalt |
|---|---|
| `x`* | Eine numerische oder Datums-Dimension. |
| `y` | Eine kategoriale Dimension. |

### Heatmap

Ein Raster aus Zellen für zwei partitionierte Dimensionen.

| Kanal | Inhalt |
|---|---|
| `x`*, `y`* | Dimensionen **Partitionsindex** aus Transformationen [Partition](./fields-transforms#partition). |
| `opacity` | Eine Metrik: die Schattierung jeder Zelle. |

## Karten

### Karte

Eine Choroplethenkarte: Regionen, eingefärbt nach einer Metrik.

| Kanal | Inhalt |
|---|---|
| `region`* | Eine Dimension mit einer Transformation [Geo](./fields-transforms#geo). |
| `opacity`* | Eine Metrik: die Schattierung jeder Region. |

Die Karte zoomt auf die Regionen in den Daten und behält stets ihre geografischen Proportionen. Unterstützt werden Länder, US-Bundesstaaten, deutsche Bundesländer und deutsche Landkreise. Regionen werden anhand ihrer **Codes** zugeordnet, nicht anhand ihrer Namen:

| Region | Codes | Ebenfalls akzeptiert |
|---|---|---|
| Länder | ISO 3166-1 alpha-2 (`DE`) | alpha-3 (`DEU`) und IOC-Codes |
| US-Bundesstaaten | USPS-Codes (`CA`), 50 Staaten und DC | |
| Bundesländer | Zweistelliger AGS (`08`) | `8`, Buchstabencodes wie `BW` oder `DE-BW` |
| Landkreise | Fünfstelliger AGS (`08111`) | Zahlen ohne führende Null |

Groß-/Kleinschreibung und umgebende Leerzeichen spielen bei der Zuordnung keine Rolle. Die Spalte muss vom Typ **Zeichenkette** sein. Sind Ihre Codes als Zahlen gespeichert, wandeln Sie sie in der Abfrage des Modells um, zum Beispiel mit `CAST(ags AS VARCHAR) AS ags`.

## Grenzen

- Eine kategoriale Dimension kann nur dann auf einer Achse, als Farbe oder für Small Multiples verwendet werden, wenn sie nach Anwendung der Filter weniger als **100** Kategorien hat.
- Ein Diagramm, das für seinen Inhalt zu klein ist, zeigt stattdessen eine schraffierte Fläche. Vergrößern Sie die Ansicht, verringern Sie die [Schriftgröße](./charts#ansichtssteuerung) oder reduzieren Sie die Anzahl der Kategorien.
- Ein Diagramm ohne Daten zeigt „Keine Daten“.
