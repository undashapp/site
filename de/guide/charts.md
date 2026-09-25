# Diagramme

Diagramme werden im **Diagramm-Konfigurator** der Modellansicht aus den [Dimensionen und Metriken](./dimensions-measures) des Modells erstellt. Das nächste Kapitel, [Diagrammtypen](./chart-types), beschreibt jeden der 21 Diagrammtypen.

## Ein Diagramm erstellen

### 1. Einen Diagrammtyp wählen

Die Leiste mit Diagrammsymbolen listet nur die Diagrammtypen auf, die sich mit den Dimensionen und Metriken des Modells füllen lassen. Passt kein Typ, zeigt der Konfigurator „Keine verfügbaren Diagramme“. Fügen Sie weitere Dimensionen oder Metriken hinzu, um weitere Typen freizuschalten.

- Klicken Sie auf ein Symbol, oder bewegen Sie sich mit `h`/`l` und drücken Sie `Enter`.
- Halten Sie `Shift` gedrückt und drücken Sie `h`/`l`, um nur zwischen Typen zu wechseln, die die aktuelle Kanalzuweisung beibehalten können. Die übrigen sind ausgegraut.
- Drücken Sie `c` und tippen Sie den Anfang eines Namens, um zu einem Typ zu springen, zum Beispiel `c` `bal` für das Ballondiagramm.

### 2. Die Kanäle zuweisen

Unterhalb des Diagrammtyps hat jeder **Kanal** des Diagramms eine Zeile, zum Beispiel `x`, `y_max` oder `color`. Pflichtkanäle sind mit `*` gekennzeichnet. Das Badge zeigt die Dimension oder Metrik auf dem Kanal oder „keine“.

- Klicken Sie auf das Badge oder drücken Sie `l`/`h`, um die Attribute durchzuschalten, die zum Kanal passen.
- Drücken Sie `Backspace` oder ×, um einen optionalen Kanal zu leeren.
- Drücken Sie `t` oder klicken Sie auf den Namen des Kanals, um `x` und `y` (bzw. `row` und `col`) zu vertauschen.

Ein Attribut kann pro Diagramm nur auf einem Kanal verwendet werden. Die Ausnahme ist der Kanal `color`: Er kann ein Attribut wiederholen, zum Beispiel um Balken nach ihrer eigenen Kategorie einzufärben.

Wenn Sie den Diagrammtyp wechseln, behält *undash* jede Zuweisung bei, die zum neuen Typ passt.

::: tip TIPP
Die Kanalliste ist das Rezept des Diagramms: `x` und `y` sind die Achsen, `color` teilt die Daten in farbige Reihen auf, `row` und `col` teilen das Diagramm in Small Multiples auf, und Kanäle wie `r`, `angle` oder `opacity` bilden eine Metrik auf Größe, Winkel oder Deckkraft ab.
:::

### 3. Das Diagramm speichern

- Klicken Sie auf die Speichern-Schaltfläche in der Zeile des Konfigurators oder drücken Sie `Ctrl+S`. Das Diagramm erhält einen Standardnamen, etwa „Säulendiagramm 01“.
- `Shift`+Klick auf die Speichern-Schaltfläche oder `Ctrl+Shift+S` lässt Sie einem neuen Diagramm zuerst einen Namen geben. Das Formular fragt außerdem nach einer **Referenz zum Diagramm**, dem internen Namen des Diagramms.

