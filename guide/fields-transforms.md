# Fields & Transforms

## Fields

The **Fields** panel lists every column of the model's query. Each field shows an icon for its type, its name and a statistic.

The button in the panel header (or `p`) switches the statistic:

| Mode | Shows |
|---|---|
| **Totals** (Σ) | The number of distinct values. A `~` marks approximate or rounded counts. Decimal fields show a small box plot of minimum, quartiles, median and maximum instead. |
| **Missing values** | The share of missing (null) values. |
| **None** | Nothing. |

Some fields are greyed out and cannot be used: fields of unsupported types (such as intervals) and fields that contain only one distinct value.

### Field buttons

Hover or focus a field to show its buttons:

| Button | Action | Key |
|---|---|---|
| Pencil | Edit the field's alias | `e` |
| Column | Add a transform | `t` |
| Filter | Add or remove a filter | `f` / `Shift+F` |
| Adjustments | Add or remove a control | `Ctrl+F` / `Ctrl+Shift+F` |
| Category | Add or remove a dimension | `d` / `Shift+D` |
| Sum | Add a measure | `m` |

More keys on a field:

- `Ctrl+D` adds a transform and turns it into a dimension in one step.
- `Shift+T` removes all transforms of the field, and `Shift+M` removes all its measures.
- `Space` preselects the field for a [bivariate measure](./dimensions-measures#bivariate-measures).

A button is bold when its role is active, and it is hidden when the role is not possible for the field.

Clicking a field (or pressing `Enter`) picks a sensible action: decimal numbers get a measure, categorical fields become dimensions, and fields that need a transform first (such as dates) get one.

### Aliases

An alias gives a field a friendlier name without changing the data. Click the pencil, or press `e`, type the alias and press `Enter`. `Escape` cancels.

- An alias uses lowercase letters, digits and underscores, and starts with a letter or underscore, for example `revenue_eur`.
- It must not be the name of another field.
- To remove an alias, clear it or type the column's own name.

The alias is shown everywhere in the model: in transforms, measures (`sum_revenue_eur`), filters, charts and legends. Hover an aliased field to see the original column name. Aliases belong to the model, so two models on the same table can name a column differently.

::: tip
Aliases also help the [AI assistant](./ai). A column named `c1` tells it nothing, an alias `revenue` does.
:::

## Transforms

A transform derives a new field from an existing one, for example the month of a date or bins of a number. Transformed fields appear in the **Transforms** panel. They are used as **dimensions** only; they cannot be filtered or aggregated.

Add a transform with the column button on a field or with `t`. *undash* picks the first transform that fits the field's type. Then adjust it on the transform's row:

| Action | Key / mouse |
|---|---|
| Next / previous option (e.g. number of bins) | `l`/`→` and `h`/`←`, or click the badge (`Shift`+click: previous) |
| Next / previous transform type | `Shift+L` and `Shift+H`, or click the icon (`Shift`+click: previous) |
| Add as dimension / remove dimension | `d` / `Shift+D` |
| Add another transform on the same field | `t` |
| Remove the transform | `Backspace` or × |

Transformed fields are named after the field and the transform, for example `order_date_date_bin` or `revenue_bin_index`.

### Bin

For **Integer** and **Float** fields. Splits the range of values into 2 to 128 equal bins. There are two variants:

- **Bin start**: the lower edge of each bin, a decimal number. Good for scatter-like charts.
- **Bin index**: the number of the bin, from 1 to n. Required for **Histograms** and **Heatmaps**.

The options offer "nice" bin widths (1, 2, 2.5 or 5 times a power of ten) as well as bin counts from the statistical rules of Sturges, Rice, Scott and Freedman-Diaconis. The badge shows the rule and the number of bins, for example "sturges 12".

### Date Bin

For **Date**, **Datetime** and **Time** fields. Truncates values to a period: Year, Quarter, Month, Week, Day, Hour, Minute, Second or Millisecond. Weeks start on Monday.

Only periods that give between 2 and 256 bins for the field's range are offered. Dates offer no periods below a day, and times offer only hours and smaller.

### Date Extract

For **Date**, **Datetime** and **Time** fields. Extracts one part of the value as a whole number:

| Part | Values |
|---|---|
| Year | the years in the data |
| Quarter | 1–4 |
| Month | 1–12 |
| Week | 1–53 |
| Day | 1–31 |
| Hour | 0–23 |
| Minute | 0–59 |
| Second | 0–59 |
| Millisecond | 0–999 |
| Day of Week | 0–6 |
| Day of Year | 1–366 |

Use Date Extract to compare periods, for example revenue by month across several years.

### Group

For categorical fields with more than two values. Press `e` or click the row to open the category list, then pick the categories to keep. All other categories are combined into **Other**. At least one category must stay selected.

### Top N and Bottom N

For categorical fields. Keeps the N categories with the largest (Top N) or smallest (Bottom N) value of the chart's measure. N can be 1 to 20, and then up to 100 in steps. Top N and Bottom N need at least one measure in the model, and work in column, bar, pie, donut and radar charts.

### Geo

For **String** fields that contain region codes. Geo fields are required for **Map** charts. The supported regions are:

| Region | Codes |
|---|---|
| Countries | ISO 3166 alpha-2 (`DE`) or alpha-3 (`DEU`) |
| US States | USPS codes (`CA`) |
| Bundesländer | German state codes (AGS) |
| Landkreise | German district codes (AGS) |

The Geo transform is only offered when *all* values of the field are valid codes of a region. If the codes fit several regions, cycle through them with the badge.
