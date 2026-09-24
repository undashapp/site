# Privacy, Storage & Offline

## Your data stays in your browser

*undash* has no backend. Files you import are processed by DuckDB inside your browser tab and never uploaded. There is no account and no tracking of your data.

Data leaves your machine only in two cases, both of which you set up yourself:

- **AI assistant:** column names and statistics (and optionally category values) are sent to OpenAI or Anthropic. Rows are never sent. See [AI Assistant](./ai#what-is-shared-with-the-ai).
- **Remote tables:** queries go to the DuckDB server you configured. See [Remote tables](./data#remote-tables).

## Where data is stored

| What | Where |
|---|---|
| Tables, models, charts, dashboards | The browser's private file system (OPFS) for the *undash* website |
| Settings, API keys, server credentials | The browser's local storage |

Everything is kept across reloads and restarts. Not kept are unsaved models, materialized models and the contents of the SQL console.

Storage is bound to the browser and the website. A different browser, a different computer or a private window starts with an empty project. To move a project, use a [project backup](./data#backing-up-a-project).

::: warning
Clearing the site data of *undash* in your browser deletes all tables, models and dashboards. *undash* asks the browser to keep its storage permanently, but browsers may still remove it when the disk is almost full. Download a backup of important projects from time to time.
:::

## Working offline

The first time you open *undash*, it downloads the DuckDB engine (about 35 MB) and keeps it in the browser's cache. From then on, *undash* starts and works without an internet connection. Only the AI assistant and remote tables need a network.

## Installing as an app

*undash* can be installed as an app, for example with the install button in the address bar of Chrome or Edge, or with **Add to Dock** in Safari. The installed app opens in its own window and works offline like the website.
