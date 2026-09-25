# Dimensionen & Metriken

Diagramme werden aus zwei Arten von Attributen aufgebaut:

- **Dimensionen** teilen die Daten in Gruppen auf: Regionen, Monate, Produktkategorien.
- **Metriken** fassen jede Gruppe zu einer Zahl zusammen: Summe des Umsatzes, durchschnittlicher Preis, Anzahl der Bestellungen.

## Dimensionen

Fügen Sie eine Spalte oder eine transformierte Spalte mit der Kategorie-Schaltfläche oder `d` als Dimension hinzu. `Ctrl+D` auf einer Spalte fügt in einem Schritt eine Transformation und eine Dimension hinzu.

Eine kategoriale Dimension kann nur dann in einem Diagramm verwendet werden, wenn sie weniger als 100 Kategorien hat. Dimensionen mit mehr Kategorien sind ausgegraut, es sei denn, ein Filter schränkt sie ein. Mit einer [Transformation vom Typ Gruppierung, Top-N oder Bottom-N](./fields-transforms#transformationen) reduzieren Sie die Anzahl der Kategorien.

Eine Dimension kann nicht entfernt werden, solange ein Diagramm sie verwendet. Entfernen Sie sie mit `Backspace` oder ×.

## Metriken

Fügen Sie eine Metrik mit der Summen-Schaltfläche oder `m` auf einer Spalte hinzu. Die erste Zeile im Bereich **Metriken** ist immer `*` mit **Anzahl**: Klicken Sie darauf, um die Zeilen jeder Gruppe zu zählen.

### Aggregationen

Klicken Sie auf das Badge einer Metrik oder drücken Sie `l`/`h`, um ihre Aggregationen durchzuschalten. Welche verfügbar sind, hängt vom Typ der Spalte ab:

| Spaltentyp | Aggregationen |
|---|---|
| Ganze Zahl, Gleitkommazahl | Mittelwert, Summe, Anzahl, Median, StAbw, StAbw Pop, Varianz, Varianz Pop, GeoMittel, Minimum, Maximum, Modalwert, MAD, Schiefe, Wölbung, Produkt, Erstes, Letztes |
| Zeichenkette, Datum, Datum mit Uhrzeit, Uhrzeit | Median, Minimum, Maximum, Modalwert, Anzahl, Erstes, Letztes |
| Wahrheitswert | Modalwert, Anzahl, Erstes, Letztes |

- **Unterschiedliche Werte:** Drücken Sie `d` oder klicken Sie auf den rechten Rand des Badges, um nur unterschiedliche Werte zu aggregieren, zum Beispiel um verschiedene Kunden zu zählen. Ein „D“ kennzeichnet solche Metriken.
- **Duplizieren:** Drücken Sie `c`, um dieselbe Spalte mit der nächsten Aggregation erneut hinzuzufügen. So können Sie Mittelwert und Maximum nebeneinander darstellen.

Die Aggregation einer Metrik kann nicht geändert werden, solange ein Diagramm die Metrik verwendet.

::: tip TIPP
Kreis-, Donut-Diagramme und Streamgraphs zeigen Teile eines Ganzen. Sie akzeptieren nur **Summe** und **Anzahl** (nicht auf unterschiedliche Werte beschränkt), weil sich nur diese korrekt aufsummieren.
:::

### Bivariate Metriken

Bivariate Metriken kombinieren zwei Spalten, zum Beispiel die Korrelation von Preis und Menge:

1. Wählen Sie die erste Spalte vor: Klicken Sie auf den kleinen Punkt links in ihrer Zeile oder drücken Sie `Space`.
2. Drücken Sie auf der zweiten Spalte `m` oder klicken Sie auf die Summen-Schaltfläche.

Die zweite Spalte muss eine Zahl sein. Sind beide Spalten Zahlen, stehen diese Aggregationen zur Verfügung: Korrelation, Kovarianz, Kovarianz Pop sowie die Regressionsfunktionen Regr Mittel X, Regr Mittel Y, Regr Anzahl, Regr Abschnitt, Regr R², Regr Steigung, Regr Summe X², Regr Summe X·Y und Regr Summe Y².

**Arg Minimum** und **Arg Maximum** funktionieren auch, wenn die erste Spalte keine Zahl ist. Sie liefern den Wert der ersten Spalte, bei dem die zweite Spalte am kleinsten bzw. am größten ist, zum Beispiel das Produkt mit dem höchsten Preis.

## Sortierung

Dimensionen und Metriken können Diagramme sortieren. Klicken Sie auf die Sortier-Schaltfläche links in einer Zeile, um zwischen aufsteigend, absteigend und aus zu wechseln, oder verwenden Sie die Tasten:

| Taste | Aktion |
|---|---|
| `<` oder `[` | Aufsteigend sortieren |
| `>` oder `]` | Absteigend sortieren |
| `o` / `Shift+O` | Priorität der Sortierung ändern |
| `u` | Sortierung entfernen |

Sind mehrere Attribute sortiert, zeigt eine Zahl ihre Priorität an.

## Statische und dynamische Attribute

Hat ein Modell Filter oder Steuerelemente, zeigen Dimensionen und Metriken eine Schloss-Schaltfläche (`Ctrl+L`):

- **Statisch** (gesperrt): Der Wertebereich des Attributs bleibt fest, wenn sich Steuerelemente ändern. Balken behalten ihre Positionen und Achsen ihre Skalierung, sodass Sie verschiedene Filterzustände vergleichen können.
- **Dynamisch** (entsperrt): Der Wertebereich passt sich an die gefilterten Daten an.

Neue Dimensionen mit bis zu 100 Werten sind zunächst statisch.

Die Schloss-Schaltfläche in der Steuerleiste einer Ansicht (`Ctrl+Shift+L`) wechselt für die gesamte Ansicht zwischen **Alle Dimensionen statisch** und **Dimensionen wie konfiguriert**.

::: tip TIPP
Statische Dimensionen machen Steuerelemente außerdem schneller, weil *undash* die Ergebnisse vorberechnen kann. Siehe [Filter & Steuerelemente](./filters-controls#performance).
:::
