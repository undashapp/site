# Models & SQL

A **model** is a named SQL query. It is the center of *undash*: fields, transforms, filters, controls, dimensions, measures, charts and the dashboard all belong to a model.

## Creating a model

There are four ways to create a model:

- **Open a table.** Clicking a table opens a new model with `SELECT * FROM <table>`. It is saved when you save it or when you save its first chart.
- **Write a query.** Click **+** (**New Model**) in the **Models** header, or press `Ctrl+N`. Enter a title, a name (the "Name of Database View") and a SQL query, then click **Save**. This needs at least one table.
- **From the SQL console.** Write a query in the [DB console](#the-db-console) and click **+**, or press `Ctrl+N` in the editor.
- **With AI.** See [AI Assistant](./ai).

### Writing the query

A model's query is a DuckDB `SELECT` query. It may reference tables and other models by their names, and it may use CTEs (`WITH ...`). *undash* runs the query when you save it and rejects it if

- it references no table or model at all,
- it references a table or model that does not exist, or the model itself,
- it fails to run, or
- its result is empty.

```sql
SELECT
  region,
  CAST(order_date AS DATE) AS order_date,
  quantity * unit_price AS revenue
FROM sales_2024
WHERE status <> 'cancelled'
```

The SQL of a saved model cannot be changed afterwards. To change it, create a new model with the new query.

::: tip
Models are the place to clean data: rename columns, fix types, compute new columns or join tables. Everything you can express in DuckDB SQL works.
:::

## Saving a model

Next to the **Model** heading, a colored dot shows the model's state:

| Dot | Meaning |
|---|---|
| Green | Saved. |
| Yellow | Unsaved changes, or a new model that has not been saved yet. A save button appears next to the dot. |
| Grey | Cannot be saved, because other models depend on this one. |

Save with the save button or with `s`. Saving a chart saves the model as well.

::: warning
Closing a model (the × button or `q`) discards unsaved changes without asking.
:::

## Managing models

Models are listed in the **Models** list of the data overview. When a model has the focus, its card also shows how many transforms, filters, controls, dimensions, measures and charts it has.

| Action | How |
|---|---|
| **Open** | Click the model, or press `Enter`. |
| **Edit** | ⋮ menu → **Edit**, or `e`. Changes the title and the name. Charts and dashboard move along with the name. The name is locked while another model depends on this one. |
| **Export** | ⋮ menu → **Export**, or `d`. Downloads the result of the model's query. |
| **Delete** | ⋮ menu → **Delete**, or `Ctrl+Shift+D`. Deletes the model with all its charts and its dashboard. Not possible while another model depends on it. |

::: warning
Deleting a model happens immediately. There is no confirmation and no undo.
:::

## The model view

When a model is open, the sidebar shows its panels from top to bottom:

| Panel | Contents |
|---|---|
| **Model** | Title and save state. |
| **Query** | The model's SQL, sampling, materialization and console link. |
| **Fields** | The columns of the query. See [Fields & Transforms](./fields-transforms). |
| **Transforms** | Derived fields. See [Fields & Transforms](./fields-transforms). |
| **Filters** | Fixed filters. See [Filters & Controls](./filters-controls). |
| **Controls** | Interactive filters. See [Filters & Controls](./filters-controls). |
| **Dimensions** | Fields to group by. See [Dimensions & Measures](./dimensions-measures). |
| **Measures** | Aggregations. See [Dimensions & Measures](./dimensions-measures). |
| **Chart Configurator** | Builds charts. See [Charts](./charts). |
| **Charts** | The model's saved charts. See [Charts](./charts). |

Press `g` followed by a letter to jump to a panel: `f` Fields, `t` Transforms, `w` Filters, `o` Controls, `d` Dimensions, `m` Measures, `s` chart selector, `c` Chart Configurator, `l` Charts.

## The Query panel

The **Query** panel is collapsed by default. It shows the model's SQL. Click it to copy the query. The icons in its header offer three tools.

### Sampling

For models with 200,000 rows or more, a test-tube icon appears. When sampling is on (icon red, or press `x`), all charts are computed from the first 100,000 rows of the model instead of all rows, and the icon shows which share of the data that is. Sampling is useful to explore big data quickly.

When you open a table with 1,000,000 rows or more, sampling is switched on automatically.

### Materialization

The download icon (`Ctrl+Shift+M`) materializes the model: *undash* computes the query once and keeps the result as a table in memory. This speeds up models with expensive queries, such as joins. The materialized result is dropped when you close the model.

### Console link

The link icon (`Ctrl+Shift+C`) links the DB console to the model. It is on by default. See below.

## The DB console

The DB console is a SQL editor with a result table. Open it with the console button in the bottom bar, with `Ctrl+C`, or by typing `v` then `t`. Press `Ctrl+T` to move the keyboard between the sidebar and the console.

The console runs your query **as you type**. It shows how long the query took, and a result table with up to 1,000 rows (fewer for wide results). If the query fails, a red icon appears. Click it, or press `Ctrl+I`, to see the error.

- Click **+**, or press `Ctrl+N`, to create a model from the query.
- Click the **#** header cell of the result table to copy the visible rows. They can be pasted into a spreadsheet.
- The console can also run statements other than `SELECT`.

In the editor, `Tab` moves to the result table and back. In the result table, `h`/`l` or the arrow keys scroll by column, `↑`/`↓` by row, and `j`/`k` by half a page.

### Linked mode

When the console is linked (see [Console link](#console-link)), it follows what you do in the sidebar:

- With a model open, the console shows the model's query.
- In the chart panels, it shows the query behind the current chart and its result. This is how you peek at the SQL behind a chart.

As soon as you edit the query, it becomes a normal query of your own.
