# Settings

*undash* has two places for settings: the **settings strip** for how things look and export, and the **app settings** for the AI assistant and DuckDB servers. All settings are stored in your browser.

## Settings strip

The settings strip sits at the top of the sidebar. Hover the adjustments icon, or press `Ctrl+,`, to expand it.

Click a setting to switch to its next value, and `Shift`+click to go back. With the keyboard, `h`/`l` or `←`/`→` move between settings, `k`/`↑` picks the next value and `j`/`↓` the previous one. `Escape` closes the strip.

| Setting | Values | Default |
|---|---|---|
| **Light/Dark Mode** | auto, light, dark. *auto* follows your operating system. | auto |
| **Locale** | en (English), de (German). Sets the language of the app and the number and date formats. | your browser's language |
| **Color** | The primary color for charts: grey or one of seven colors. | grey |
| **Color Palette** | monochromatic (shades of the primary color) or categorical (distinct colors) | monochromatic |
| **Font Family** | Lato, Source Sans 3, Inter, Roboto, IBM Plex Sans, Open Sans | Lato |
| **Export File Type** | pdf, svg, png, jpeg | pdf |
| **Export Format** | custom (the size of the view), a4, a3, a2, letter, legal, tabloid | custom |
| **Export Colors** | mono (black on white) or current (the current theme's colors) | mono |
| **Data Export Format** | csv, xlsx, json, parquet | csv |

The export settings apply to [chart and dashboard exports](./dashboards#exporting) and to [data exports](./data#exporting-data).

## App settings

Open the app settings with the gear icon at the top of the sidebar, or with `Ctrl+Shift+,`. Click **Update** to apply your changes.

### AI Assistant

| Setting | Description |
|---|---|
| **AI Provider** | OpenAI or Anthropic. |
| **OpenAI API Key** / **Anthropic API Key** | Your own key for the provider. |
| **Share category values** | Sends example values of categorical columns along with the statistics. On by default. |
| **Auto-modeling** | Proposes a model and dashboard for every imported table. Off by default. |
| **Auto-labeling** | Generates a title for every saved chart. Off by default. |

See [AI Assistant](./ai) for details.

### DuckDB Server Credentials

| Setting | Description |
|---|---|
| **DuckDB URI** | The address of a DuckDB server whose tables can be used as [remote tables](./data#remote-tables). Leave it empty to work entirely in the browser. |
| **Auth Token** | The server's token, sent with every request. |

The URI cannot be changed while remote tables or models depend on it.

## Updates

When a new version of *undash* is available, a banner at the top says "A new version is available". Click **Update** to reload the app with the new version. *undash* never updates while you work.

Click the version number next to the app title to copy it.
