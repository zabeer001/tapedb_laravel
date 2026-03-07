# HomePageTable Documentation

## Purpose
Renders the tape list table, empty/loading/error states, and scroll-based pagination behavior.

Entry file:
- `HomePageTable.jsx`

## Component Structure
- `HomePageTable.jsx`: orchestrates top bar, `<table>`, body states, footer
- `_components/HomePageTableHead.jsx`: responsive column headers
- `_components/HomePageTableDataRow.jsx`: one data row + view action
- `_components/HomePageTableStatusRow.jsx`: loading/error/empty row
- `_components/HomePageTableTopBar.jsx`: results/page range summary
- `_components/HomePageTableFooter.jsx`: visible vs total + scroll hint
- `useHomePageTableScrollPagination.js`: infinite pagination by scroll direction

## Data and Actions (Store)
Read from `useHomePageStore`:
- `rows`, `loading`, `error`
- `page`, `loadedStartPage`, `loadedEndPage`, `totalPages`, `totalCount`
- `hasNextPage`, `hasPrevPage`

Actions used:
- `loadTapes(page)` (retry path)
- `loadNextPage()`, `loadPrevPage()` (scroll hook)
- `resetFilters()`
- `openTapePreview(id)` (view button)

## Responsive Strategy
- Mobile keeps the table minimal: tape id, poster/title cell, view action
- Extra columns appear progressively with breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`)
- QA column chip colors:
  - green for QA
  - yellow for Not QA

## Row Design Notes
`HomePageTableDataRow.jsx` uses:
- `PosterCell` for title + poster + `FIRST PRINT` / `SCREENER` badges
- `Chip` for QA status
- DaisyUI button for the eye/view action

## Pagination Hook Behavior
`useHomePageTableScrollPagination.js`:
- detects near-bottom scroll -> loads next page
- detects near-top upward scroll -> loads previous page
- repositions scroll to middle after page insertion
- keeps only a limited page window in memory (managed in store)

## Common Changes
- Add/remove a column:
  1. update `HomePageTableHead.jsx`
  2. update matching cell in `HomePageTableDataRow.jsx`
  3. update `colSpan` in `HomePageTableStatusRow.jsx` if needed
- Change view action behavior:
  - update `onOpenPreview` usage in `HomePageTableDataRow.jsx`
