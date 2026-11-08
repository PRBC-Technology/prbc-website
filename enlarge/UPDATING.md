# Updating the Enlarge total

Add a new row to `enlarge/progress.csv` each time the total changes. Keep the existing rows so the chart retains its history:

```csv
amount_aud,updated_at
25000,2026-10-30
35000,2026-11-08
```

Enter the cumulative total in Australian dollars without a dollar sign or comma. Use a unique date in YYYY-MM-DD format. The chart expands to include dates outside the campaign if needed. Rows are plotted in date order, and the most recent date determines the displayed total. Save the file, then publish it with the website; local edits alone do not update the live site.
