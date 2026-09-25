# Datenschutz, Speicher & Offline

## Ihre Daten bleiben in Ihrem Browser

*undash* hat kein Backend. Importierte Dateien werden von DuckDB in Ihrem Browser-Tab verarbeitet und nie hochgeladen. Es gibt kein Konto und kein Tracking Ihrer Daten.

Daten verlassen Ihren Rechner nur in zwei Fällen, und beide richten Sie selbst ein:

- **KI-Assistent:** Spaltennamen und Statistiken (und optional Kategoriewerte) werden an OpenAI oder Anthropic gesendet. Datensätze werden nie gesendet. Siehe [KI-Assistent](./ai#was-mit-der-ki-geteilt-wird).
- **Remote-Tabellen:** Abfragen gehen an den von Ihnen konfigurierten DuckDB-Server. Siehe [Daten importieren](./data#remote-tabellen).

## Wo Daten gespeichert werden

| Was | Wo |
|---|---|
| Tabellen, Modelle, Diagramme, Dashboards | Das private Dateisystem des Browsers (OPFS) für die *undash*-Website |
| Einstellungen, API-Schlüssel, Server-Zugangsdaten | Der lokale Speicher des Browsers |

Alles bleibt auch nach dem Neuladen der Seite oder einem Neustart erhalten. Nicht erhalten bleiben ungespeicherte Modelle, materialisierte Modelle und der Inhalt der SQL-Konsole.

Der Speicher ist an den Browser und die Website gebunden. In einem anderen Browser, auf einem anderen Rechner oder in einem privaten Fenster beginnen Sie mit einem leeren Projekt. Um ein Projekt mitzunehmen, verwenden Sie eine Projektsicherung (siehe [Daten importieren](./data#projekt-sichern)).

::: warning WARNUNG
Wenn Sie die Website-Daten von *undash* in Ihrem Browser löschen, werden alle Tabellen, Modelle und Dashboards gelöscht. *undash* fordert beim Browser dauerhaften Speicher an. Trotzdem kann der Browser Daten entfernen, wenn der Speicherplatz knapp wird. Laden Sie von Zeit zu Zeit eine Sicherung wichtiger Projekte herunter.
:::

## Offline arbeiten

Wenn Sie *undash* zum ersten Mal öffnen, lädt es die DuckDB-Engine (etwa 35 MB) herunter und legt sie im Cache des Browsers ab. Danach startet und läuft *undash* auch ohne Internetverbindung. Nur der KI-Assistent und Remote-Tabellen benötigen eine Netzwerkverbindung.

## Als App installieren

*undash* lässt sich als App installieren, zum Beispiel über die Installieren-Schaltfläche in der Adressleiste von Chrome oder Edge oder mit **Zum Dock hinzufügen** in Safari. Die installierte App öffnet sich in einem eigenen Fenster und funktioniert wie die Website auch offline.
