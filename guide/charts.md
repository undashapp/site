# Charts

Charts are built in the **Chart Configurator** of the model view, from the model's [dimensions and measures](./dimensions-measures). The next chapter, [Chart Types](./chart-types), describes each of the 21 chart types.

## Building a chart

### 1. Pick a chart type

The strip of chart icons lists only the chart types that the model's dimensions and measures can fill. If no type fits, the configurator shows "No Available Charts". Add more dimensions or measures to unlock more types.

- Click an icon, or move with `h`/`l` and press `Enter`.
- Hold `Shift` and press `h`/`l` to move only between types that can keep the current channel assignment. The others are greyed out.
- Press `c` and type the start of a name to jump to a type, for example `c` `bal` for the Balloon Chart.

### 2. Assign the channels

Below the chart type, each **channel** of the chart has a row, for example `x`, `y_max` or `color`. Required channels are marked with `*`. The badge shows the dimension or measure on the channel, or "none".

- Click the badge, or press `l`/`h`, to cycle through the attributes that fit the channel.
- Press `Backspace` or × to clear an optional channel.
- Press `t`, or click the channel's name, to swap `x` and `y` (or `row` and `col`).

An attribute can be used on only one channel per chart. The `color` channel is the exception: it can repeat an attribute, for example to color bars by their own category.

When you switch the chart type, *undash* keeps every assignment that fits the new type.

::: tip
The channel list is the recipe of the chart: `x` and `y` are the axes, `color` splits the data into colored series, `row` and `col` split the chart into small multiples, and channels like `r`, `angle` or `opacity` map a measure to size, angle or shade.
:::

### 3. Save the chart

- Click the save button in the configurator row, or press `Ctrl+S`. The chart gets a default name, such as "Column Chart 01".
- `Shift`+click the save button, or press `Ctrl+Shift+S`, to give a new chart a name first. The form also asks for a **Chart Reference**, the chart's internal name.

Saving a chart saves the model as well. If [Auto-labeling](./ai#automatic-features) is on, the AI gives new charts a title.

## Small multiples

Every chart type has two optional channels, `row` and `col`. Assign a dimension to one or both to split the chart into a grid of small charts, one per category, for example revenue per month with one panel per region.

The panels get smaller as their number grows. When they become too small to draw, the chart shows a hatched area instead. Enlarge the view, or filter the dimension to fewer categories.

## Sorting

Channels with categories or measures can be sorted. Click the sort button at the left of a channel row, or use `<` (ascending), `>` (descending) and `u` (remove). Sorting a bar chart's measure orders the bars by value, sorting its category axis orders them by name.

## Labels, legends and colors

- **Titles:** a chart's title is its name. Rename charts in the **Charts** panel.
- **Axis labels:** axes are labeled with the names of their dimensions and measures, including [aliases](./fields-transforms#aliases). Measures read like `sum_revenue`, and **Count** shows as "Total".
- **Numbers:** axes use short notation such as `1.2k` or `3M`, and the separators of the current [locale](./settings).
- **Missing values** appear as "Unknown", and the rest of a [Group transform](./fields-transforms#group) as "Other".
- **Legend:** a chart with a `color` channel shows a legend in its top-right corner, unless the colors are already explained by an axis. Long legends scroll.
- **Colors:** the colors come from the **Color** and **Color Palette** [settings](./settings). A [static](./dimensions-measures#static-and-dynamic-attributes) color dimension keeps each category's color when filters change. Sorting the `color` channel descending reverses the palette.

## Managing charts

The **Charts** panel lists the model's saved charts, newest first. Focusing a chart highlights it on the dashboard.

| Action | Button | Key |
|---|---|---|
| Edit in the configurator | ↑ circle | `u` |
| Rename | Pencil | `e` |
| Show on or hide from the dashboard | Check | `d` |
| Assign filters and controls | Click the row | `Enter` |
| Delete | × | `Backspace` |

To edit a chart, load it into the configurator with `u`, change it and save it again. To stop editing without saving, press `Escape` or the × in the configurator row.

To copy a chart, load it into the configurator, press `Escape` to stop editing, and save it again. The copy is saved as a new chart.

The × in the panel header deletes all charts of the model at once, without confirmation.

## Viewing the SQL of a chart

With the [DB console linked](./models#linked-mode), the console shows the query behind the current chart and the data it returned, as soon as the keyboard is in one of the chart panels. This is a good way to understand or reuse what a chart computes.

## View controls

Each view has a control strip in its bottom-right corner. The settings are kept separately for the chart view and the dashboard.

| Control | What it does | Keys |
|---|---|---|
| **Scaling mode** | Lay the chart out for its box, or draw it at normal size and scale it like a picture | `Ctrl+G` |
| **Whitespace** | Padding around the chart (and between charts on the dashboard), −9 to +9 | `Ctrl+Alt+Shift+=` / `-` / `0` |
| **Font scale** | Size of all text, −9 to +9 | `Ctrl+Shift+=` / `-` / `0` |
| **Chart scale** | Size of the chart, −9 to +9. Mouse wheel and pinch work too. | `Ctrl+=` / `-` / `0` |
| **Resize mode** | *None*: natural size, drag to pan if it is too big. *Shrink to fit*: shrink when it doesn't fit. *Scale to fit*: always fill the view. | `Ctrl+Z` / `Ctrl+Shift+Z` |
| **Aspect ratio** | Keep the chart's proportions when fitting. Turn it off to stretch the chart to the view. | `Ctrl+A` |
| **View reference** | Fit the chart into the view's rectangle, or into a square | `Ctrl+R` |

Double-click a slider to reset it.

At the top right of each view are the **lock** button (see [Static and dynamic attributes](./dimensions-measures#static-and-dynamic-attributes)) and the **export** button. On the dashboard, you will also find the layout controls (see [Dashboards](./dashboards#layout)).

## Exporting a chart

Hover the top-right corner of a chart to reveal its export button, or press `Ctrl+Shift+D` to export the focused view. The format, paper size and colors come from the export [settings](./settings): PDF, SVG, PNG or JPEG, in the view's own size or on A4, A3, A2, Letter, Legal or Tabloid, in black and white or in the current theme's colors.
