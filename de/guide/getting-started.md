# Erste Schritte

Diese Anleitung führt Sie von einer Datendatei zu einem Dashboard. Jede CSV-, TSV-, JSON- oder Parquet-Datei eignet sich. Ideal ist eine Tabelle mit einigen Kategorien, einem Datum und ein paar Zahlen, etwa Umsätze pro Region und Monat.

## 1. Eine Datei importieren

Wenn Sie *undash* zum ersten Mal öffnen, zeigt die Seitenleiste links den Bereich **Dateien**.

- Ziehen Sie Ihre Datei auf den Bereich, oder
- klicken Sie auf den Bereich (oder drücken Sie `Enter`, während er den Fokus hat), um eine Datei auszuwählen.

*undash* liest die Datei ein, erkennt die Spaltentypen und berechnet Statistiken für jede Spalte. Danach erscheint die Datei in der Liste **Tabellen**, und eine Benachrichtigung bestätigt, dass sie geladen wurde.

::: tip TIPP
Ihre Daten werden nur lokal in Ihrem Browser gespeichert. Nichts wird irgendwohin hochgeladen.
:::

## 2. Die Tabelle öffnen

Klicken Sie auf die Tabelle in der Liste **Tabellen**. *undash* öffnet sie als neues **Modell** mit der Abfrage `SELECT * FROM <table>`, und die Seitenleiste wechselt in die Modellansicht.

Das Modell ist noch nicht gespeichert: Der Punkt neben der Überschrift **Modell** ist gelb. Es wird gespeichert, sobald Sie ein Diagramm speichern oder `s` drücken.

Der Bereich **Spalten** listet alle Spalten der Tabelle mit ihren Typen auf. Neben jeder Spalte steht eine kleine Statistik, etwa die Anzahl unterschiedlicher Werte oder ein Boxplot für Dezimalzahlen.

## 3. Dimensionen und Metriken hinzufügen

Diagramme werden aus **Dimensionen** (wonach Sie gruppieren) und **Metriken** (was Sie aggregieren) aufgebaut. Fahren Sie mit der Maus über eine Spalte, um ihre Schaltflächen einzublenden:

- Die **Kategorie**-Schaltfläche (oder `d`) fügt die Spalte als Dimension hinzu, zum Beispiel `region`.
- Die **Summen**-Schaltfläche (oder `m`) fügt eine Metrik auf der Spalte hinzu, zum Beispiel den Mittelwert von `revenue`.

Sie können auch einfach auf eine Spalte klicken. *undash* wählt dann eine sinnvolle Rolle: Dezimalzahlen werden zu Metriken, Kategorien zu Dimensionen.

Klicken Sie im Bereich **Metriken** auf das Badge einer Metrik (zum Beispiel „Mittelwert“), um durch die anderen Aggregationen zu wechseln, etwa „Summe“ oder „Median“.

## 4. Ein Diagramm erstellen

Sobald das Modell Dimensionen und Metriken hat, bietet der **Diagramm-Konfigurator** die dazu passenden Diagrammtypen an.

1. Wählen Sie einen Diagrammtyp aus der Leiste der Diagrammsymbole, zum Beispiel das **Säulendiagramm**.
2. Prüfen Sie die Kanäle darunter. Jeder Kanal, etwa `x` oder `y_max`, zeigt die ihm zugewiesene Dimension oder Metrik. Klicken Sie auf ein Badge, um zu einer anderen zu wechseln.
3. Klicken Sie auf die Speichern-Schaltfläche in der Zeile des Konfigurators, oder drücken Sie `Ctrl+S`.

Das Diagramm erscheint im Bereich **Diagramme** und auf dem Dashboard des Modells. Beim Speichern des Diagramms wird auch das Modell gespeichert, der Punkt wird also grün.

Wiederholen Sie diesen Schritt für ein paar weitere Diagramme: Fügen Sie für eine Datumsspalte eine Transformation **Partition Datum** hinzu (siehe [Spalten & Transformationen](./fields-transforms)) und probieren Sie ein **Liniendiagramm** aus.

## 5. Das Dashboard ansehen

Der Hauptbereich zeigt das Dashboard mit allen gespeicherten Diagrammen. Mit den Schaltflächen in der Fußleiste blenden Sie die Diagrammansicht (das Diagramm, das Sie gerade bearbeiten), das Dashboard oder beide nebeneinander ein.

Ziehen Sie auf dem Dashboard ein Diagramm an seinem Titel, um es zu verschieben, oder wählen Sie eine der Layout-Vorlagen in der Steuerleiste des Dashboards. Siehe [Dashboards](./dashboards).

## 6. Ein Steuerelement hinzufügen

Steuerelemente sind Filter, die Betrachter auf dem Dashboard ändern können. Fahren Sie mit der Maus über eine Spalte im Bereich **Spalten** und klicken Sie auf die **Regler**-Schaltfläche (oder drücken Sie `Ctrl+F`). Die Spalte erscheint im Bereich **Steuerelemente**. Öffnen Sie das Steuerelement, um Kategorien auszuwählen oder einen Bereichsregler zu verschieben, und beobachten Sie, wie sich alle Diagramme aktualisieren.

## 7. Präsentieren und exportieren

- Drücken Sie `Ctrl+Shift+P`, um das Dashboard in der Vollansicht zu präsentieren. Drücken Sie `c`, um den Bereich **Filter** mit Ihren Steuerelementen zu öffnen, und `Escape`, um die Präsentation zu beenden.
- Drücken Sie `Ctrl+Shift+D`, um die fokussierte Ansicht als PDF zu exportieren. Dateityp und Papierformat legen Sie in den [Einstellungen](./settings) fest.

## Abkürzung: Lassen Sie die KI das Dashboard bauen

Wenn Sie einen API-Schlüssel von OpenAI oder Anthropic haben, kann *undash* mit einem Klick ein vollständiges Modell samt Dashboard für eine Tabelle vorschlagen. Mit dem KI-Anbieter werden nur Spaltenstatistiken geteilt, nie Ihre Datensätze. Siehe [KI-Assistent](./ai).

## Nächste Schritte

- [Die Oberfläche](./interface) erklärt die Bereiche des Bildschirms.
- [Tastenkürzel](./shortcuts) listet jede Taste auf. Fast alles in *undash* lässt sich ohne Maus erledigen.
