# Chart Types

*undash* offers 21 chart types. For each type, this page lists its channels. Required channels are marked with `*`, like in the configurator.

Every chart type also accepts the optional channels `row` and `col` for [small multiples](./charts#small-multiples). They are not repeated in the tables below.

::: info Dimensions or measures?
Some charts plot **dimensions** directly, without aggregation: every data point becomes a mark (Scatter, Density, Tick). Others plot **measures**, one mark per group (Column, Line, Pie). The tables tell you which is which.
:::

## Comparing categories

### Column Chart

Vertical bars, one per category.

| Channel | Takes |
|---|---|
| `x`* | A dimension: categories, whole numbers or dates. Top N and Bottom N work here. |
| `y_max`* | A measure: the height of the bar. |
| `y_min` | A measure. Turns the bars into floating bars from `y_min` to `y_max`. |
| `color` | A dimension. |

The `color` channel works automatically:

- With the same dimension as `x`, each bar gets its own color.
- With a different dimension and a **Sum** or **Count** measure, the bars are **stacked**.
- For other measures, and for floating bars, the color channel is ignored, because the values cannot be stacked.

### Bar Chart

Horizontal bars. Same as the Column Chart with the axes swapped: `y`* for the categories, `x_max`* and `x_min` for the measures, and `color`.

### Lollipop Chart and Horizontal Lollipop Chart

Like the Column and Bar Chart, drawn as a line with a dot. With `y_min` (or `x_min`), they show ranges as dumbbells. They have no `color` channel.

### Balloon Chart

A grid of circles for two categorical dimensions, for example product by region.

| Channel | Takes |
|---|---|
| `x`*, `y`* | Categorical dimensions. |
| `r`* | A measure: the size of the circles. |
| `color` | A dimension. |

### Radar Chart

One spoke per category, one polygon per series. Good for profiles, such as scores in several disciplines.

| Channel | Takes |
|---|---|
| `angle`* | A dimension: the spokes. Top N and Bottom N work here. |
| `r`* | A measure: the distance from the center. Sort it to order the spokes by value. |
| `color` | A dimension: one polygon per category. |

### KPI

A single big number, such as the total revenue.

| Channel | Takes |
|---|---|
| `text`* | A measure. |

Use `row` or `col` to show a KPI tile per category.

## Parts of a whole

### Pie Chart and Donut Chart

Slices of a circle. The Donut Chart is a pie with a hole.

| Channel | Takes |
|---|---|
| `color`* | A dimension: the slices. Top N and Bottom N work here. |
| `angle`* | A **Sum** or **Count** measure: the size of the slices. |

Slices are labeled when there is room; the legend is then hidden.

## Changes over time

### Line Chart

| Channel | Takes |
|---|---|
| `x`* | A dimension: dates, times or numbers. Use a [Date Bin](./fields-transforms#date-bin) transform for monthly or yearly lines. |
| `y`* | A measure. |
| `color` | A dimension: one line per category. |

Lines with very many points are thinned out to what the screen can show, without losing peaks.

### Area Chart

Same channels as the Line Chart. Several series overlap on a common baseline; they are not stacked.

### Streamgraph

Same channels as the Area Chart, but the series are stacked around a flowing center line. `y`* needs a **Sum** or **Count** measure.

### Connected Scatter Chart

Points connected in order, for example how price and quantity moved over the years.

| Channel | Takes |
|---|---|
| `x`*, `y`* | Measures. |
| `z`* | An ordered dimension, such as years or a Date Bin: the order in which the points are connected. Points are labeled with it. |
| `color` | A dimension. |

## Relationships

### Scatter Chart

One point per data point.

| Channel | Takes |
|---|---|
| `x`*, `y`* | Numeric or date **dimensions** (not aggregated). |
| `color` | A dimension. |

With very many points, points that fall on the same pixel are combined, and their opacity shows how many there are.

### Bubble Chart

One bubble per category, placed by two measures.

| Channel | Takes |
|---|---|
| `x`*, `y`* | Measures. |
| `z`* | A categorical dimension: one bubble per category, labeled with it. |
| `r` | A measure: the size of the bubbles. May repeat `x` or `y`. |
| `color` | A dimension. |

### 2D Density Chart

A smoothed density of points in two dimensions. Useful when a scatter chart has too many points to read.

| Channel | Takes |
|---|---|
| `x`*, `y`* | Numeric or date dimensions. |
| `color` | A dimension: one density per category. |

## Distributions

### Histogram

| Channel | Takes |
|---|---|
| `x`* | A **bin index** dimension from a [Bin](./fields-transforms#bin) transform. |
| `y`* | A measure, usually **Count**. |
| `color` | A dimension. |

Change the number of bins on the Bin transform's badge.

### Density Chart

A smoothed curve of the distribution of one dimension.

| Channel | Takes |
|---|---|
| `x`* | A numeric or date dimension. |
| `color` | A dimension: one curve per category. |

### Tick Chart

One tick mark per data point along an axis, optionally in one row per category.

| Channel | Takes |
|---|---|
| `x`* | A numeric or date dimension. |
| `y` | A categorical dimension. |

### Heatmap

A grid of cells for two binned dimensions.

| Channel | Takes |
|---|---|
| `x`*, `y`* | **Bin index** dimensions from [Bin](./fields-transforms#bin) transforms. |
| `opacity` | A measure: the shade of each cell. |

## Maps

### Map

A choropleth map: regions shaded by a measure.

| Channel | Takes |
|---|---|
| `region`* | A dimension with a [Geo](./fields-transforms#geo) transform. |
| `opacity`* | A measure: the shade of each region. |

The map zooms to the regions in the data and always keeps its geographic proportions. The supported regions are countries, US states, German Bundesländer and German Landkreise. Regions are matched by their **codes**, not by their names:

| Region | Codes | Also accepted |
|---|---|---|
| Countries | ISO 3166-1 alpha-2 (`DE`) | alpha-3 (`DEU`) and IOC codes |
| US States | USPS codes (`CA`), 50 states and DC | |
| Bundesländer | Two-digit AGS (`08`) | `8`, letter codes like `BW` or `DE-BW` |
| Landkreise | Five-digit AGS (`08111`) | Numbers without the leading zero |

Codes are matched regardless of case and surrounding spaces. The column must be a **String** column. If your codes are stored as numbers, cast them in the model's query, for example `CAST(ags AS VARCHAR) AS ags`.

## Limits

- A categorical dimension can be used on an axis, as color or for small multiples only if it has fewer than **100** categories after filters.
- A chart that is too small for its content shows a hatched area instead. Make the view larger, reduce the [font scale](./charts#view-controls), or reduce the number of categories.
- A chart without data shows "No Data".
