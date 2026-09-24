# First Steps

This walkthrough takes you from a data file to a dashboard. Any CSV, TSV, JSON or Parquet file works. A table with a few categories, a date and some numbers, such as sales per region and month, is ideal.

## 1. Import a file

When you open *undash* for the first time, the sidebar on the left shows the **Data Files** box.

- Drag your file onto the box, or
- click the box (or press `Enter` while it has focus) to pick a file.

*undash* reads the file, detects the column types and computes statistics for every column. When it is done, the file appears in the **Tables** list, and a notification confirms that it was loaded.

::: tip
Your data is only stored locally in your browser. Nothing is uploaded anywhere.
:::

## 2. Open the table

Click the table in the **Tables** list. *undash* opens it as a new **model** with the query `SELECT * FROM <table>`, and the sidebar switches to the model view.

The model is not saved yet: the dot next to the **Model** heading is yellow. It is saved as soon as you save a chart, or when you press `s`.

The **Fields** panel lists all columns of the table with their types. Next to each field is a small statistic, such as the number of distinct values or a box plot for decimal numbers.

## 3. Add dimensions and measures

Charts are built from **dimensions** (what you group by) and **measures** (what you aggregate). Hover a field to reveal its buttons:

- The **category** button (or `d`) adds the field as a dimension, for example `region`.
- The **sum** button (or `m`) adds a measure on the field, for example the average of `revenue`.

You can also simply click a field. *undash* then picks a sensible role: decimal numbers become measures, categories become dimensions.

In the **Measures** panel, click the badge of a measure (for example "Average") to cycle through the other aggregations, such as "Sum" or "Median".

## 4. Create a chart

As soon as the model has dimensions and measures, the **Chart Configurator** offers the chart types that fit them.

1. Pick a chart type from the strip of chart icons, for example the **Column Chart**.
2. Check the channels below it. Each channel, such as `x` or `y_max`, shows the dimension or measure assigned to it. Click a badge to cycle to a different one.
3. Click the save button in the configurator row, or press `Ctrl+S`.

The chart appears in the **Charts** panel and on the model's dashboard. Saving the chart also saves the model, so the dot turns green.

Repeat this step for a few more charts: for a date field, add a **Date Bin** transform (see [Fields & Transforms](./fields-transforms)) and try a **Line Chart**.

## 5. Look at the dashboard

The main area shows the dashboard with all saved charts. Use the buttons in the bottom bar to show the chart view (the chart you are editing), the dashboard, or both side by side.

On the dashboard, drag a chart by its title to move it, or pick one of the layout templates in the dashboard's control strip. See [Dashboards](./dashboards).

## 6. Add a control

Controls are filters that viewers can change on the dashboard. Hover a field in the **Fields** panel and click the **adjustments** button (or press `Ctrl+F`). The field appears in the **Controls** panel. Open it to pick categories or drag a range slider, and watch all charts update.

## 7. Present and export

- Press `Ctrl+Shift+P` to present the dashboard in full view. Press `c` to open the **Filters** panel with your controls, and `Escape` to leave.
- Press `Ctrl+Shift+D` to export the focused view as PDF. The file type and paper size are set in the [settings](./settings).

## Shortcut: let AI build the dashboard

If you have an OpenAI or Anthropic API key, *undash* can propose a complete model and dashboard for a table in one click. Only column statistics are shared with the AI provider, never your rows. See [AI Assistant](./ai).

## Next steps

- [The Interface](./interface) explains the parts of the screen.
- [Keyboard Shortcuts](./shortcuts) lists every key. Almost everything in *undash* can be done without the mouse.
