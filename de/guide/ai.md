# KI-Assistent

Der KI-Assistent schlägt Modelle, Diagramme und Dashboards für Ihre Daten vor. Er arbeitet mit Ihrem eigenen API-Schlüssel von **OpenAI** oder **Anthropic**.

## Einrichtung

1. Öffnen Sie die App-Einstellungen mit dem Zahnrad-Symbol oben in der Seitenleiste oder drücken Sie `Ctrl+Shift+,`.
2. Wählen Sie unter **KI-Assistent** den **KI-Anbieter**: OpenAI oder Anthropic.
3. Geben Sie den **OpenAI API-Schlüssel** oder **Anthropic API-Schlüssel** ein.
4. Klicken Sie auf **Aktualisieren**.

Ihr Schlüssel wird nur im lokalen Speicher dieses Browsers abgelegt. Anfragen gehen direkt von Ihrem Browser an den Anbieter; es gibt keinen *undash*-Server dazwischen. Die Nutzung wird über Ihr Konto beim Anbieter abgerechnet.

## Was mit der KI geteilt wird

*undash* sendet nie die Datensätze Ihrer Daten. Für jede Spalte erhält die KI:

- den Namen der Spalte (oder ihren Alias, siehe [Spalten & Transformationen](./fields-transforms#aliase)) und ihren Typ,
- Statistiken wie die Anzahl unterschiedlicher Werte, fehlende Werte und den Wertebereich, und
- bei aktiviertem **Kategoriewerte teilen** (Standard) bis zu zwölf Beispielwerte kategorialer Spalten.

::: warning WARNUNG
Kategoriewerte können Namen oder andere personenbezogene Daten enthalten. Deaktivieren Sie **Kategoriewerte teilen**, wenn diese Ihren Rechner nicht verlassen dürfen. Die KI sieht dann nur die Statistiken.
:::

## Ein Dashboard vorschlagen lassen

Öffnen Sie eine Tabelle, sodass ein neues Modell ohne Dimensionen oder Metriken angezeigt wird. Klicken Sie dann auf die Funkeln-Schaltfläche in der Kopfzeile des Bereichs **Diagramme** (**Modell und Dashboard mit KI vorschlagen**) oder drücken Sie `Ctrl+Shift+A`. Die Schaltfläche erscheint, sobald ein API-Schlüssel hinterlegt ist.

Während die KI arbeitet, zeigt *undash* „Analysiere Schema, Bereite Diagramme vor“. Anschließend öffnet sich der **Dashboard-Vorschlag**:

- **Name des Modells**: der Name des zu erstellenden Modells.
- Eine Zusammenfassung der vorgeschlagenen Dimensionen, Metriken und Transformationen.
- **Diagramme**: die vorgeschlagenen Diagramme, jeweils mit Typ und Kanälen. Entfernen Sie das Häkchen bei den Diagrammen, die Sie nicht möchten.

Klicken Sie auf **Speichern**, um das Modell mit seinen Diagrammen und seinem Dashboard zu erstellen, oder auf **Abbrechen**, um den Vorschlag zu verwerfen. Vor Ihrer Bestätigung wird nichts gespeichert.

## Diagramme vorschlagen lassen

Hat das Modell bereits Dimensionen oder Metriken, fordert dieselbe Schaltfläche (**Diagramme mit KI vorschlagen**, `Ctrl+Shift+A`) stattdessen zusätzliche Diagramme an. Der **Diagramm-Vorschlag** funktioniert wie der Dashboard-Vorschlag. Die neuen Diagramme werden zu den vorhandenen hinzugefügt.

## Automatische Funktionen

Zwei Optionen in den Einstellungen lassen die KI ohne Nachfrage arbeiten:

| Option | Was sie bewirkt |
|---|---|
| **Auto-Modellierung** | Nach dem Import einer Tabelle schlägt die KI ein Modell und ein Dashboard dafür vor. Sie prüfen den Vorschlag wie oben beschrieben. |
| **Auto-Benennung** | Nach dem Speichern eines Diagramms gibt die KI ihm einen Titel. |

Beide sind standardmäßig deaktiviert.

## Fehler

| Meldung | Was zu tun ist |
|---|---|
| „Bitte zuerst den API-Schlüssel des gewählten KI-Anbieters in den Einstellungen hinterlegen!“ | Geben Sie einen Schlüssel für den gewählten Anbieter ein. |
| „Der KI-Anbieter hat den API-Schlüssel abgelehnt.“ | Prüfen Sie den Schlüssel in den Einstellungen. |
| „Keine Antwort des KI-Anbieters hat den Browser erreicht.“ | Prüfen Sie Ihre Netzwerkverbindung. |
| „Die Antwort der KI wurde abgeschnitten.“ / „Die Antwort der KI konnte nicht gelesen werden.“ | Versuchen Sie es erneut. |
| „Keines der vorgeschlagenen Diagramme konnte erstellt werden.“ | Versuchen Sie es erneut, oder fügen Sie Dimensionen und Metriken von Hand hinzu. |
