# Dashboards

A dashboard shows charts of a model on one canvas, with a title, a subtitle and a footer. A model can have as many dashboards as you like, for example one overview and one per region. Every chart is on exactly one dashboard.

Show the dashboard view with the dashboard button in the bottom bar or with `v` `d`. It shows one dashboard at a time.

## The Dashboards panel

The **Dashboards** panel at the bottom of the model view lists the model's dashboards. Each dashboard is a row that expands to the charts on it, newest first. When you open a model, all rows start collapsed. Click a row, or press `Enter`, `h` or `l`, to expand or collapse it.

Hovering or focusing a dashboard's row brings that dashboard onto the dashboard view. Focusing a chart row brings its dashboard on screen and highlights the chart. The dashboard currently on screen is shown in bold.

| Action | Button | Key |
|---|---|---|
| Add a dashboard | **+** in the panel header | `+` |
| Edit title, subtitle and reference | Pencil | `e` |
| Add charts with AI | Sparkles | `Ctrl+Shift+A` |
| Activate or deactivate | Check | `d` |
| Delete with its charts | × | `Backspace` |

The number next to a dashboard is its chart count. The × in the panel header deletes all dashboards with their charts.

### Adding a dashboard

Click **+** in the panel header (**Add dashboard**), or press `+` in the list. The new dashboard is named "Dashboard 01", "Dashboard 02" and so on, and becomes the dashboard on screen. If [Auto-labeling](./ai#automatic-features) is on, the AI gives it a title and a subtitle.

A model's first chart creates "Dashboard 01" automatically if the model has no dashboard yet.

### Editing a dashboard

Press `e` on a dashboard's row, or click its pencil, to open the dashboard form:

- **Title** and **Subtitle**, in each language of the app. Switch the language with the button next to the field. The title must not be empty.
- **Dashboard Reference**: the dashboard's internal name, used in its [kiosk link](#sharing-and-kiosk-mode). It uses lowercase letters, digits and single underscores, starts with a letter, and must be unique within the model.

Title and subtitle can also be edited in place on the dashboard.

### Active and inactive dashboards

Press `d` on a row, or click its check, to deactivate a dashboard. An inactive dashboard is shown dimmed. It is never shown on screen, in presentation mode or in a kiosk link, but its charts stay in the list and can still be edited. Use it for drafts or for dashboards you only need now and then.

### Deleting a dashboard

Press `Backspace` on a row, or click its ×. The dashboard's charts are deleted with it. An empty dashboard is deleted right away; a dashboard with charts asks first ("Delete Dashboard …?"). Press `Enter` to confirm or `Escape` to cancel.

## Switching dashboards

The dashboard view shows one dashboard at a time. To show another one:

- focus its row in the **Dashboards** panel,
- click the cycle button at the top right of the dashboard (**Next Dashboard**, `Shift`+click for the previous), or
- press `Ctrl+N` / `Ctrl+P` for the next or previous dashboard.

The cycle skips inactive dashboards.

## Adding and removing charts

A new chart is saved to the dashboard on screen. To move a chart to another dashboard, press `e` on it in the **Dashboards** panel and pick a different **Dashboard** in the chart form. The chart is appended to that dashboard's layout.

To hide a chart from its dashboard without deleting it, press `d` on it, or click its check button. Hidden charts are shown dimmed in the list.

A dashboard without charts stays in the list. The dashboard view shows its title and subtitle, ready for new charts.

## Title and subtitle

Each dashboard has a title and a subtitle at the top, which you can edit in place on the dashboard or in the [dashboard form](#editing-a-dashboard). The footer shows the date. In presentation mode, a line under the subtitle summarizes the active controls.

## Layout

### Moving charts

Drag a chart by its title to move it to another place in the layout. Press and hold a chart to move it together with the group of charts it belongs to. *undash* snaps the charts into rows and columns, so the layout stays tidy.

Pan the dashboard by dragging the empty canvas, and zoom with the mouse wheel or a pinch.

Click a chart's legend to move it to another corner of the chart.

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

Presentation mode shows the model's dashboards alone, without sidebar and toolbars. Enter it with the **Present Dashboard** button at the top left of the views, with `Ctrl+Shift+P`, or with `v` `p`. `Shift`+click the button to present in full screen right away. Leave with `Escape` or **Leave Presentation**.

When you enter presentation mode, *undash* prepares all dashboards first ("Loading Dashboard"). After that, switching between them is instant. Inactive dashboards and dashboards without charts are skipped.

### Moving through dashboards and charts

- `n` / `p` step to the next or previous dashboard.
- If a dashboard is larger than the screen, it is presented one chart at a time. `←` / `→` center the previous or next chart, and `h` `j` `k` `l` the chart to the left, below, above or right. Clicking a chart centers it.
- `←` / `→` continue across dashboards: past the last chart, they go on to the next dashboard. On a dashboard that fits the screen, they step straight to the previous or next dashboard.

The **Navigation** panel at the bottom center shows the dashboard's title between arrows (with two or more dashboards), and for a large dashboard the centered chart's name with a counter such as "(2/6)". Its arrows appear when you hover a row.

### The toolbar and panels

The toolbar at the top left holds **Leave Presentation**, **Share Dashboard**, **Data Overview** and **Full Screen** (`f`), and a button for each panel:

- **Filters**: the model's enabled controls. **Reset** (or `r`) resets all controls, and `1`–`9` jump to a control. Drag the panel wherever it fits.
- **Navigation**: the navigation panel described above.

Each panel button cycles through three modes: **auto** (shown when you move the mouse, hidden after two seconds of rest), **off** (never shown) and **on** (always shown). `c` cycles the mode of the Filters panel. The modes are remembered. Both panels start in auto mode.

After two seconds without input, the toolbar and the mouse pointer fade out as well. Move the mouse to bring them back.

### On a tablet

- The toolbar stays hidden until you tap in the top-left corner. The next tap presses a button.
- Swipe left or right to step to the next or previous dashboard. On a dashboard that is larger than the screen, swipe with two fingers.
- In the navigation panel, tap a row to show its arrows.
- In the Filters panel, tap a control's name to open or close it.

## Sharing and kiosk mode

**Share Dashboard**, next to the **Present Dashboard** button and also in presentation mode, opens the dashboard's **kiosk link** in a new tab. It looks like `https://…/?model=sales&dashboard=overview`. A kiosk link opens the model's dashboards directly in presentation mode, starting with the linked one, without a way back to the editor. Use it for wall displays or to hand over a laptop for a presentation. If the linked dashboard is inactive or no longer exists, the model's first active dashboard is shown.

::: warning
The kiosk link does not share any data. Because your data lives only in your browser, the link works only in the same browser on the same computer. To give a dashboard to someone else, send them a [project backup](./data#backing-up-a-project) or an export.
:::

## Exporting

Click the export button at the top right of the dashboard, or press `Ctrl+Shift+D` while the dashboard has the keyboard. The dashboard on screen, including title and footer, is exported as one file named `<model>_YYYYMMDD`.

The export [settings](./settings) define the result:

| Setting | Values |
|---|---|
| **Export File Type** | PDF and SVG (vector graphics), PNG and JPEG (images) |
| **Export Format** | *custom* (the dashboard's own size), A4, A3, A2, Letter, Legal, Tabloid |
| **Export Colors** | *mono* (black on white, for print) or *current* (the current theme's colors) |

A PDF looks like the dashboard on screen, including the [glass style](./settings#style). With *mono* colors, the chart boxes are printed flat.

::: tip
Choose the paper format first and then the layout template **Fit to Page Format**, so the dashboard fills the page.
:::
