# Modelle & SQL

Ein **Modell** ist eine benannte SQL-Abfrage. Es steht im Mittelpunkt von *undash*: Spalten, Transformationen, Filter, Steuerelemente, Dimensionen, Metriken, Diagramme und das Dashboard gehören jeweils zu einem Modell.

## Ein Modell anlegen

Es gibt vier Wege, ein Modell anzulegen:

- **Eine Tabelle öffnen.** Ein Klick auf eine Tabelle öffnet ein neues Modell mit `SELECT * FROM <table>`. Gespeichert wird es, sobald Sie es selbst oder sein erstes Diagramm speichern.
- **Eine Abfrage schreiben.** Klicken Sie in der Kopfzeile von **Modelle** auf **+** (**Neues Modell**), oder drücken Sie `Ctrl+N`. Geben Sie einen Titel, einen Namen (den „Name der Datenbank-Ansicht“) und eine SQL-Abfrage ein, und klicken Sie dann auf **Speichern**. Dafür ist mindestens eine Tabelle nötig.
- **Aus der SQL-Konsole.** Schreiben Sie eine Abfrage in der [DB-Konsole](#die-db-konsole), und klicken Sie auf **+**, oder drücken Sie im Editor `Ctrl+N`.
- **Mit KI.** Siehe [KI-Assistent](./ai).

### Die Abfrage schreiben

Die Abfrage eines Modells ist eine DuckDB-`SELECT`-Abfrage. Sie kann Tabellen und andere Modelle über ihren Namen ansprechen und CTEs (`WITH ...`) verwenden. *undash* führt die Abfrage beim Speichern aus und lehnt sie ab, wenn

- sie weder eine Tabelle noch ein Modell verwendet,
- sie eine nicht vorhandene Tabelle, ein nicht vorhandenes Modell oder sich selbst verwendet,
- sie sich nicht ausführen lässt oder
- ihr Ergebnis leer ist.

```sql
SELECT
  region,
  CAST(order_date AS DATE) AS order_date,
  quantity * unit_price AS revenue
FROM sales_2024
WHERE status <> 'cancelled'
```

Das SQL eines gespeicherten Modells lässt sich nachträglich nicht mehr ändern. Für eine andere Abfrage legen Sie ein neues Modell an.

::: tip TIPP
Modelle sind der richtige Ort, um Daten zu bereinigen: Spalten umbenennen, Typen korrigieren, neue Spalten berechnen oder Tabellen verknüpfen. Alles, was sich in DuckDB-SQL ausdrücken lässt, funktioniert.
:::

## Ein Modell speichern

Neben der Überschrift **Modell** zeigt ein farbiger Punkt den Zustand des Modells an:

| Punkt | Bedeutung |
|---|---|
| Grün | Gespeichert. |
| Gelb | Ungespeicherte Änderungen oder ein neues Modell, das noch nicht gespeichert wurde. Neben dem Punkt erscheint eine Schaltfläche zum Speichern. |
| Grau | Kann nicht gespeichert werden, weil andere Modelle von diesem abhängen. |

Speichern Sie über die Schaltfläche oder mit `s`. Beim Speichern eines Diagramms wird auch das Modell gespeichert.

::: warning WARNUNG
Beim Schließen eines Modells (Schaltfläche × oder `q`) werden ungespeicherte Änderungen ohne Rückfrage verworfen.
:::

## Modelle verwalten

Modelle erscheinen in der Liste **Modelle** der Datenübersicht. Ist ein Modell ausgewählt, zeigt seine Karte außerdem, wie viele Transformationen, Filter, Steuerelemente, Dimensionen, Metriken und Diagramme es enthält.

| Aktion | So geht's |
|---|---|
| **Öffnen** | Klicken Sie auf das Modell, oder drücken Sie `Enter`. |
| **Bearbeiten** | ⋮-Menü → **Bearbeiten**, oder `e`. Ändert Titel und Namen. Diagramme und Dashboard bleiben beim Umbenennen erhalten. Der Name ist gesperrt, solange ein anderes Modell von diesem abhängt. |
| **Exportieren** | ⋮-Menü → **Exportieren**, oder `d`. Lädt das Abfrageergebnis des Modells herunter. |
| **Löschen** | ⋮-Menü → **Löschen**, oder `Ctrl+Shift+D`. Löscht das Modell mit all seinen Diagrammen und seinem Dashboard. Nicht möglich, solange ein anderes Modell davon abhängt. |

::: warning WARNUNG
Ein Modell wird sofort gelöscht. Es gibt keine Rückfrage und kein Rückgängigmachen.
:::

## Die Modellansicht

Ist ein Modell geöffnet, zeigt die Seitenleiste von oben nach unten seine Bereiche:

| Bereich | Inhalt |
|---|---|
| **Modell** | Titel und Speicherzustand. |
| **Abfrage** | Das SQL des Modells, Stichproben, Materialisierung und Konsolen-Verknüpfung. |
| **Spalten** | Die Spalten der Abfrage. Siehe [Spalten & Transformationen](./fields-transforms). |
| **Transformationen** | Abgeleitete Spalten. Siehe [Spalten & Transformationen](./fields-transforms). |
| **Filter** | Feste Filter. Siehe [Filter & Steuerelemente](./filters-controls). |
| **Steuerelemente** | Interaktive Filter. Siehe [Filter & Steuerelemente](./filters-controls). |
| **Dimensionen** | Spalten, nach denen gruppiert wird. Siehe [Dimensionen & Metriken](./dimensions-measures). |
| **Metriken** | Aggregationen. Siehe [Dimensionen & Metriken](./dimensions-measures). |
| **Diagramm-Konfigurator** | Erstellt Diagramme. Siehe [Diagramme](./charts). |
| **Diagramme** | Die gespeicherten Diagramme des Modells. Siehe [Diagramme](./charts). |

Drücken Sie `g` gefolgt von einem Buchstaben, um zu einem Bereich zu springen: `f` Spalten, `t` Transformationen, `w` Filter, `o` Steuerelemente, `d` Dimensionen, `m` Metriken, `s` Diagrammauswahl, `c` Diagramm-Konfigurator, `l` Diagramme.

## Der Bereich Abfrage

Der Bereich **Abfrage** ist standardmäßig eingeklappt. Er zeigt das SQL des Modells. Klicken Sie darauf, um die Abfrage zu kopieren. Über die Symbole in der Kopfzeile erreichen Sie drei Werkzeuge.

### Stichproben

Bei Modellen mit 200.000 oder mehr Zeilen erscheint ein Reagenzglas-Symbol. Aktivieren Sie Stichproben (das Symbol wird rot, alternativ `x`), werden alle Diagramme aus den ersten 100.000 Zeilen des Modells statt aus allen Zeilen berechnet, und das Symbol zeigt, welchem Anteil der Daten das entspricht. Stichproben sind nützlich, um große Datenmengen schnell zu erkunden.

Wenn Sie eine Tabelle mit 1.000.000 oder mehr Zeilen öffnen, werden Stichproben automatisch aktiviert.

### Materialisierung

Das Download-Symbol (`Ctrl+Shift+M`) materialisiert das Modell: *undash* berechnet die Abfrage einmal und hält das Ergebnis als Tabelle im Arbeitsspeicher. Das beschleunigt Modelle mit aufwendigen Abfragen, etwa Joins. Das materialisierte Ergebnis wird verworfen, wenn Sie das Modell schließen.

### Konsolen-Verknüpfung

Das Link-Symbol (`Ctrl+Shift+C`) verknüpft die DB-Konsole mit dem Modell. Die Verknüpfung ist standardmäßig aktiv. Siehe unten.

## Die DB-Konsole

Die DB-Konsole ist ein SQL-Editor mit Ergebnistabelle. Öffnen Sie sie mit der Konsolen-Schaltfläche in der Fußleiste, mit `Ctrl+C` oder mit `v` `t`. Drücken Sie `Ctrl+T`, um den Tastaturfokus zwischen Seitenleiste und Konsole zu wechseln.

Die Konsole führt Ihre Abfrage **schon beim Tippen** aus. Sie zeigt die Laufzeit der Abfrage und eine Ergebnistabelle mit bis zu 1.000 Zeilen (bei breiten Ergebnissen weniger). Schlägt die Abfrage fehl, erscheint ein rotes Symbol. Klicken Sie darauf, oder drücken Sie `Ctrl+I`, um den Fehler zu sehen.

- Klicken Sie auf **+**, oder drücken Sie `Ctrl+N`, um aus der Abfrage ein Modell anzulegen.
- Klicken Sie auf die Kopfzelle **#** der Ergebnistabelle, um die sichtbaren Zeilen zu kopieren. Sie lassen sich in eine Tabellenkalkulation einfügen.
- Die Konsole kann auch andere Anweisungen als `SELECT` ausführen.

Im Editor wechselt `Tab` zur Ergebnistabelle und zurück. In der Ergebnistabelle scrollen `h`/`l` oder die Pfeiltasten spaltenweise, `↑`/`↓` zeilenweise und `j`/`k` um eine halbe Seite.

### Verknüpfter Modus

Ist die Konsole verknüpft (siehe [Konsolen-Verknüpfung](#konsolen-verknüpfung)), folgt sie Ihren Aktionen in der Seitenleiste:

- Bei geöffnetem Modell zeigt die Konsole die Abfrage des Modells.
- In den Diagrammbereichen zeigt sie die Abfrage hinter dem aktuellen Diagramm und deren Ergebnis. So sehen Sie, welches SQL hinter einem Diagramm steckt.

Sobald Sie die Abfrage bearbeiten, löst sie sich von der Verknüpfung und wird zu einer eigenständigen Abfrage.
