# Importing Data

Every file you import becomes a **table**. Tables are the raw material for [models](./models).

## Supported formats

| Format | Extension | How it is read |
|---|---|---|
| CSV | `.csv` | The delimiter is detected automatically. The first row is the header. |
| TSV | `.tsv` | Like CSV, with tabs as delimiter. |
| JSON | `.json` | Column names and types are detected automatically. |
| Parquet | `.parquet` | Stored as is. |

Excel files cannot be imported, but you can export to Excel (see [Exporting data](#exporting-data)). A `.zip` file is treated as a project backup (see [Backing up a project](#backing-up-a-project)).

## Importing files

Drag one or more files onto the **Data Files** box in the sidebar, or click the box to open a file picker. Files are imported one after another, and a notification confirms each one.

While a file is being imported, *undash* shows "Analyzing Data". During import, *undash*

1. converts the file to Parquet and stores it in your browser,
2. detects the type of every column, and
3. computes statistics for every column, such as distinct values, missing values, minimum and maximum. For tables with more than 10 million rows, these statistics are approximate.

If an import fails, nothing is left behind.

### Size limits

The files of one import may be up to **2 GB** in total. They must also fit into the storage space your browser grants to *undash*. If they don't, *undash* shows "Not enough space left in file system of browser!".

### Column types

*undash* maps the column types that DuckDB detects to these types:

| Type | Examples |
|---|---|
| String | text, UUIDs |
| Boolean | true / false |
| Integer | whole numbers |
| Float | decimal numbers |
| Date | `2026-09-24` |
| Datetime | `2026-09-24 14:30:00`, with or without time zone |
| Time | `14:30:00` |

Columns of other types, such as intervals, are shown but cannot be used for charts.

::: tip
If a column is detected with the wrong type, fix it in the model's SQL query, for example with `CAST(zip AS VARCHAR) AS zip`. See [Models & SQL](./models).
:::

### Table names

Each table has a **title**, which is shown in the app, and a **name** (the "Name of Database Table"), which you use in SQL. Both are derived from the file name: `Sales 2024.csv` becomes the table `sales_2024` with the title "Sales 2024".

If a table or model with that name already exists, *undash* asks for a different name before it imports the file. Existing tables are never overwritten.

## Managing tables

Every table in the **Tables** list shows its title, the number of columns and rows, and its name. Click the name to copy it to the clipboard.

| Action | How |
|---|---|
| **Open** | Click the table, or press `Enter`. This opens a new model with `SELECT * FROM <table>`. |
| **Edit** | ⋮ menu → **Edit**, or `e`. Changes the title and the name. The name is locked while a model uses the table. |
| **Export** | ⋮ menu → **Export**, or `d`. Downloads the table in the data export format. |
| **Delete** | ⋮ menu → **Delete**, or `Ctrl+Shift+D`. Not possible while a model uses the table. |

::: warning
Deleting a table happens immediately. There is no confirmation and no undo.
:::

Titles can be set per language. In the edit form, click the language button next to the title field (for example "en") to switch between languages.

### Searching and sorting

Once there is at least one table or model, a **Search** field appears above the lists. It filters models and tables as you type. Press `/` to jump to the search field, `Enter` to open the first hit, and `Escape` to clear it.

When a list has more than one entry, two buttons in its header sort it by time or alphabet, ascending or descending.

## Exporting data

Tables and models can be exported via ⋮ menu → **Export** or with `d`. The file is named after the table or model, and the format is set by the **Data Export Format** setting (see [Settings](./settings)):

| Format | Output |
|---|---|
| CSV (default) | Comma-separated, with a header row |
| XLSX | An Excel workbook with one sheet named "undash" |
| JSON | One JSON array of records |
| Parquet | A Parquet file |

A model is exported with the result of its SQL query.

::: tip
XLSX export is the slowest format. If a large export fails with "Out of memory!", try CSV or Parquet.
:::

## Backing up a project

The zip icon in the **Data Files** header (**Download all files**) downloads your whole project as `undash_YYYYMMDD.zip`. The archive contains all tables, models, charts and dashboards. Your settings and API keys are not included.

To restore a backup, drop the `.zip` file onto the **Data Files** box, on its own.

::: danger
Importing a backup **replaces your entire project**. All current tables, models, charts and dashboards are deleted first. There is no confirmation.
:::

This is also the way to move a project to another browser or computer.

## Remote tables

Instead of importing files, *undash* can also query tables on a DuckDB server. Only query results are sent to the browser.

1. Open the app settings (`Ctrl+Shift+,`) and enter the **DuckDB URI** and, if needed, an **Auth Token** under **DuckDB Server Credentials**.
2. Once the server is reachable, a **+** button (**Add remote table**) appears in the **Tables** header. You can also press `Ctrl+Shift+N`.
3. Pick a table from the server, optionally with **Include Views**, and give it a name.

Remote tables carry a cloud badge. Press `Ctrl+R` on a remote table to refresh its statistics. The server URI cannot be changed while remote tables exist.
