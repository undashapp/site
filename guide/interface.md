# The Interface

```
┌──────────────┬─────────────────────────────────────────────┐
│ Settings     │                                             │
├──────────────┤                                             │
│              │        Views                                │
│   Sidebar    │        (chart view and / or dashboard)      │
│              │                                             │
│ Data         │                                             │
│ Overview     │                                  ┌────────┐ │
│ or           │                                  │controls│ │
│ Model View   │                                  └────────┘ │
├──────────────┴─────────────────────────────────────────────┤
│  DB Console (SQL editor + results, can be hidden)          │
├────────────────────────────────────────────────────────────┤
│  Bottom bar                                                │
└────────────────────────────────────────────────────────────┘
```

## Sidebar

The sidebar on the left has two states:

- The **data overview** is shown while no model is open. It holds the **Data Files** box for imports, the **Search** field, and the lists of **Models** and **Tables**. See [Importing Data](./data).
- The **model view** is shown while a model is open. It holds the panels of the model, from its query down to its charts. See [Models & SQL](./models).

At the top of the sidebar are the app title, the [settings strip](./settings#settings-strip) and the gear icon for the [app settings](./settings#app-settings).

Navigate the sidebar with `j`/`k` (or `↓`/`↑`) within a list and `Tab` between lists.

## Views

The main area shows up to two views:

- The **chart view** shows the chart you are building in the chart configurator.
- The **dashboard** shows all charts of the model. See [Dashboards](./dashboards).

Both can be shown at once. They then share the area in one of three arrangements: split top/bottom, split left/right, or with one view floating on top of the other. Drag the divider between split views to resize them. A floating view can be moved with its grip and resized from its bottom-right corner.

Each view has its own control strip in its bottom-right corner (see [View controls](./charts#view-controls)). `Ctrl+1` and `Ctrl+2` hand the keyboard to the first or second view.

## Bottom bar

The bar at the bottom of the window, from left to right:

| Button | Action | Key |
|---|---|---|
| Sidebar | Show or hide the sidebar | `v` `f` |
| DB Console | Show or hide the SQL console | `Ctrl+C` or `v` `t` |
| Chart view | Show or hide the chart view | `v` `c` |
| Dashboard | Show or hide the dashboard | `v` `d` |
| Arrangement | Cycle the arrangement of the two views (`Shift`+click: backwards) | `v` `m` |
| Swap | Swap the two views | `v` `s` |

The arrangement and swap buttons appear only while both views are shown. At least one view is always visible.

## DB console

The DB console is a SQL editor with a result table, below the views. It runs queries as you type. See [The DB console](./models#the-db-console).

## Notifications

Messages appear as notifications (toasts), for example when a file was loaded, a model was saved or something went wrong. Errors that block an action, such as deleting a table that a model still uses, are explained there as well.
