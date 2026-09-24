# Keyboard Shortcuts

*undash* is built to be used with the keyboard. Most lists use Vim-style keys: `j`/`k` move down and up, `h`/`l` change a value.

::: info
`Ctrl` means the Control key on every platform, including macOS. `Shift+X` is written for capital letters: `Shift+F` is the same as `F`.
:::

Single-letter shortcuts don't fire while you type in a text field.

## Global

| Key | Action |
|---|---|
| `Ctrl+T` | Move the keyboard between sidebar and DB console |
| `Ctrl+,` | Open or close the settings strip |
| `Ctrl+Shift+,` | Open the app settings |
| `Ctrl+C` | Show or hide the DB console |
| `Ctrl+Shift+P` | Enter or leave presentation mode |

### View commands

Press `v`, then a letter:

| Keys | Action |
|---|---|
| `v` `f` | Full screen: hide the sidebar, and back |
| `v` `t` | Show or hide the DB console |
| `v` `c` | Show or hide the chart view |
| `v` `d` | Show or hide the dashboard |
| `v` `b` | Hand the keyboard to the other view |
| `v` `s` | Swap the two views |
| `v` `m` | Cycle the arrangement: top/bottom, left/right, floating |
| `v` `p` | Enter or leave presentation mode |

## Data overview

| Key | Action |
|---|---|
| `/` | Focus the search field and clear it |
| `Ctrl+K` | Focus the search field |
| `Enter` (in search) | Open the first hit |
| `Escape` (in search) | Clear the search |
| `Ctrl+N` | New model |
| `Ctrl+Shift+N` | New remote table |
| `j` / `k`, `↓` / `↑` | Next / previous item |
| `Tab` / `Shift+Tab` | Next / previous list |
| `Enter` | Open the model or table |
| `e` | Edit |
| `d` | Export |
| `Ctrl+Shift+D` | Delete |
| `Ctrl+R` | Refresh statistics (remote tables) |

## Model view

| Key | Action |
|---|---|
| `s` | Save the model |
| `q` | Close the model |
| `p` | Switch the field statistics |
| `x` | Turn sampling on or off |
| `Ctrl+Shift+M` | Materialize the model |
| `Ctrl+Shift+C` | Link the DB console to the model |
| `Ctrl+Shift+A` | Propose a dashboard or charts with AI |
| `Ctrl+S` | Save the current chart |
| `Ctrl+Shift+S` | Save the current chart with a name |
| `g` + letter | Jump to a panel: `f` Fields, `t` Transforms, `w` Filters, `o` Controls, `d` Dimensions, `m` Measures, `s` chart selector, `c` Chart Configurator, `l` Charts |

### Fields

| Key | Action |
|---|---|
| `Enter` | Default action |
| `e` | Edit the alias |
| `t` / `Shift+T` | Add a transform / remove all transforms |
| `f` / `Shift+F` | Add / remove a filter |
| `Ctrl+F` / `Ctrl+Shift+F` | Add / remove a control |
| `d` / `Shift+D` | Add / remove a dimension |
| `Ctrl+D` | Add a transform as dimension |
| `m` / `Shift+M` | Add a measure / remove all measures |
| `Space` | Preselect for a bivariate measure |

### Transforms

| Key | Action |
|---|---|
| `l` / `h` | Next / previous option |
| `Shift+L` / `Shift+H` | Next / previous transform type |
| `e` | Edit categories (Group) |
| `d` / `Shift+D` | Add / remove dimension |
| `Backspace` | Remove |

### Dimensions and measures

| Key | Action |
|---|---|
| `l` / `h` | Next / previous aggregation (measures) |
| `d` | Distinct on or off (measures) |
| `c` | Duplicate with the next aggregation (measures) |
| `<` `[` / `>` `]` | Sort ascending / descending |
| `o` / `Shift+O` | Change sort priority |
| `u` | Remove sort |
| `Ctrl+L` | Static or dynamic |
| `Backspace` | Remove |

### Filters and controls

| Key | Action |
|---|---|
| `Enter` / `e` | Open the form |
| `d` / `Shift+Enter` | Turn on or off |
| `n` / `Shift+N` | Cycle null handling |
| `Shift+G` | Global or local |
| `r` | Reset |
| `Backspace` | Remove |
| `Escape` (in form) | Close the form |
| `Ctrl+J` / `Ctrl+K` (in form) | Next / previous filter |

### Chart configurator

| Key | Action |
|---|---|
| `h` / `l` (chart strip) | Previous / next chart type |
| `Shift+H` / `Shift+L` (chart strip) | Previous / next compatible chart type |
| `c` + letters (chart strip) | Jump to a chart type by name, e.g. `c` `bal` for Balloon |
| `h` / `l` (configurator row) | Previous / next chart type |
| `Shift+H` / `Shift+L` (configurator row) | Previous / next channel layout |
| `h` / `l` (channel) | Previous / next attribute |
| `t` (channel) | Swap x and y, or row and column |
| `Backspace` (channel) | Clear an optional channel |
| `Escape` | Stop editing |

### Charts

| Key | Action |
|---|---|
| `e` | Rename |
| `u` | Load into the configurator |
| `d` | Show on or hide from the dashboard |
| `Enter` | Show the chart's filter and control assignments |
| `Backspace` | Delete |

## Views

| Key | Action |
|---|---|
| `Ctrl+1` / `Ctrl+2` | Focus the first / second view |
| `Ctrl+=` / `Ctrl+-` / `Ctrl+0` | Increase / decrease / reset the chart scale |
| `Ctrl+Shift+=` / `Ctrl+Shift+-` / `Ctrl+Shift+0` | Increase / decrease / reset the font scale |
| `Ctrl+Alt+Shift+=` / `-` / `0` | Increase / decrease / reset the whitespace |
| `Ctrl+Z` / `Ctrl+Shift+Z` | Next / previous resize mode |
| `Ctrl+A` | Keep the aspect ratio on or off |
| `Ctrl+R` | Switch the view reference: square or rectangle |
| `Ctrl+G` | Switch how the view fits its box: layout or drawing |
| `Ctrl+Shift+L` | Lock or unlock all dimensions of the view |
| `Ctrl+Shift+D` | Export the focused view |

### Dashboard

| Key | Action |
|---|---|
| `Ctrl+Y` / `Ctrl+Shift+Y` | Next / previous layout template |
| `Ctrl+O` | Switch the template's order: largest or smallest first |
| `Ctrl+Shift+O` | Rotate the template |
| `Ctrl+Alt+A` | Cycle the dashboard's proportions |

## DB console

| Key | Action |
|---|---|
| `Ctrl+N` | Create a model from the query |
| `Ctrl+I` | Show the last error |
| `Tab` | Move between editor and results |
| `h` / `l`, `←` / `→` | Scroll by column |
| `↑` / `↓` | Scroll by row |
| `j` / `k` | Scroll half a page |

## Presentation mode

| Key | Action |
|---|---|
| `c` | Open or close the Filters panel |
| `1`–`9` | Focus a control |
| `j` / `k` | Next / previous control |
| `Enter` / `Escape` | Open / collapse a control |
| `r` | Reset all controls |
| `f` | Full screen |
| `←` / `→` | Previous / next chart (large dashboards) |
| `Escape` | Leave presentation mode |
| `q` | Close the model |

## Forms

| Key | Action |
|---|---|
| `Escape` | Close the form |
| `Tab` | Next field |
