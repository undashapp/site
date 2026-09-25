# Filter & Steuerelemente

*undash* kennt zwei Arten von Filtern:

| | **Filter** | **Steuerelement** |
|---|---|---|
| Zweck | Legt fest, welche Daten das Modell zeigt | Lässt Betrachter die Daten interaktiv erkunden |
| Hinzufügen | Filter-Schaltfläche oder `f` auf einer Spalte | Regler oder `Ctrl+F` auf einer Spalte |
| Entfernen | `Shift+F` auf der Spalte | `Ctrl+Shift+F` auf der Spalte |
| Werte | Genau die eingegebenen Werte | Rasten auf die Stufen des Schiebereglers ein |
| Mit dem Modell gespeichert | Ja, einschließlich der Auswahl | Das Steuerelement wird gespeichert; seine Auswahl wird beim erneuten Öffnen des Modells zurückgesetzt |
| Im Präsentationsmodus | Nicht angezeigt | Im Bereich **Filter** angezeigt |

Eine Spalte kann sowohl einen Filter als auch ein Steuerelement haben. Filter und Steuerelemente wirken auf die Spalten des Modells, nicht auf transformierte Spalten.

::: tip TIPP
Mit Filtern bereinigen Sie die Daten dauerhaft, zum Beispiel indem Sie Testbestellungen ausschließen. Steuerelemente eignen sich für die Fragen, die Betrachter stellen, etwa „nur Region Nord“.
:::

## Filter oder Steuerelement bearbeiten

Klicken Sie auf eine Zeile im Bereich **Filter** oder **Steuerelemente** oder drücken Sie `Enter` oder `e`, um das zugehörige Formular zu öffnen. Das Formular hängt vom Typ der Spalte ab:

| Spaltentyp | Formular |
|---|---|
| Zeichenkette | Eine Werteliste mit Kontrollkästchen und einem Suchfeld. Aktivieren Sie **Ausschließen**, um alles *außer* den markierten Werten zu behalten. **Alle abwählen** leert die Auswahl. |
| Wahrheitswert | Kein Formular. Die Zeile hat einen Schalter mit drei Zuständen: nicht gesetzt, **Ja** und **Nein**. |
| Ganze Zahl | Ein Bereichsregler mit Eingabefeldern. Bei Spalten mit bis zu 100 Werten zusätzlich eine Werteliste zur Auswahl. |
| Gleitkommazahl | Ein Bereichsregler mit Eingabefeldern für Minimum und Maximum sowie **Zurücksetzen**. |
| Datum | Ein Bereichsregler, der je nach Wertebereich in Tagen, Monaten, Quartalen oder Jahren springt. |
| Datum mit Uhrzeit | Ein Bereichsregler mit Eingabefeldern für Datum und Uhrzeit. |
| Uhrzeit | Ein Bereichsregler mit Eingabefeldern für Stunden und Minuten (und Sekunden, falls die Daten welche enthalten). |

Die Zeile zeigt eine Zusammenfassung der Auswahl, etwa „North, South + 3“ oder „ab 100“.

Im Formular schließt `Escape` das Formular, `r` setzt die Auswahl zurück, und `Ctrl+J` / `Ctrl+K` springen zum nächsten bzw. vorherigen Filter. In einer Werteliste starten Sie die Suche einfach durch Tippen. `Enter` wählt alle Treffer aus, mit `j`/`k` bewegen Sie sich durch die Liste, und `Space` schaltet einen Wert um.

## Schaltflächen einer Zeile

| Schaltfläche | Aktion | Taste |
|---|---|---|
| Häkchen | Filter ein- oder ausschalten, ohne ihn zu entfernen | `d` oder `Shift+Enter` |
| Null (Ⓝ) | Festlegen, wie fehlende Werte behandelt werden: **Kein** (keine Regel), **Nicht-Leer** (ausschließen) oder **Leer** (nur diese, oder zusätzlich zu einer Auswahl) | `n` / `Shift+N` |
| Globus | Zwischen **Global (jedes Diagramm)** und **Lokal (nur zugewiesene Diagramme)** wechseln | `Shift+G` |
| × | Filter entfernen | `Backspace` |

Die Null-Schaltfläche wird nur angezeigt, wenn die Spalte fehlende Werte enthält. `r` auf einer Zeile setzt ihre Auswahl zurück, behält den Filter aber bei.

## Globale und lokale Filter

Standardmäßig ist ein Filter oder Steuerelement **global**: Es gilt für jedes Diagramm des Modells. Ein **lokaler** Filter gilt nur für die Diagramme, denen Sie ihn zuweisen.

Um festzulegen, welche Filter für ein Diagramm gelten, wählen Sie das Diagramm im Bereich **Diagramme** aus und drücken `Enter`, um es aufzuklappen. Darunter erscheinen die Zeilen **Filter** und **Steuerelemente**. Solange nichts abweicht, zeigen beide **Standard**. Öffnen Sie eine Zeile und markieren Sie einen Filter, um einen globalen Filter für dieses Diagramm auszuschließen oder einen lokalen einzubeziehen. `r` setzt das Diagramm auf die Standardwerte zurück.

So kann ein Dashboard zum Beispiel eine Leistungskennzahl mit dem Gesamtumsatz zeigen, während die übrigen Diagramme dem Steuerelement für die Region folgen. Dazu schließen Sie die Kennzahl von diesem Steuerelement aus.

## Steuerelemente im Dashboard

Jede Änderung an einem Steuerelement aktualisiert sofort alle Diagramme, für die es gilt. Im [Präsentationsmodus](./dashboards#präsentationsmodus) erscheinen die aktivierten Steuerelemente in einem schwebenden Bereich **Filter**, sodass Betrachter sie ohne die Seitenleiste bedienen können.

## Performance

Wenn Sie ein Steuerelement öffnen, berechnet *undash* unter Umständen die Ergebnisse für alle Positionen des Steuerelements vor. Währenddessen ist das Formular ausgegraut, und ein Ladesymbol ersetzt das Häkchen. Danach reagiert das Ziehen eines Schiebereglers oder die Auswahl von Kategorien sofort, auch bei großen Datenmengen.

Die Vorberechnung setzt [statische Dimensionen](./dimensions-measures#statische-und-dynamische-attribute) voraus. Sie entfällt, wenn ein sichtbares Diagramm eine dynamische Dimension verwendet, sowie für Diagramme mit den Aggregationen Median, Modalwert, MAD, Schiefe, Wölbung, Erstes, Letztes oder mit Metriken über unterschiedliche Werte. In diesen Fällen führt jede Änderung eine normale Abfrage aus.
