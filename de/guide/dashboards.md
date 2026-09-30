# Dashboards

Ein Dashboard zeigt Diagramme eines Modells auf einer Fläche, mit einem Titel, einem Untertitel und einer Fußzeile. Ein Modell kann beliebig viele Dashboards haben, zum Beispiel eine Übersicht und eines pro Region. Jedes Diagramm liegt auf genau einem Dashboard.

Öffnen Sie die Dashboard-Ansicht mit der Dashboard-Schaltfläche in der Fußleiste oder mit `v` `d`. Sie zeigt jeweils ein Dashboard.

## Der Bereich Dashboards

Der Bereich **Dashboards** unten in der Modellansicht listet die Dashboards des Modells. Jedes Dashboard ist eine Zeile, die sich zu seinen Diagrammen aufklappen lässt, die neuesten zuerst. Beim Öffnen eines Modells sind alle Zeilen zugeklappt. Klicken Sie auf eine Zeile oder drücken Sie `Enter`, `h` oder `l`, um sie auf- oder zuzuklappen.

Fahren Sie mit der Maus über die Zeile eines Dashboards oder wählen Sie sie aus, erscheint dieses Dashboard in der Dashboard-Ansicht. Wählen Sie eine Diagrammzeile aus, erscheint sein Dashboard, und das Diagramm wird darin hervorgehoben. Das gerade angezeigte Dashboard ist fett dargestellt.

| Aktion | Schaltfläche | Taste |
|---|---|---|
| Dashboard hinzufügen | **+** im Kopf des Bereichs | `+` |
| Titel, Untertitel und Referenz bearbeiten | Stift | `e` |
| Diagramme mit KI hinzufügen | Funkeln | `Ctrl+Shift+A` |
| Aktivieren oder deaktivieren | Häkchen | `d` |
| Mit seinen Diagrammen löschen | × | `Backspace` |

Die Zahl neben einem Dashboard ist die Anzahl seiner Diagramme. Das × im Kopf des Bereichs löscht alle Dashboards mit ihren Diagrammen.

### Dashboard hinzufügen

