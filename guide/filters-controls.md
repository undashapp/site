# Filters & Controls

*undash* has two kinds of filters:

| | **Filter** | **Control** |
|---|---|---|
| Purpose | Defines which data the model shows | Lets viewers explore the data interactively |
| Add | Filter button or `f` on a field | Adjustments button or `Ctrl+F` on a field |
| Remove | `Shift+F` on the field | `Ctrl+Shift+F` on the field |
| Values | Exactly the values you enter | Snap to the steps of the slider |
| Saved with the model | Yes, including its selection | The control is saved; its selection resets when the model is opened again |
| In presentation mode | Not shown | Shown in the **Filters** panel |

A field can have both a filter and a control. Filters and controls work on the model's fields, not on transformed fields.

::: tip
Use filters to shape the data once, for example to exclude test orders. Use controls for the questions viewers will ask, for example "only region North".
:::

## Editing a filter or control

Click a row in the **Filters** or **Controls** panel, or press `Enter` or `e`, to open its form. The form depends on the field's type:

| Field type | Form |
|---|---|
| String | A list of values with checkboxes and a search field. Check **Exclude** to keep everything *except* the checked values. **Unselect All** clears the selection. |
| Boolean | No form. The row has a switch with three states: unset, **Yes** and **No**. |
| Integer | A range slider with input fields. For fields with up to 100 values, also a list of values to pick from. |
| Float | A range slider with minimum and maximum inputs, and **Reset**. |
| Date | A range slider that steps by day, month, quarter or year, depending on the range. |
| Datetime | A range slider with date and time inputs. |
| Time | A range slider with hour and minute inputs (and seconds, if the data has them). |

The row shows a summary of the selection, such as "North, South + 3" or "from 100".

In a form, `Escape` closes it, `r` resets it, and `Ctrl+J` / `Ctrl+K` jump to the next or previous filter. In a value list, type to search, press `Enter` to select all matches, and use `j`/`k` and `Space` to move and toggle.

## Row buttons

| Button | Action | Key |
|---|---|---|
| Check | Turn the filter on or off, without removing it | `d` or `Shift+Enter` |
| Null (Ⓝ) | Decide how missing values are treated: **None** (no rule), **Non-Null** (exclude them) or **Null** (only them, or in addition to a selection) | `n` / `Shift+N` |
| World | Switch between **Global (every chart)** and **Local (only assigned charts)** | `Shift+G` |
| × | Remove the filter | `Backspace` |

The null button is shown only when the field has missing values. `r` on a row resets its selection but keeps the filter.

## Global and local filters

By default, a filter or control is **global**: it applies to every chart of the model. A **local** filter applies only to the charts you assign it to.

To change which filters apply to a chart, focus the chart in the **Charts** panel and press `Enter` to expand it. It shows two rows, **Filters** and **Controls**, which read **Default** as long as nothing deviates. Open a row and check a filter to exclude a global filter from this chart, or to include a local one. `r` resets the chart to the defaults.

For example, a dashboard can show a KPI with the total revenue next to charts that follow the region control, by excluding the KPI from that control.

## Controls on the dashboard

Every change to a control updates all charts it applies to, right away. In [presentation mode](./dashboards#presentation-mode), the enabled controls appear in a floating **Filters** panel, so viewers can use them without the sidebar.

## Performance

When you open a control, *undash* may pre-compute the results for all positions of the control. Meanwhile, the form is greyed out and a spinner replaces the check button. After that, dragging a slider or picking categories is answered instantly, even on large data.

Pre-computation needs [static dimensions](./dimensions-measures#static-and-dynamic-attributes). It is skipped when a visible chart uses a dynamic dimension, and for charts with the aggregations Median, Mode, MAD, Skewness, Kurtosis, First, Last or distinct measures. In these cases, each change runs a normal query.
