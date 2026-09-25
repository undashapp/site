# Datenschutz, Speicher & Offline

## Ihre Daten bleiben in Ihrem Browser

*undash* hat kein Backend. Importierte Dateien werden von DuckDB in Ihrem Browser-Tab verarbeitet und nie hochgeladen. Es gibt kein Konto und kein Tracking Ihrer Daten.

Daten verlassen Ihren Rechner nur in zwei Fällen, die Sie beide selbst einrichten:

- **KI-Assistent:** Spaltennamen und Statistiken (und optional Kategoriewerte) werden an OpenAI oder Anthropic gesendet. Datensätze werden nie gesendet. Siehe [KI-Assistent](./ai#was-mit-der-ki-geteilt-wird).
- **Remote-Tabellen:** Abfragen gehen an den von Ihnen konfigurierten DuckDB-Server. Siehe [Daten importieren](./data#remote-tabellen).

## Wo Daten gespeichert werden

| Was | Wo |
|---|---|
| Tabellen, Modelle, Diagramme, Dashboards | Das private Dateisystem des Browsers (OPFS) für die *undash*-Website |
| Einstellungen, API-Schlüssel, Server-Zugangsdaten | Der lokale Speicher des Browsers |

Alles bleibt über Neuladen und Neustarts hinweg erhalten. Nicht erhalten bleiben ungespeicherte Modelle, materialisierte Modelle und der Inhalt der SQL-Konsole.

Der Speicher ist an den Browser und die Website gebunden. Ein anderer Browser, ein anderer Rechner oder ein privates Fenster beginnt mit einem leeren Projekt. Um ein Projekt umzuziehen, verwenden Sie eine Projektsicherung (siehe [Daten importieren](./data#projekt-sichern)).

::: warning WARNUNG
Wenn Sie die Website-Daten von *undash* in Ihrem Browser löschen, werden alle Tabellen, Modelle und Dashboards gelöscht. *undash* bittet den Browser, seinen Speicher dauerhaft zu behalten, doch Browser können ihn trotzdem entfernen, wenn die Festplatte fast voll ist. Laden Sie von Zeit zu Zeit eine Sicherung wichtiger Projekte herunter.
:::

## Offline arbeiten

Wenn Sie *undash* zum ersten Mal öffnen, lädt es die DuckDB-Engine (etwa 35 MB) herunter und legt sie im Cache des Browsers ab. Von da an startet und funktioniert *undash* ohne Internetverbindung. Nur der KI-Assistent und Remote-Tabellen benötigen ein Netzwerk.

## Als App installieren

*undash* lässt sich als App installieren, zum Beispiel über die Installieren-Schaltfläche in der Adressleiste von Chrome oder Edge oder mit **Zum Dock hinzufügen** in Safari. Die installierte App öffnet sich in einem eigenen Fenster und funktioniert offline wie die Website.
