# TapeNavigation Documentation

## Purpose
Provides Previous/Next controls for the tape preview modal and keeps navigation logic separated from UI.

## Files
- `TapeNavigation.jsx`
  - Renders the two buttons.
  - Reads `openTapePreview` and `setPreviewError` from `useHomePageStore`.
  - Uses small wrappers: `handlePrevious()` and `handleNext()`.
- `nextTapeHandler.js`
  - Handles next-navigation workflow:
    1. Validate current `previewTapeId`
    2. Call `fetchNextTape()`
    3. If returned id exists, call `openTapePreview(id)`
    4. Otherwise set user-facing preview error
- `previousTapeHandler.js`
  - Same workflow as next handler, but for previous tape.
- `previewNavigationApi.js`
  - API transport layer only.
  - `fetchNextTape(currentTapeId)` -> `POST /api/next-tape`
  - `fetchPreviousTape(currentTapeId)` -> `POST /api/previous-tape`
  - Returns normalized shape:
    - `{ id: number | null, message: string }`

## Data Flow
1. User clicks `Previous` or `Next`.
2. `TapeNavigation.jsx` calls corresponding handler.
3. Handler calls API helper.
4. If id is returned, handler calls `openTapePreview(newId)`.
5. If no id or request fails, handler calls `setPreviewError(...)` so error shows in modal UI.

## Notes
- Keep UI in `TapeNavigation.jsx`.
- Keep orchestration/error handling in handler files.
- Keep raw HTTP request code in `previewNavigationApi.js`.