Beim Speichern eines Diagramms wird auch das Modell gespeichert. Ist die [Auto-Benennung](./ai#automatische-funktionen) aktiviert, gibt die KI neuen Diagrammen einen Titel.

## Small Multiples

Jeder Diagrammtyp hat zwei optionale Kanäle, `row` und `col`. Weisen Sie einem oder beiden eine Dimension zu, um das Diagramm in ein Raster kleiner Diagramme aufzuteilen, eines pro Kategorie, zum Beispiel den Umsatz pro Monat mit einem Feld pro Region.

Die Felder werden kleiner, je mehr es sind. Werden sie zu klein zum Zeichnen, zeigt das Diagramm stattdessen eine schraffierte Fläche. Vergrößern Sie die Ansicht oder filtern Sie die Dimension auf weniger Kategorien.

## Sortierung

Kanäle mit Kategorien oder Metriken lassen sich sortieren. Klicken Sie auf die Sortier-Schaltfläche links in einer Kanalzeile oder verwenden Sie `<` (aufsteigend), `>` (absteigend) und `u` (entfernen). Das Sortieren der Metrik eines Balkendiagramms ordnet die Balken nach Wert, das Sortieren seiner Kategorienachse ordnet sie nach Namen.

## Beschriftungen, Legenden und Farben

- **Titel:** Der Titel eines Diagramms ist sein Name. Benennen Sie Diagramme im Bereich **Diagramme** um.
- **Achsenbeschriftungen:** Achsen werden mit den Namen ihrer Dimensionen und Metriken beschriftet, einschließlich [Aliasen](./fields-transforms#aliase). Metriken lauten etwa `sum_revenue`, und **Anzahl** erscheint als „Anzahl“.
- **Zahlen:** Achsen verwenden eine Kurzschreibweise wie `1.2k` oder `3M` und die Trennzeichen der aktuellen [Sprache](./settings).
- **Fehlende Werte** erscheinen als „Unbekannt“, der Rest einer [Gruppierung](./fields-transforms#gruppierung) als „Sonstige“.
- **Legende:** Ein Diagramm mit einem `color`-Kanal zeigt oben rechts eine Legende, sofern die Farben nicht bereits durch eine Achse erklärt werden. Lange Legenden lassen sich scrollen.
- **Farben:** Die Farben stammen aus den [Einstellungen](./settings) **Farbe** und **Farbpalette**. Eine [statische](./dimensions-measures#statische-und-dynamische-attribute) Farbdimension behält die Farbe jeder Kategorie bei, wenn sich Filter ändern. Absteigendes Sortieren des `color`-Kanals kehrt die Palette um.

## Diagramme verwalten

Der Bereich **Diagramme** listet die gespeicherten Diagramme des Modells auf, die neuesten zuerst. Das Fokussieren eines Diagramms hebt es im Dashboard hervor.

| Aktion | Schaltfläche | Taste |
|---|---|---|
| Im Konfigurator bearbeiten | ↑ Kreis | `u` |
| Umbenennen | Stift | `e` |
| Im Dashboard ein- oder ausblenden | Häkchen | `d` |
| Filter und Steuerelemente zuweisen | Klick auf die Zeile | `Enter` |
| Löschen | × | `Backspace` |

Um ein Diagramm zu bearbeiten, laden Sie es mit `u` in den Konfigurator, ändern es und speichern es erneut. Um die Bearbeitung ohne Speichern zu beenden, drücken Sie `Escape` oder das × in der Zeile des Konfigurators.

Um ein Diagramm zu kopieren, laden Sie es in den Konfigurator, drücken `Escape`, um die Bearbeitung zu beenden, und speichern es erneut. Die Kopie wird als neues Diagramm gespeichert.

Das × in der Kopfzeile des Bereichs löscht alle Diagramme des Modells auf einmal, ohne Rückfrage.

## Das SQL eines Diagramms ansehen

Ist die [DB-Konsole verknüpft](./models#verknüpfter-modus), zeigt die Konsole die Abfrage hinter dem aktuellen Diagramm und die zurückgegebenen Daten, sobald sich der Tastaturfokus in einem der Diagrammbereiche befindet. So können Sie gut nachvollziehen oder wiederverwenden, was ein Diagramm berechnet.

## Ansichtssteuerung

Jede Ansicht hat unten rechts eine Steuerleiste. Die Einstellungen werden für die Diagrammansicht und das Dashboard getrennt gespeichert.

| Steuerung | Funktion | Tasten |
|---|---|---|
| **Skalierungsmodus** | Das Diagramm für seinen Rahmen anordnen, oder es in normaler Größe zeichnen und wie ein Bild skalieren | `Ctrl+G` |
| **Abstand** | Innenabstand um das Diagramm (und zwischen Diagrammen im Dashboard), −9 bis +9 | `Ctrl+Alt+Shift+=` / `-` / `0` |
| **Schriftgröße** | Größe aller Texte, −9 bis +9 | `Ctrl+Shift+=` / `-` / `0` |
| **Diagrammgröße** | Größe des Diagramms, −9 bis +9. Mausrad und Zwei-Finger-Zoom funktionieren ebenfalls. | `Ctrl+=` / `-` / `0` |
| **Anpassungsmodus** | *Keine*: natürliche Größe, bei Übergröße per Ziehen verschieben. *Verkleinern*: verkleinern, wenn es nicht passt. *Einpassen*: füllt immer die Ansicht. | `Ctrl+Z` / `Ctrl+Shift+Z` |
| **Seitenverhältnis** | Beim Einpassen die Proportionen des Diagramms beibehalten. Ausschalten, um das Diagramm auf die Ansicht zu dehnen. | `Ctrl+A` |
| **Bezugsrahmen** | Das Diagramm in das Rechteck der Ansicht oder in ein Quadrat einpassen | `Ctrl+R` |

Ein Doppelklick auf einen Schieberegler setzt ihn zurück.

Oben rechts in jeder Ansicht befinden sich die **Schloss**-Schaltfläche (siehe [Statische und dynamische Attribute](./dimensions-measures#statische-und-dynamische-attribute)) und die **Export**-Schaltfläche. Im Dashboard finden Sie dort außerdem die Layout-Steuerung (siehe [Dashboards](./dashboards#layout)).

## Ein Diagramm exportieren

Fahren Sie mit der Maus über die obere rechte Ecke eines Diagramms, um seine Export-Schaltfläche einzublenden, oder drücken Sie `Ctrl+Shift+D`, um die fokussierte Ansicht zu exportieren. Format, Papiergröße und Farben stammen aus den Export-[Einstellungen](./settings): PDF, SVG, PNG oder JPEG, in der eigenen Größe der Ansicht oder auf A4, A3, A2, Letter, Legal oder Tabloid, in Schwarzweiß oder in den Farben des aktuellen Designs.