Klicken Sie auf **+** im Kopf des Bereichs (**Dashboard hinzufügen**) oder drücken Sie `+` in der Liste. Das neue Dashboard heißt „Dashboard 01“, „Dashboard 02“ und so weiter und wird sofort angezeigt. Ist [Auto-Benennung](./ai#automatische-funktionen) aktiviert, gibt ihm die KI einen Titel und einen Untertitel.

Das erste Diagramm eines Modells legt automatisch „Dashboard 01“ an, wenn das Modell noch kein Dashboard hat.

### Dashboard bearbeiten

Drücken Sie `e` auf der Zeile eines Dashboards oder klicken Sie auf seinen Stift, um das Dashboard-Formular zu öffnen:

- **Titel** und **Untertitel**, in jeder Sprache der Anwendung. Die Sprache wechseln Sie mit der Schaltfläche neben dem Feld. Der Titel darf nicht leer sein.
- **Referenz zum Dashboard**: der interne Name des Dashboards, der in seinem [Kiosk-Link](#teilen-und-kiosk-modus) verwendet wird. Er besteht aus Kleinbuchstaben, Ziffern und einzelnen Unterstrichen, beginnt mit einem Buchstaben und muss innerhalb des Modells eindeutig sein.

Titel und Untertitel lassen sich auch direkt im Dashboard bearbeiten.

### Aktive und inaktive Dashboards

Drücken Sie `d` auf einer Zeile oder klicken Sie auf ihr Häkchen, um ein Dashboard zu deaktivieren. Ein inaktives Dashboard wird abgeblendet dargestellt. Es wird weder in der Ansicht noch im Präsentationsmodus oder in einem Kiosk-Link gezeigt, seine Diagramme bleiben aber in der Liste und lassen sich weiter bearbeiten. Das eignet sich für Entwürfe oder für Dashboards, die Sie nur ab und zu brauchen.

### Dashboard löschen

Drücken Sie `Backspace` auf einer Zeile oder klicken Sie auf ihr ×. Die Diagramme des Dashboards werden mitgelöscht. Ein leeres Dashboard wird sofort gelöscht, bei einem Dashboard mit Diagrammen fragt *undash* vorher nach („Dashboard … löschen?“). Bestätigen Sie mit `Enter` oder brechen Sie mit `Escape` ab.

## Dashboards wechseln

Die Dashboard-Ansicht zeigt jeweils ein Dashboard. Um ein anderes anzuzeigen,

- wählen Sie seine Zeile im Bereich **Dashboards** aus,
- klicken Sie auf die Wechsel-Schaltfläche oben rechts im Dashboard (**Nächstes Dashboard**, `Shift`+Klick für das vorherige) oder
- drücken Sie `Ctrl+N` / `Ctrl+P` für das nächste oder vorherige Dashboard.

Inaktive Dashboards werden dabei übersprungen.

## Diagramme hinzufügen und entfernen

Ein neues Diagramm wird im gerade angezeigten Dashboard gespeichert. Um ein Diagramm auf ein anderes Dashboard zu verschieben, drücken Sie im Bereich **Dashboards** `e` darauf und wählen im Diagrammformular ein anderes **Dashboard**. Das Diagramm wird am Ende des Layouts dieses Dashboards angefügt.

Um ein Diagramm in seinem Dashboard auszublenden, ohne es zu löschen, drücken Sie `d` darauf oder klicken Sie auf sein Häkchen. Ausgeblendete Diagramme werden in der Liste abgeblendet dargestellt.

Ein Dashboard ohne Diagramme bleibt in der Liste. Die Dashboard-Ansicht zeigt dann seinen Titel und Untertitel, bereit für neue Diagramme.

## Titel und Untertitel

Jedes Dashboard hat oben einen Titel und einen Untertitel, die Sie direkt im Dashboard oder im [Dashboard-Formular](#dashboard-bearbeiten) bearbeiten können. Die Fußzeile zeigt das Datum. Im Präsentationsmodus fasst eine Zeile unter dem Untertitel die aktiven Steuerelemente zusammen.

## Layout

### Diagramme verschieben

Ziehen Sie ein Diagramm an seinem Titel, um es an eine andere Stelle im Layout zu verschieben. Halten Sie ein Diagramm gedrückt, um es zusammen mit der Gruppe von Diagrammen zu verschieben, zu der es gehört. *undash* richtet die Diagramme in Zeilen und Spalten aus, sodass das Layout aufgeräumt bleibt.

Um das Dashboard zu verschieben, ziehen Sie an einer freien Stelle. Zoomen können Sie mit dem Mausrad oder mit zwei Fingern.

Ein Klick auf die Legende eines Diagramms verschiebt sie in eine andere Ecke des Diagramms.

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

Die Proportionen-Schaltfläche (`Ctrl+Alt+A`) legt fest, wie das Dashboard die Größe seiner Diagramme bestimmt:

- **Proportionen wie eingestellt**: folgt der Einstellung für das Seitenverhältnis der Ansicht.
- **Diagrammproportionen behalten**: Jedes Diagramm behält seine eigenen Proportionen.
- **Diagramme dehnen**: Die Diagramme werden gedehnt, um den Platz zu füllen.

Der Abstand-Schieberegler in der Ansichtssteuerung legt den Abstand zwischen den Diagrammen fest. Siehe [Ansichtssteuerung](./charts#ansichtssteuerung).

## Steuerelemente und Sperren

Alle [Steuerelemente](./filters-controls) des Modells filtern die Diagramme des Dashboards, sobald Sie sie ändern. Die Schloss-Schaltfläche oben rechts (`Ctrl+Shift+L`) macht alle Dimensionen statisch, sodass Diagramme ihre Achsen und Farben behalten, während Betrachter filtern. Für das Dashboard ist sie standardmäßig aktiviert.

## Präsentationsmodus

Der Präsentationsmodus zeigt die Dashboards des Modells allein, ohne Seitenleiste und Werkzeugleisten. Starten Sie ihn mit der Schaltfläche **Dashboard präsentieren** oben links in den Ansichten, mit `Ctrl+Shift+P` oder mit `v` `p`. Mit `Shift`+Klick auf die Schaltfläche präsentieren Sie direkt im Vollbild. Beenden Sie ihn mit `Escape` oder **Präsentation beenden**.

Beim Start bereitet *undash* zuerst alle Dashboards vor („Dashboard lädt“). Danach wechseln Sie ohne Wartezeit zwischen ihnen. Inaktive Dashboards und Dashboards ohne Diagramme werden übersprungen.

### Durch Dashboards und Diagramme blättern

- `n` / `p` wechseln zum nächsten oder vorherigen Dashboard.
- Ist ein Dashboard größer als der Bildschirm, wird es Diagramm für Diagramm präsentiert. `←` / `→` zentrieren das vorherige oder nächste Diagramm, `h` `j` `k` `l` das Diagramm links, darunter, darüber oder rechts. Ein Klick auf ein Diagramm zentriert es.
- `←` / `→` blättern über Dashboards hinweg: Nach dem letzten Diagramm geht es mit dem nächsten Dashboard weiter. Passt ein Dashboard auf den Bildschirm, wechseln sie direkt zum vorherigen oder nächsten Dashboard.

Der Bereich **Navigation** unten in der Mitte zeigt den Titel des Dashboards zwischen Pfeilen (bei zwei oder mehr Dashboards) und bei einem großen Dashboard den Namen des zentrierten Diagramms mit einem Zähler wie „(2/6)“. Die Pfeile erscheinen, wenn Sie mit der Maus über eine Zeile fahren.

### Werkzeugleiste und Bereiche

Die Werkzeugleiste oben links enthält **Präsentation beenden**, **Dashboard teilen**, **Datenübersicht** und **Vollbild** (`f`) sowie eine Schaltfläche für jeden Bereich:

- **Filter**: die aktivierten Steuerelemente des Modells. **Zurücksetzen** (oder `r`) setzt alle Steuerelemente zurück, und `1`–`9` springen zu einem Steuerelement. Ziehen Sie den Bereich dorthin, wo er passt.
- **Navigation**: der oben beschriebene Navigationsbereich.

Jede Bereichs-Schaltfläche wechselt zwischen drei Modi: **auto** (bei Mausbewegung eingeblendet, nach zwei Sekunden Ruhe ausgeblendet), **aus** (nie eingeblendet) und **an** (immer eingeblendet). `c` wechselt den Modus des Filterbereichs. Die Modi bleiben gespeichert. Beide Bereiche starten im Modus auto.

Nach zwei Sekunden ohne Eingabe werden auch die Werkzeugleiste und der Mauszeiger ausgeblendet. Bewegen Sie die Maus, um sie zurückzuholen.

### Auf dem Tablet

- Die Werkzeugleiste bleibt verborgen, bis Sie in die obere linke Ecke tippen. Erst das nächste Tippen löst eine Schaltfläche aus.
- Wischen Sie nach links oder rechts, um zum nächsten oder vorherigen Dashboard zu wechseln. Ist ein Dashboard größer als der Bildschirm, wischen Sie mit zwei Fingern.
- Im Navigationsbereich tippen Sie auf eine Zeile, um ihre Pfeile einzublenden.
- Im Filterbereich öffnet oder schließt ein Tippen auf den Namen eines Steuerelements dieses.

## Teilen und Kiosk-Modus

Die Schaltfläche **Dashboard teilen** (neben **Dashboard präsentieren** und auch im Präsentationsmodus) öffnet den **Kiosk-Link** des Dashboards in einem neuen Tab. Er sieht etwa so aus: `https://…/?model=sales&dashboard=overview`. Ein Kiosk-Link öffnet die Dashboards des Modells direkt im Präsentationsmodus, beginnend mit dem verlinkten, ohne Weg zurück zum Editor. Das eignet sich für Wandbildschirme oder wenn Sie einen Laptop für eine Präsentation aus der Hand geben. Ist das verlinkte Dashboard inaktiv oder gibt es es nicht mehr, wird das erste aktive Dashboard des Modells gezeigt.

::: warning WARNUNG
Der Kiosk-Link teilt keine Daten. Da Ihre Daten nur in Ihrem Browser liegen, funktioniert der Link nur im selben Browser auf demselben Computer. Um ein Dashboard mit anderen zu teilen, senden Sie eine [Projektsicherung](./data#projekt-sichern) oder einen Export.
:::

## Exportieren

Klicken Sie auf die Export-Schaltfläche oben rechts im Dashboard oder drücken Sie `Ctrl+Shift+D`, während das Dashboard den Tastaturfokus hat. Das angezeigte Dashboard wird einschließlich Titel und Fußzeile als eine Datei mit dem Namen `<model>_YYYYMMDD` exportiert.

Die Export-[Einstellungen](./settings) bestimmen das Ergebnis:

| Einstellung | Werte |
|---|---|
| **Export-Dateityp** | PDF und SVG (Vektorgrafiken), PNG und JPEG (Bilder) |
| **Export-Format** | *custom* (die eigene Größe des Dashboards), A4, A3, A2, Letter, Legal, Tabloid |
| **Export-Farben** | *mono* (Schwarz auf Weiß, für den Druck) oder *current* (die Farben des aktuellen Designs) |

Ein PDF sieht aus wie das Dashboard auf dem Bildschirm, einschließlich des [Glas-Stils](./settings#stil). Mit den Farben *mono* werden die Diagrammrahmen flach gedruckt.

::: tip TIPP
Wählen Sie zuerst das Papierformat und dann die Layout-Vorlage **An Seitenformat anpassen**, damit das Dashboard die Seite ausfüllt.
:::
