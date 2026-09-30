# Dimensionen & Metriken

Diagramme setzen sich aus zwei Arten von Attributen zusammen:

- **Dimensionen** teilen die Daten in Gruppen auf: Regionen, Monate, Produktkategorien.
- **Metriken** fassen jede Gruppe zu einer Zahl zusammen: Summe des Umsatzes, durchschnittlicher Preis, Anzahl der Bestellungen.

## Dimensionen

Fügen Sie eine Spalte oder eine transformierte Spalte mit der Kategorie-Schaltfläche oder `d` als Dimension hinzu. `Ctrl+D` auf einer Spalte fügt in einem Schritt eine Transformation und eine Dimension hinzu.

Eine kategoriale Dimension kann nur dann in einem Diagramm verwendet werden, wenn sie weniger als 100 Kategorien hat. Dimensionen mit mehr Kategorien sind ausgegraut, es sei denn, ein Filter schränkt sie ein. Mit einer [Transformation vom Typ Gruppierung, Top-N oder Bottom-N](./fields-transforms#transformationen) reduzieren Sie die Anzahl der Kategorien.

Entfernen Sie eine Dimension mit `Backspace` oder ×. Solange ein Diagramm sie verwendet, ist das nicht möglich.

## Metriken

Eine Metrik fügen Sie mit der Summen-Schaltfläche oder `m` hinzu. Die erste Zeile im Bereich **Metriken** ist immer `*` mit **Anzahl**: Klicken Sie darauf, um die Zeilen jeder Gruppe zu zählen.

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
Kreis-, Donut-Diagramme und Streamgraphs zeigen Teile eines Ganzen. Sie erlauben nur **Summe** und **Anzahl** (ohne Beschränkung auf unterschiedliche Werte), weil sich nur diese sinnvoll zu einem Ganzen addieren.
:::

### Bivariate Metriken

Bivariate Metriken kombinieren zwei Spalten, zum Beispiel die Korrelation von Preis und Menge:

1. Wählen Sie die erste Spalte vor: Klicken Sie auf den kleinen Punkt links in ihrer Zeile oder drücken Sie `Space`.
2. Drücken Sie bei der zweiten Spalte `m` oder klicken Sie auf die Summen-Schaltfläche.

Die zweite Spalte muss numerisch sein. Sind beide Spalten numerisch, stehen diese Aggregationen zur Verfügung: Korrelation, Kovarianz, Kovarianz Pop sowie die Regressionsfunktionen Regr Mittel X, Regr Mittel Y, Regr Anzahl, Regr Abschnitt, Regr R², Regr Steigung, Regr Summe X², Regr Summe X·Y und Regr Summe Y².

**Arg Minimum** und **Arg Maximum** funktionieren auch, wenn die erste Spalte keine Zahl ist. Sie liefern den Wert der ersten Spalte, bei dem die zweite Spalte am kleinsten bzw. am größten ist, zum Beispiel das Produkt mit dem höchsten Preis.

### Eigene Metriken

Eine eigene Metrik berechnet eine Zahl aus anderen Metriken, zum Beispiel eine Marge `(sum_revenue - sum_cost) / sum_revenue` oder den Umsatz pro Bestellung. Klicken Sie auf **+** in der Kopfzeile des Bereichs **Metriken** (**Eigene Metrik hinzufügen**) oder drücken Sie `+` in der Liste, um das Formular zu öffnen:

1. **Name**: der Name der eigenen Metrik, zum Beispiel `margin`.
2. **Modell-Metriken**: die Metriken des Modells, auch andere eigene Metriken. Ein Klick fügt eine Metrik in den Ausdruck ein.
3. **Ad-hoc-Metriken**: Metriken, die nur diese eigene Metrik verwendet. Klicken Sie auf **+** (**Ad-hoc-Metrik hinzufügen**) und wählen Sie eine **Aggregation**, ein **Feld** (oder **\* (Zeilen)**, um Zeilen zu zählen) und je nach Aggregation ein **Zweites Feld** oder **Eindeutig**. Jede erhält automatisch einen Namen. Mit dem Stift benennen Sie sie um.
4. **Ausdruck**: die Formel aus Metriknamen, Zahlen, den Operatoren `+ - * /` und Klammern. Eine Division durch null ergibt keinen Wert.

Jede Ad-hoc-Metrik muss im Ausdruck vorkommen. Eine eigene Metrik darf andere eigene Metriken verwenden, aber nicht auf sich selbst verweisen, weder direkt noch über andere.

Mit der Tastatur gelangen Sie mit `Tab` zu den Metriken des Formulars. Drücken Sie auf einer ausgewählten Metrik kurz `Shift`, um sie an der Cursorposition einzufügen.

In der Liste trägt eine eigene Metrik das Badge **Eigene**, und beim Darüberfahren erscheint ihr Ausdruck. Mit `Enter`, einem Doppelklick auf die Zeile oder einem Klick auf das Badge bearbeiten Sie sie, mit `Backspace` entfernen Sie sie. Eigene Metriken lassen sich wie andere Metriken sortieren. Eine Metrik, die eine eigene Metrik verwendet, lässt sich nicht entfernen, und ihre Aggregation lässt sich nicht ändern.

#### Ad-hoc-Metriken per Filter eingrenzen

Eine Ad-hoc-Metrik lässt sich auf einen Teil der Daten beschränken, zum Beispiel auf den Umsatz der Region Nord, um ihren Anteil am Gesamtumsatz zu berechnen. So gehen Sie vor:

1. Legen Sie einen [Filter](./filters-controls) auf die Spalte an, zum Beispiel `region`, und machen Sie ihn **lokal** (`Shift+G`), damit er nicht für alle Diagramme gilt.
2. Klicken Sie im Formular der eigenen Metrik oben rechts an der Ad-hoc-Metrik auf die Filter-Schaltfläche und wählen Sie den Filter aus.

Die Ad-hoc-Metrik zeigt dann „wo region“ und aggregiert nur die Zeilen, die den Filter passieren. Mehrere Filter werden mit *und* verknüpft. Verwendet werden können nur lokale Filter auf den eigenen Spalten des Modells, keine Steuerelemente und keine Filter auf transformierten Spalten. Ändern Sie die Auswahl des Filters im Bereich **Filter**, aktualisieren sich alle Diagramme mit der eigenen Metrik.

Ein Filter, der eine Ad-hoc-Metrik eingrenzt, lässt sich weder entfernen noch global machen.

## Sortierung

Über Dimensionen und Metriken legen Sie die Sortierung von Diagrammen fest. Klicken Sie auf die Sortier-Schaltfläche links in einer Zeile, um zwischen aufsteigend, absteigend und aus zu wechseln, oder verwenden Sie die Tasten:

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
