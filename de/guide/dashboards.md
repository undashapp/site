# Dashboards

Jedes Modell hat genau ein Dashboard. Es zeigt alle gespeicherten Diagramme des Modells auf einer Fläche, mit einem Titel und einer Fußzeile. Öffnen Sie es mit der Dashboard-Schaltfläche in der unteren Leiste oder mit `v` `d`.

## Diagramme hinzufügen und entfernen

Jedes Diagramm, das Sie speichern, erscheint im Dashboard. Um ein Diagramm im Dashboard auszublenden, ohne es zu löschen, drücken Sie im Bereich **Diagramme** `d` darauf oder klicken Sie auf sein Häkchen. Ausgeblendete Diagramme werden in der Liste abgeblendet dargestellt.

## Titel und Untertitel

Das Dashboard hat oben einen Titel und einen Untertitel, die Sie direkt im Dashboard bearbeiten können. Die Fußzeile zeigt das Datum. Im Präsentationsmodus fasst eine Zeile unter dem Untertitel die aktiven Steuerelemente zusammen.

## Layout

### Diagramme verschieben

Ziehen Sie ein Diagramm an seinem Titel, um es an eine andere Stelle im Layout zu verschieben. Halten Sie ein Diagramm gedrückt, um es zusammen mit der Gruppe von Diagrammen zu verschieben, zu der es gehört. *undash* richtet die Diagramme in Zeilen und Spalten aus, sodass das Layout aufgeräumt bleibt.

Verschieben Sie das Dashboard, indem Sie die leere Fläche ziehen, und zoomen Sie mit dem Mausrad oder mit zwei Fingern.

### Layout-Vorlagen

Statt Diagramme von Hand anzuordnen, können Sie in der Steuerung des Dashboards oben rechts eine Layout-Vorlage wählen:

| Vorlage | Anordnung |
|---|---|
| **Eine Achse, einseitig** | Die Diagramme reihen sich entlang einer Achse auf, alle auf derselben Seite. |
| **Eine Achse, beidseitig** | Die Diagramme reihen sich entlang einer Achse auf, abwechselnd auf beiden Seiten. |
| **Zickzack** | Eine Treppe mit einer Stufe pro Diagramm, beginnend mit dem größten Diagramm oben links. |
| **Zwei Achsen** | Zwei parallele Achsen, wobei die Diagramme gleichmäßig auf die drei entstehenden Streifen verteilt werden. |
| **An Seitenformat anpassen** | Die kompakteste Anordnung mit den Proportionen des Export-Papierformats (4:3, falls keines festgelegt ist). |
| **Eigene Anordnung** | Ihre eigene Anordnung per Drag & Drop. |

Die meisten Vorlagen ordnen die Diagramme nach Größe. Wechseln Sie zwischen **Größte zuerst** und **Kleinste zuerst**, und drehen Sie die Vorlage mit **Layout drehen** um 90 Grad.

| Taste | Aktion |
|---|---|
| `Ctrl+Y` / `Ctrl+Shift+Y` | Nächste / vorherige Vorlage |
| `Ctrl+O` | Größte oder kleinste zuerst |
| `Ctrl+Shift+O` | Layout drehen |

### Proportionen

Die Proportionen-Schaltfläche (`Ctrl+Alt+A`) legt fest, wie das Dashboard seine Diagramme bemisst:

- **Proportionen wie eingestellt**: folgt der Einstellung für das Seitenverhältnis der Ansicht.
- **Diagrammproportionen behalten**: Jedes Diagramm behält seine eigenen Proportionen.
- **Diagramme dehnen**: Die Diagramme werden gedehnt, um den Platz zu füllen.

Der Abstand-Schieberegler in der Ansichtssteuerung legt den Abstand zwischen den Diagrammen fest. Siehe [Ansichtssteuerung](./charts#ansichtssteuerung).

## Steuerelemente und Sperren

Alle [Steuerelemente](./filters-controls) des Modells filtern die Diagramme des Dashboards, sobald Sie sie ändern. Die Schloss-Schaltfläche oben rechts (`Ctrl+Shift+L`) macht alle Dimensionen statisch, sodass Diagramme ihre Achsen und Farben behalten, während Betrachter filtern. Für das Dashboard ist sie standardmäßig aktiviert.

## Präsentationsmodus

Der Präsentationsmodus zeigt das Dashboard allein, ohne Seitenleiste und Werkzeugleisten. Starten Sie ihn mit der Schaltfläche **Dashboard präsentieren** oben links in den Ansichten, mit `Ctrl+Shift+P` oder mit `v` `p`. Mit `Shift`+Klick auf die Schaltfläche präsentieren Sie direkt im Vollbild. Beenden Sie ihn mit `Escape` oder **Präsentation beenden**.

Im Präsentationsmodus gilt:

- Der Bereich **Filter** zeigt die aktivierten Steuerelemente des Modells. Öffnen oder schließen Sie ihn mit `c`, und ziehen Sie ihn dorthin, wo er passt. **Zurücksetzen** (oder `r`) setzt alle Steuerelemente zurück. `1`–`9` springen zu einem Steuerelement.
- `f` wechselt in den Vollbildmodus (**Vollbild** / **Vollbild beenden**).
- Ist das Dashboard größer als der Bildschirm, wird es Diagramm für Diagramm präsentiert: `←`/`→` oder **Vorheriges Diagramm** / **Nächstes Diagramm** blättern durch die Diagramme, und ein Klick auf ein Diagramm zentriert es.
- Nach zwei Sekunden ohne Eingabe werden die Werkzeugleisten und der Mauszeiger ausgeblendet. Bewegen Sie die Maus oder drücken Sie eine Taste, um sie zurückzuholen.

## Teilen und Kiosk-Modus

**Dashboard teilen**, neben der Schaltfläche **Dashboard präsentieren** und auch im Präsentationsmodus, öffnet den **Kiosk-Link** des Dashboards in einem neuen Tab. Er sieht etwa so aus: `https://…/?model=sales`. Ein Kiosk-Link öffnet das Dashboard direkt im Präsentationsmodus, ohne Weg zurück zum Editor. Verwenden Sie ihn für Wandbildschirme oder um einen Laptop für eine Präsentation zu übergeben.

::: warning WARNUNG
Der Kiosk-Link teilt keine Daten. Da Ihre Daten nur in Ihrem Browser liegen, funktioniert der Link nur im selben Browser auf demselben Computer. Um ein Dashboard an jemand anderen weiterzugeben, senden Sie eine [Projektsicherung](./data#projekt-sichern) oder einen Export.
:::

## Exportieren

Klicken Sie auf die Export-Schaltfläche oben rechts im Dashboard oder drücken Sie `Ctrl+Shift+D`, während das Dashboard den Tastaturfokus hat. Das gesamte Dashboard wird einschließlich Titel und Fußzeile als eine Datei mit dem Namen `<model>_YYYYMMDD` exportiert.

Die Export-[Einstellungen](./settings) bestimmen das Ergebnis:

| Einstellung | Werte |
|---|---|
| **Export-Dateityp** | PDF und SVG (Vektorgrafiken), PNG und JPEG (Bilder) |
| **Export-Format** | *custom* (die eigene Größe des Dashboards), A4, A3, A2, Letter, Legal, Tabloid |
| **Export-Farben** | *mono* (Schwarz auf Weiß, für den Druck) oder *current* (die Farben des aktuellen Designs) |

::: tip TIPP
Wählen Sie zuerst das Papierformat und dann die Layout-Vorlage **An Seitenformat anpassen**, damit das Dashboard die Seite ausfüllt.
:::
