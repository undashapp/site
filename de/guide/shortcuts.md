# Tastenkürzel

*undash* ist für die Bedienung mit der Tastatur gemacht. Die meisten Listen verwenden Tasten im Vim-Stil: `j`/`k` bewegen nach unten und oben, `h`/`l` ändern einen Wert.

::: info INFO
`Ctrl` steht auf allen Plattformen für die Control-Taste, auch unter macOS. Für Großbuchstaben wird `Shift+X` geschrieben: `Shift+F` ist dasselbe wie `F`.
:::

Kürzel aus einzelnen Buchstaben werden nicht ausgelöst, während Sie in ein Textfeld tippen.

## Global

| Taste | Aktion |
|---|---|
| `Ctrl+T` | Tastatur zwischen Seitenleiste und DB-Konsole wechseln |
| `Ctrl+,` | Einstellungsleiste öffnen oder schließen |
| `Ctrl+Shift+,` | App-Einstellungen öffnen |
| `Ctrl+C` | DB-Konsole ein- oder ausblenden |
| `Ctrl+Shift+P` | Präsentationsmodus starten oder beenden |

### Ansichtsbefehle

Drücken Sie `v`, dann einen Buchstaben:

| Tasten | Aktion |
|---|---|
| `v` `f` | Vollbild: Seitenleiste ausblenden und zurück |
| `v` `t` | DB-Konsole ein- oder ausblenden |
| `v` `c` | Diagrammansicht ein- oder ausblenden |
| `v` `d` | Dashboard ein- oder ausblenden |
| `v` `b` | Tastatur an die andere Ansicht übergeben |
| `v` `s` | Die beiden Ansichten tauschen |
| `v` `m` | Anordnung wechseln: oben/unten, links/rechts, schwebend |
| `v` `p` | Präsentationsmodus starten oder beenden |

## Datenübersicht

| Taste | Aktion |
|---|---|
| `/` | Suchfeld fokussieren und leeren |
| `Ctrl+K` | Suchfeld fokussieren |
| `Enter` (in der Suche) | Ersten Treffer öffnen |
| `Escape` (in der Suche) | Suche leeren |
| `Ctrl+N` | Neues Modell |
| `Ctrl+Shift+N` | Neue Remote-Tabelle |
| `j` / `k`, `↓` / `↑` | Nächster / vorheriger Eintrag |
| `Tab` / `Shift+Tab` | Nächste / vorherige Liste |
| `Enter` | Modell oder Tabelle öffnen |
| `e` | Bearbeiten |
| `d` | Exportieren |
| `Ctrl+Shift+D` | Löschen |
| `Ctrl+R` | Statistiken aktualisieren (Remote-Tabellen) |

## Modellansicht

| Taste | Aktion |
|---|---|
| `s` | Modell speichern |
| `q` | Modell schließen |
| `p` | Spaltenstatistik wechseln |
| `x` | Stichproben ein- oder ausschalten |
| `Ctrl+Shift+M` | Modell materialisieren |
| `Ctrl+Shift+C` | DB-Konsole mit dem Modell verknüpfen |
| `Ctrl+Shift+A` | Dashboard oder Diagramme mit KI vorschlagen |
| `Ctrl+S` | Aktuelles Diagramm speichern |
| `Ctrl+Shift+S` | Aktuelles Diagramm mit Namen speichern |
| `g` + Buchstabe | Zu einem Bereich springen: `f` Spalten, `t` Transformationen, `w` Filter, `o` Steuerelemente, `d` Dimensionen, `m` Metriken, `s` Diagrammauswahl, `c` Diagramm-Konfigurator, `l` Diagramme |

### Spalten

| Taste | Aktion |
|---|---|
| `Enter` | Standardaktion |
| `e` | Alias bearbeiten |
| `t` / `Shift+T` | Transformation hinzufügen / alle Transformationen entfernen |
| `f` / `Shift+F` | Filter hinzufügen / entfernen |
| `Ctrl+F` / `Ctrl+Shift+F` | Steuerelement hinzufügen / entfernen |
| `d` / `Shift+D` | Dimension hinzufügen / entfernen |
| `Ctrl+D` | Transformation als Dimension hinzufügen |
| `m` / `Shift+M` | Metrik hinzufügen / alle Metriken entfernen |
| `Space` | Für eine bivariate Metrik vormerken |

### Transformationen

| Taste | Aktion |
|---|---|
| `l` / `h` | Nächste / vorherige Option |
| `Shift+L` / `Shift+H` | Nächster / vorheriger Transformationstyp |
| `e` | Kategorien bearbeiten (Gruppierung) |
| `d` / `Shift+D` | Dimension hinzufügen / entfernen |
| `Backspace` | Entfernen |

### Dimensionen und Metriken

