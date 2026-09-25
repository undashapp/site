# Die Oberfläche

```
┌──────────────┬─────────────────────────────────────────────┐
│ Einstellungen│                                             │
├──────────────┤                                             │
│              │                                             │
│  Seitenleiste│        Ansichten                            │
│              │        (Diagrammansicht und/oder Dashboard) │
│ Daten-       │                                             │
│ übersicht    │                          ┌────────────────┐ │
│ oder         │                          │ Steuerelemente │ │
│ Modellansicht│                          └────────────────┘ │
├──────────────┴─────────────────────────────────────────────┤
│  DB-Konsole (SQL-Editor + Ergebnisse, ausblendbar)         │
├────────────────────────────────────────────────────────────┤
│  Fußleiste                                                 │
└────────────────────────────────────────────────────────────┘
```

## Seitenleiste

Die Seitenleiste links hat zwei Zustände:

- Die **Datenübersicht** wird angezeigt, solange kein Modell geöffnet ist. Sie enthält den Bereich **Dateien** für Importe, das Feld **Suche** sowie die Listen **Modelle** und **Tabellen**. Siehe [Daten importieren](./data).
- Die **Modellansicht** wird angezeigt, solange ein Modell geöffnet ist. Sie enthält die Bereiche des Modells, von seiner Abfrage bis zu seinen Diagrammen. Siehe [Modelle & SQL](./models).

Oben in der Seitenleiste befinden sich der App-Titel, die [Einstellungsleiste](./settings#einstellungsleiste) und das Zahnrad-Symbol für die [App-Einstellungen](./settings#app-einstellungen).

Innerhalb einer Liste navigieren Sie in der Seitenleiste mit `j`/`k` (oder `↓`/`↑`), zwischen den Listen mit `Tab`.

## Ansichten

Der Hauptbereich zeigt bis zu zwei Ansichten:

- Die **Diagrammansicht** zeigt das Diagramm, das Sie gerade im Diagramm-Konfigurator aufbauen.
- Das **Dashboard** zeigt alle Diagramme des Modells. Siehe [Dashboards](./dashboards).

Beide können gleichzeitig angezeigt werden. Sie teilen sich den Bereich dann in einer von drei Anordnungen: geteilt oben/unten, geteilt links/rechts oder mit einer Ansicht, die über der anderen schwebt. Ziehen Sie den Trenner zwischen geteilten Ansichten, um ihre Größe zu ändern. Eine schwebende Ansicht lässt sich an ihrem Griff verschieben und an ihrer unteren rechten Ecke in der Größe ändern.

Jede Ansicht hat unten rechts ihre eigene Steuerleiste (siehe [Diagramme](./charts#ansichtssteuerung)). `Ctrl+1` und `Ctrl+2` übergeben die Tastatur an die erste bzw. zweite Ansicht.

## Fußleiste

Die Leiste am unteren Fensterrand, von links nach rechts:

| Schaltfläche | Aktion | Taste |
|---|---|---|
| Seitenleiste | Seitenleiste ein- oder ausblenden | `v` `f` |
| DB-Konsole | SQL-Konsole ein- oder ausblenden | `Ctrl+C` oder `v` `t` |
| Diagrammansicht | Diagrammansicht ein- oder ausblenden | `v` `c` |
| Dashboard | Dashboard ein- oder ausblenden | `v` `d` |
| Anordnung | Durch die Anordnungen der beiden Ansichten wechseln (`Shift`+Klick: rückwärts) | `v` `m` |
| Tauschen | Die beiden Ansichten vertauschen | `v` `s` |

Die Schaltflächen für Anordnung und Tauschen erscheinen nur, solange beide Ansichten angezeigt werden. Mindestens eine Ansicht ist immer sichtbar.

## DB-Konsole

Die DB-Konsole ist ein SQL-Editor mit Ergebnistabelle unterhalb der Ansichten. Sie führt Abfragen schon während der Eingabe aus. Siehe [Modelle & SQL](./models#die-db-konsole).

## Benachrichtigungen

Meldungen erscheinen als Benachrichtigungen (Toasts), zum Beispiel wenn eine Datei geladen, ein Modell gespeichert wurde oder etwas schiefgelaufen ist. Fehler, die eine Aktion verhindern, etwa das Löschen einer Tabelle, die noch von einem Modell verwendet wird, werden dort ebenfalls erklärt.
