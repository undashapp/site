# Dimensions & Measures

Charts are built from two kinds of attributes:

- **Dimensions** split the data into groups: regions, months, product categories.
- **Measures** aggregate each group into a number: sum of revenue, average price, count of orders.

## Dimensions

Add a field or a transformed field as a dimension with the category button or `d`. `Ctrl+D` on a field adds a transform and a dimension in one step.

A categorical dimension can go on a chart only if it has fewer than 100 categories. Dimensions with more categories are greyed out, unless a filter narrows them down. Use a [Group, Top N or Bottom N transform](./fields-transforms#transforms) to reduce the number of categories.

A dimension cannot be removed while a chart uses it. Remove it with `Backspace` or ×.

## Measures

Add a measure with the sum button or `m` on a field. The first row of the **Measures** panel is always `*` with **Count**: click it to count the rows of each group.

### Aggregations

Click the badge of a measure, or press `l`/`h`, to cycle through its aggregations. Which ones are available depends on the field's type:

| Field type | Aggregations |
|---|---|
| Integer, Float | Average, Sum, Count, Median, StdDev, StdDev Pop, Variance, Variance Pop, GeoMean, Minimum, Maximum, Mode, MAD, Skewness, Kurtosis, Product, First, Last |
| String, Date, Datetime, Time | Median, Minimum, Maximum, Mode, Count, First, Last |
| Boolean | Mode, Count, First, Last |

- **Distinct:** press `d`, or click the right edge of the badge, to aggregate distinct values only, for example to count distinct customers. A "D" marks distinct measures.
- **Duplicate:** press `c` to add the same field again with the next aggregation. This way you can show average and maximum side by side.

An aggregation cannot be changed while a chart uses the measure.

::: tip
Pie, donut and streamgraph charts show parts of a whole. They only accept **Sum** and **Count** (not distinct), because only these add up correctly.
:::

### Bivariate measures

Bivariate measures combine two fields, for example the correlation of price and quantity:

1. Preselect the first field: click the small dot at the left of its row, or press `Space`.
2. On the second field, press `m` or click the sum button.

The second field must be a number. If both fields are numbers, these aggregations are available: Correlation, Covariance, Covariance Pop, and the regression functions Regr Avg X, Regr Avg Y, Regr Count, Regr Intercept, Regr R², Regr Slope, Regr Sum X², Regr Sum X·Y and Regr Sum Y².

**Arg Minimum** and **Arg Maximum** also work when the first field is not a number. They return the value of the first field where the second field is smallest or largest, for example the product with the highest price.

### Custom measures

A custom measure computes a number from other measures, for example a margin `(sum_revenue - sum_cost) / sum_revenue` or revenue per order. Click **+** in the header of the **Measures** panel (**Add custom measure**), or press `+` in the list, to open the form:

1. **Name**: the name of the custom measure, for example `margin`.
2. **Model Measures**: the model's measures, including other custom measures. Click one to insert it into the expression.
3. **Ad-hoc Measures**: measures used only by this custom measure. Click **+** (**Add ad-hoc measure**) and pick an **Aggregation**, a **Field** (or **\* (rows)** to count rows) and, depending on the aggregation, a **Second field** or **Distinct**. Each gets a name automatically; click its pencil to rename it.
4. **Expression**: the formula, from measure names, numbers, the operators `+ - * /` and parentheses. A division by zero gives no value.

Every ad-hoc measure must appear in the expression. A custom measure may use other custom measures, but must not refer to itself, directly or through others.

With the keyboard, `Tab` moves to the measures of the form. Press and release `Shift` on a focused measure to insert it at the cursor.

In the list, a custom measure shows a **Custom** badge, and hovering it shows its expression. Press `Enter`, double-click the row or click the badge to edit it, and `Backspace` to remove it. Custom measures can be sorted like other measures. A measure that a custom measure uses cannot be removed, and its aggregation cannot be changed.

#### Narrowing ad-hoc measures by filters

An ad-hoc measure can be restricted to part of the data, for example revenue in region North only, to compute its share of the total. Use it like this:

1. Add a [filter](./filters-controls) on the field, for example `region`, and make it **local** (`Shift+G`), so it does not apply to all charts.
2. In the custom measure's form, click the filter button at the top right of the ad-hoc measure and pick the filter.

The ad-hoc measure then reads "where region", and it only aggregates the rows that pass the filter. Several filters are combined with *and*. Only local filters on the model's own fields can be used, not controls and not filters on transformed fields. Change the filter's selection in the **Filters** panel, and all charts with the custom measure update.

A filter that narrows an ad-hoc measure cannot be removed or made global.

## Sorting

Dimensions and measures can sort charts. Click the sort button on the left of a row to cycle through ascending, descending and off, or use the keys:

| Key | Action |
|---|---|
| `<` or `[` | Sort ascending |
| `>` or `]` | Sort descending |
| `o` / `Shift+O` | Change the priority of the sort |
| `u` | Remove the sort |

When several attributes are sorted, a number shows their priority.

## Static and dynamic attributes

When a model has filters or controls, dimensions and measures show a lock button (`Ctrl+L`):

- **Static** (locked): the attribute's range stays fixed when controls change. Bars keep their positions and axes keep their scales, so you can compare filter states.
- **Dynamic** (unlocked): the range adapts to the filtered data.

New dimensions with up to 100 values start as static.

The lock button in a view's control strip (`Ctrl+Shift+L`) switches between **All Dimensions Static** and **Dimensions As Configured** for the whole view.

::: tip
Static dimensions also make controls faster, because *undash* can pre-compute the results. See [Filters & Controls](./filters-controls#performance).
:::
