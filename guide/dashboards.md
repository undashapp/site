# Dashboards

Every model has one dashboard. It shows all of the model's saved charts on one canvas, with a title and a footer. Show it with the dashboard button in the bottom bar or with `v` `d`.

## Adding and removing charts

Every chart you save appears on the dashboard. To hide a chart from the dashboard without deleting it, press `d` on it in the **Charts** panel, or click its check button. Hidden charts are shown dimmed in the list.

## Title and subtitle

The dashboard has a title and a subtitle at the top, which you can edit in place on the dashboard. The footer shows the date. In presentation mode, a line under the subtitle summarizes the active controls.

## Layout

### Moving charts

Drag a chart by its title to move it to another place in the layout. Press and hold a chart to move it together with the group of charts it belongs to. *undash* snaps the charts into rows and columns, so the layout stays tidy.

Pan the dashboard by dragging the empty canvas, and zoom with the mouse wheel or a pinch.

### Layout templates

Instead of arranging charts by hand, pick a layout template in the dashboard's controls at the top right:

| Template | Arrangement |
|---|---|
| **One Axis, One-Sided** | The charts line up along one axis, all on the same side of it. |
| **One Axis, Two-Sided** | The charts line up along one axis, alternating on either side of it. |
| **Zig-Zag** | A staircase with one step per chart, from the largest chart in the top left. |
| **Two Axes** | Two parallel axes, with the charts dealt evenly over the three strips they create. |
| **Fit to Page Format** | The most compact arrangement with the proportions of the export paper format (4:3 if there is none). |
| **Custom Arrangement** | Your own arrangement by drag and drop. |

Most templates order the charts by size. Switch between **Largest First** and **Smallest First**, and use **Rotate Layout** to turn the template by 90 degrees.

| Key | Action |
|---|---|
| `Ctrl+Y` / `Ctrl+Shift+Y` | Next / previous template |
| `Ctrl+O` | Largest or smallest first |
| `Ctrl+Shift+O` | Rotate the layout |

### Proportions

The proportions button (`Ctrl+Alt+A`) decides how the dashboard sizes its charts:

- **Proportions As Set**: follow the view's aspect ratio setting.
- **Keep Chart Proportions**: every chart keeps its own proportions.
- **Stretch Charts To Fill**: charts are stretched to fill the space.

The whitespace slider in the view controls sets the gap between charts. See [View controls](./charts#view-controls).

## Controls and locking

All [controls](./filters-controls) of the model filter the charts of the dashboard as you change them. The lock button at the top right (`Ctrl+Shift+L`) makes all dimensions static, so charts keep their axes and colors while viewers filter. It is on by default for the dashboard.

## Presentation mode

Presentation mode shows the dashboard alone, without sidebar and toolbars. Enter it with the **Present Dashboard** button at the top left of the views, with `Ctrl+Shift+P`, or with `v` `p`. `Shift`+click the button to present in full screen right away. Leave with `Escape` or **Leave Presentation**.

In presentation mode:

- The **Filters** panel shows the model's enabled controls. Open or close it with `c`, and drag it wherever it fits. **Reset** (or `r`) resets all controls. `1`–`9` jump to a control.
- `f` switches to full screen (**Full Screen** / **Leave Full Screen**).
- If the dashboard is larger than the screen, it is presented one chart at a time: `←`/`→` or **Previous Chart** / **Next Chart** move through the charts, and clicking a chart centers it.
- After two seconds without input, the toolbars and the mouse pointer fade out. Move the mouse or press a key to bring them back.

## Sharing and kiosk mode

**Share Dashboard**, next to the **Present Dashboard** button and also in presentation mode, opens the dashboard's **kiosk link** in a new tab. It looks like `https://…/?model=sales`. A kiosk link opens the dashboard directly in presentation mode, without a way back to the editor. Use it for wall displays or to hand over a laptop for a presentation.

::: warning
The kiosk link does not share any data. Because your data lives only in your browser, the link works only in the same browser on the same computer. To give a dashboard to someone else, send them a [project backup](./data#backing-up-a-project) or an export.
:::

## Exporting

Click the export button at the top right of the dashboard, or press `Ctrl+Shift+D` while the dashboard has the keyboard. The whole dashboard, including title and footer, is exported as one file named `<model>_YYYYMMDD`.

The export [settings](./settings) define the result:

| Setting | Values |
|---|---|
| **Export File Type** | PDF and SVG (vector graphics), PNG and JPEG (images) |
| **Export Format** | *custom* (the dashboard's own size), A4, A3, A2, Letter, Legal, Tabloid |
| **Export Colors** | *mono* (black on white, for print) or *current* (the current theme's colors) |

::: tip
Choose the paper format first and then the layout template **Fit to Page Format**, so the dashboard fills the page.
:::