| Taste | Aktion |
|---|---|
| `l` / `h` | Nächste / vorherige Aggregation (Metriken) |
| `d` | Distinct ein oder aus (Metriken) |
| `c` | Mit der nächsten Aggregation duplizieren (Metriken) |
| `<` `[` / `>` `]` | Aufsteigend / absteigend sortieren |
| `o` / `Shift+O` | Sortierpriorität ändern |
| `u` | Sortierung entfernen |
| `Ctrl+L` | Statisch oder dynamisch |
| `Backspace` | Entfernen |

### Filter und Steuerelemente

| Taste | Aktion |
|---|---|
| `Enter` / `e` | Formular öffnen |
| `d` / `Shift+Enter` | Ein- oder ausschalten |
| `n` / `Shift+N` | Behandlung leerer Werte wechseln |
| `Shift+G` | Global oder lokal |
| `r` | Zurücksetzen |
| `Backspace` | Entfernen |
| `Escape` (im Formular) | Formular schließen |
| `Ctrl+J` / `Ctrl+K` (im Formular) | Nächster / vorheriger Filter |

### Diagramm-Konfigurator

| Taste | Aktion |
|---|---|
| `h` / `l` (Diagrammleiste) | Vorheriger / nächster Diagrammtyp |
| `Shift+H` / `Shift+L` (Diagrammleiste) | Vorheriger / nächster kompatibler Diagrammtyp |
| `c` + Buchstaben (Diagrammleiste) | Per Name zu einem Diagrammtyp springen, z. B. `c` `bal` für Ballondiagramm |
| `h` / `l` (Konfiguratorzeile) | Vorheriger / nächster Diagrammtyp |
| `Shift+H` / `Shift+L` (Konfiguratorzeile) | Vorherige / nächste Kanalbelegung |
| `h` / `l` (Kanal) | Vorheriges / nächstes Attribut |
| `t` (Kanal) | x und y bzw. Zeile und Spalte tauschen |
| `Backspace` (Kanal) | Optionalen Kanal leeren |
| `Escape` | Bearbeitung beenden |

### Diagramme

| Taste | Aktion |
|---|---|
| `e` | Umbenennen |
| `u` | In den Konfigurator laden |
| `d` | Auf dem Dashboard ein- oder ausblenden |
| `Enter` | Zuordnungen von Filtern und Steuerelementen des Diagramms anzeigen |
| `Backspace` | Löschen |

## Ansichten

| Taste | Aktion |
|---|---|
| `Ctrl+1` / `Ctrl+2` | Erste / zweite Ansicht fokussieren |
| `Ctrl+=` / `Ctrl+-` / `Ctrl+0` | Diagrammskalierung vergrößern / verkleinern / zurücksetzen |
| `Ctrl+Shift+=` / `Ctrl+Shift+-` / `Ctrl+Shift+0` | Schriftskalierung vergrößern / verkleinern / zurücksetzen |
| `Ctrl+Alt+Shift+=` / `-` / `0` | Weißraum vergrößern / verkleinern / zurücksetzen |
| `Ctrl+Z` / `Ctrl+Shift+Z` | Nächster / vorheriger Größenmodus |
| `Ctrl+A` | Seitenverhältnis beibehalten ein oder aus |
| `Ctrl+R` | Bezug der Ansicht wechseln: Quadrat oder Rechteck |
| `Ctrl+G` | Einpassung der Ansicht wechseln: Layout oder Zeichnung |
| `Ctrl+Shift+L` | Alle Dimensionen der Ansicht sperren oder entsperren |
| `Ctrl+Shift+D` | Fokussierte Ansicht exportieren |

### Dashboard

| Taste | Aktion |
|---|---|
| `Ctrl+Y` / `Ctrl+Shift+Y` | Nächste / vorherige Layout-Vorlage |
| `Ctrl+O` | Reihenfolge der Vorlage wechseln: größte oder kleinste zuerst |
| `Ctrl+Shift+O` | Vorlage drehen |
| `Ctrl+Alt+A` | Proportionen des Dashboards wechseln |

## DB-Konsole

| Taste | Aktion |
|---|---|
| `Ctrl+N` | Modell aus der Abfrage erstellen |
| `Ctrl+I` | Letzten Fehler anzeigen |
| `Tab` | Zwischen Editor und Ergebnissen wechseln |
| `h` / `l`, `←` / `→` | Spaltenweise scrollen |
| `↑` / `↓` | Zeilenweise scrollen |
| `j` / `k` | Eine halbe Seite scrollen |

## Präsentationsmodus

| Taste | Aktion |
|---|---|
| `c` | Bereich **Filter** öffnen oder schließen |
| `1`–`9` | Ein Steuerelement fokussieren |
| `j` / `k` | Nächstes / vorheriges Steuerelement |
| `Enter` / `Escape` | Steuerelement öffnen / einklappen |
| `r` | Alle Steuerelemente zurücksetzen |
| `f` | Vollbild |
| `←` / `→` | Vorheriges / nächstes Diagramm (große Dashboards) |
| `Escape` | Präsentationsmodus beenden |
| `q` | Modell schließen |

## Formulare

| Taste | Aktion |
|---|---|
| `Escape` | Formular schließen |
| `Tab` | Nächstes Feld |
