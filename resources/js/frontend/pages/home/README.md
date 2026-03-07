# Home Page Documentation

## Purpose
This folder contains the full frontend Home page for browsing tape records.

Main entry:
- `HomePage.jsx`

State source:
- `_store/useHomePageStore.js` (Zustand store)

## Page Composition
`HomePage.jsx` renders these blocks in order:
1. `HomePageHeader`
2. `HomePageFilters`
3. `HomePageTable`
4. `HomePageTapePreviewModal`

## Data Flow
On first mount (`HomePage.jsx`):
1. `loadStats()` is called for global counters
2. `loadTapes()` is called for paginated table rows

Store/API responsibilities:
- `GET /api/tapes/stats` -> totals used in header stats
- `GET /api/tapes?page=...&per_page=...` -> paginated row data
- `GET /api/tapes/{id}` -> preview modal details for one tape

## Folder Structure
- `_components/HomePageHeader.jsx`: top title + stat cards (Total / Screener / First Print)
- `_components/HomePageFilters.jsx`: search + QA filter controls
- `_components/HomePageTable/...`: table, row/head/footer, infinite-scroll pagination hook
- `_components/HomePageTapePreviewModal/...`: preview modal and image zoom UI
- `_components/cells/PosterCell.jsx`: poster + title + badges (`FIRST PRINT`, `SCREENER`)
- `_components/ui/Chip.jsx`: reusable badge chip
- `_store/useHomePageStore.js`: all state/actions/network calls
- `_utils/tapeMapper.js`: backend tape -> UI row mapping/normalization

## Notes
- Table pagination is scroll-driven, not button-driven.
- Stats are intentionally split into a separate API call so pagination requests stay lighter.
- `HomePagePagination.jsx` exists but is not currently used in `HomePage.jsx`.

## Common Changes
- Add a new filter:
  - UI: `HomePageFilters.jsx`
  - state+request param: `useHomePageStore.js`
  - backend handling: Tape API index/stats services
- Add a new visible table field:
  - mapper: `_utils/tapeMapper.js`
  - table head/row: `_components/HomePageTable/_components/*`
- Add preview field:
  - utils detail list: `HomePageTapePreviewModal/_compoennts/previewUtils.js`
