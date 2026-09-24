# What is undash?

*undash* is a business intelligence tool that runs entirely in your browser. You load a data file, and *undash* turns it into charts and interactive dashboards. There is no backend, no upload and no account: the data stays on your machine.

Under the hood, *undash* uses [DuckDB](https://duckdb.org), an analytical SQL database compiled to WebAssembly. Every query runs locally in your browser tab, even on files with millions of rows.

## How undash is organized

Everything in *undash* builds on four kinds of objects:

| Object | What it is |
|---|---|
| **Table** | A data file you imported, such as a CSV or Parquet file. Tables are read-only. |
| **Model** | A named SQL query over one or more tables (or other models). A model holds everything you build on top of the data. |
| **Chart** | A visualization of a model, built from the model's dimensions and measures. |
| **Dashboard** | The arrangement of a model's charts on one canvas. Every model has exactly one dashboard. |

Inside a model, you shape the data before you chart it:

- **Fields** are the columns of the model's query.
- **Transforms** derive new fields, for example bins, date parts or the top N categories.
- **Dimensions** are the fields you group by.
- **Measures** are aggregations such as sums, averages or counts.
- **Filters** restrict the data a model shows, and **controls** are interactive filters that viewers can change on the dashboard.

## Requirements

*undash* needs a larger screen: a desktop, laptop or tablet (iPads work) with a recent version of Chrome, Firefox, Safari or Edge. Phones are not supported.

The first launch needs an internet connection to download the DuckDB engine, which is about 35 MB. After that, *undash* also works offline. See [Privacy, Storage & Offline](./privacy-storage).

## Where to go next

- New to *undash*? Start with [First Steps](./getting-started). It takes you from a data file to a dashboard in a few minutes.
- For a tour of the screen, read [The Interface](./interface).
- The remaining chapters describe each part of the app in detail.
