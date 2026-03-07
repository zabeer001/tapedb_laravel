# HomePageTapePreviewModal Documentation

## Purpose
Shows detailed tape information in an overlay modal, with a zoomable image viewer.

Entry file:
- `HomePageTapePreviewModal.jsx`

## Component Split
The modal is intentionally broken into smaller files under:
- `_compoennts/` (note: folder name is currently spelled `_compoennts`)

Subcomponents:
- `PreviewHeader.jsx`: title + entry number + close button
- `PreviewImageGallery.jsx`: thumbnail grid (missing images omitted)
- `PreviewDetailsTable.jsx`: key/value metadata rows + QA chip
- `PreviewStatus.jsx`: loading/error states
- `PreviewZoomOverlay.jsx`: full-screen image zoom with prev/next/close
- `previewUtils.js`: helpers (title, details, image list, truthy parsing)

## Behavior
1. Reads modal state from `useHomePageStore`
2. If closed -> returns `null`
3. If open:
   - shows backdrop blur
   - renders details card + image thumbnails
   - clicking a thumbnail opens zoom overlay
4. Zoom overlay supports:
   - close (`X`)
   - backdrop close
   - previous/next navigation
   - current image index display

## Data Inputs
From store:
- `isPreviewOpen`
- `previewTapeId`
- `previewTape`
- `previewLoading`
- `previewError`
- `closeTapePreview()`
- `retryTapePreview()`

## Styling and Layering
Z-index strategy:
- preview backdrop: `z-[200]`
- preview modal content: `z-[210]`
- zoom overlay: `z-[220]`

This keeps preview and zoom above the site navbar.

## Extending Safely
- Add/rename detail fields in `buildPreviewDetails()` inside `previewUtils.js`
- Change thumbnail layout in `PreviewImageGallery.jsx`
- Change zoom controls in `PreviewZoomOverlay.jsx`
- Keep hooks (`useState`, `useMemo`) at top level of `HomePageTapePreviewModal.jsx` to avoid hook-order errors
