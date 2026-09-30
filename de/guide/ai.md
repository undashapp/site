# KI-Assistent

Der KI-Assistent schlägt Modelle, Diagramme und Dashboards für Ihre Daten vor. Dafür nutzt er Ihren eigenen API-Schlüssel von **OpenAI** oder **Anthropic**.

## Einrichtung

1. Öffnen Sie die App-Einstellungen mit dem Zahnrad-Symbol oben in der Seitenleiste oder drücken Sie `Ctrl+Shift+,`.
2. Wählen Sie unter **KI-Assistent** den **KI-Anbieter**: OpenAI oder Anthropic.
3. Geben Sie den **OpenAI API-Schlüssel** oder **Anthropic API-Schlüssel** ein.
4. Klicken Sie auf **Aktualisieren**.

Ihr Schlüssel wird nur im lokalen Speicher dieses Browsers abgelegt. Anfragen gehen direkt von Ihrem Browser an den Anbieter; es gibt keinen *undash*-Server dazwischen. Die Nutzung wird über Ihr Konto beim Anbieter abgerechnet.

## Was mit der KI geteilt wird

*undash* sendet niemals Ihre Datensätze. Für jede Spalte erhält die KI:

- den Namen der Spalte (oder ihren Alias, siehe [Spalten & Transformationen](./fields-transforms#aliase)) und ihren Typ,
- Statistiken wie die Anzahl unterschiedlicher Werte, fehlende Werte und den Wertebereich, und
- bei aktiviertem **Kategoriewerte teilen** (Standard) bis zu zwölf Beispielwerte kategorialer Spalten.

::: warning WARNUNG
Kategoriewerte können Namen oder andere personenbezogene Daten enthalten. Deaktivieren Sie **Kategoriewerte teilen**, wenn diese Ihren Rechner nicht verlassen dürfen. Die KI sieht dann nur die Statistiken.
:::

## Ein Dashboard vorschlagen lassen

Öffnen Sie eine Tabelle. Es erscheint ein neues Modell, noch ohne Dimensionen und Metriken. Klicken Sie dann auf die Schaltfläche mit dem Funkelsymbol in der Kopfzeile des Bereichs **Dashboards** (**Modell und Dashboard mit KI vorschlagen**) oder drücken Sie `Ctrl+Shift+A`. Die Schaltfläche erscheint, sobald ein API-Schlüssel hinterlegt ist.

Während die KI arbeitet, zeigt *undash* „Analysiere Schema, Bereite Diagramme vor“. Anschließend öffnet sich der **Dashboard-Vorschlag**:

- **Name des Modells**: der Name des zu erstellenden Modells.
- Eine Zusammenfassung der vorgeschlagenen Dimensionen, Metriken und Transformationen.
- **Titel**, **Untertitel** und **Referenz zum Dashboard** des neuen Dashboards, von der KI vorgeschlagen. Passen Sie sie nach Belieben an.
- **Diagramme**: die vorgeschlagenen Diagramme, jeweils mit Typ und Kanälen. Entfernen Sie das Häkchen bei den Diagrammen, die Sie nicht möchten.

Klicken Sie auf **Speichern**, um das Modell mit seinem Dashboard und seinen Diagrammen zu erstellen, oder auf **Abbrechen**, um den Vorschlag zu verwerfen. Vor Ihrer Bestätigung wird nichts gespeichert.

Hat das Modell bereits Dimensionen oder Metriken, schlägt dieselbe Schaltfläche (**Neues Dashboard mit KI vorschlagen**, `Ctrl+Shift+A`) ein weiteres Dashboard vor. Die vorhandenen Dashboards bleiben unverändert.

## Diagramme vorschlagen lassen

Um einem vorhandenen Dashboard Diagramme hinzuzufügen, wählen Sie seine Zeile im Bereich **Dashboards** aus und klicken auf ihr Funkelsymbol (**Diagramme mit KI hinzufügen**) oder drücken `Ctrl+Shift+A` auf der Zeile. Der **Diagramm-Vorschlag** listet nur die Diagramme und funktioniert sonst wie der Dashboard-Vorschlag. Die neuen Diagramme werden diesem Dashboard hinzugefügt.

## Automatische Funktionen

Mit zwei Optionen in den Einstellungen wird die KI von selbst aktiv:

| Option | Was sie bewirkt |
|---|---|
| **Auto-Modellierung** | Nach dem Import einer Tabelle schlägt die KI ein Modell und ein Dashboard dafür vor. Sie prüfen den Vorschlag wie oben beschrieben. |
| **Auto-Benennung** | Nach dem Speichern eines Diagramms gibt die KI ihm einen Titel. Ein von Hand hinzugefügtes Dashboard erhält auf dieselbe Weise Titel und Untertitel. |

Beide sind standardmäßig deaktiviert.

## Fehler

| Meldung | Was zu tun ist |
|---|---|
| „Bitte zuerst den API-Schlüssel des gewählten KI-Anbieters in den Einstellungen hinterlegen!“ | Geben Sie einen Schlüssel für den gewählten Anbieter ein. |
| „Der KI-Anbieter hat den API-Schlüssel abgelehnt.“ | Prüfen Sie den Schlüssel in den Einstellungen. |
| „Keine Antwort des KI-Anbieters hat den Browser erreicht.“ | Prüfen Sie Ihre Netzwerkverbindung. |
| „Die Antwort der KI wurde abgeschnitten.“ / „Die Antwort der KI konnte nicht gelesen werden.“ | Versuchen Sie es erneut. |
| „Keines der vorgeschlagenen Diagramme konnte erstellt werden.“ | Versuchen Sie es erneut, oder fügen Sie Dimensionen und Metriken von Hand hinzu. |
