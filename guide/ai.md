# AI Assistant

The AI assistant proposes models, charts and dashboards for your data. It works with your own API key from **OpenAI** or **Anthropic**.

## Setting up

1. Open the app settings with the gear icon at the top of the sidebar, or press `Ctrl+Shift+,`.
2. Under **AI Assistant**, choose the **AI Provider**: OpenAI or Anthropic.
3. Enter the **OpenAI API Key** or **Anthropic API Key**.
4. Click **Update**.

Your key is stored only in this browser's local storage. Requests go straight from your browser to the provider; there is no *undash* server in between. Usage is billed to your account with the provider.

## What is shared with the AI

*undash* never sends the rows of your data. For each column, the AI receives:

- the column's name (or its [alias](./fields-transforms#aliases)) and type,
- statistics such as the number of distinct values, missing values and the range, and
- with **Share category values** turned on (the default), up to twelve example values of categorical columns.

::: warning
Category values may contain names or other personal data. Turn off **Share category values** if they must not leave your machine. The AI then sees only the statistics.
:::

## Proposing a dashboard

Open a table, so that a new model without dimensions or measures is shown. Then click the sparkles button in the header of the **Dashboards** panel (**Propose model and dashboard with AI**), or press `Ctrl+Shift+A`. The button appears once an API key is set.

While the AI works, *undash* shows "Analyzing Schema, Preparing Charts". Then the **Dashboard Proposal** opens:

- **Name of Model**: the name of the model to create.
- A summary of the proposed dimensions, measures and transforms.
- **Title**, **Subtitle** and **Dashboard Reference** of the new dashboard, proposed by the AI. Change them as you like.
- **Charts**: the proposed charts, each with its type and channels. Uncheck the charts you don't want.

Click **Save** to create the model with its dashboard and charts, or **Cancel** to discard the proposal. Nothing is saved before you confirm.

When the model already has dimensions or measures, the same button (**Propose a new dashboard with AI**, `Ctrl+Shift+A`) proposes another dashboard for it. The existing dashboards stay as they are.

## Proposing charts

To add charts to an existing dashboard, focus its row in the **Dashboards** panel and click its sparkles button (**Add charts with AI**), or press `Ctrl+Shift+A` on the row. The **Chart Proposal** lists only the charts, and works like the dashboard proposal. The new charts are added to that dashboard.

## Automatic features

Two options in the settings run the AI without asking:

| Option | What it does |
|---|---|
| **Auto-modeling** | After a table is imported, the AI proposes a model and dashboard for it. You review the proposal as above. |
| **Auto-labeling** | After a chart is saved, the AI gives it a title. A dashboard you add by hand gets a title and subtitle the same way. |

Both are off by default.

## Errors

| Message | What to do |
|---|---|
| "Add the API key of the selected AI provider in the settings first!" | Enter a key for the selected provider. |
| "The AI provider rejected the API key." | Check the key in the settings. |
| "No answer from the AI provider reached the browser." | Check your network connection. |
| "The AI answer was cut off." / "The AI answer could not be read." | Try again. |
| "None of the proposed charts could be built." | Try again, or add dimensions and measures by hand. |
