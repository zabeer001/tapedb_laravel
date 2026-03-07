import React from "react";

export default function HomePageTableTopBar({
  totalCount,
  loadedStartPage,
  loadedEndPage,
  totalPages,
}) {
  const pageLabel =
    loadedStartPage === loadedEndPage
      ? `Page ${loadedStartPage}`
      : `Pages ${loadedStartPage}-${loadedEndPage}`;

  return (
    <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Results</span>
        <span className="badge badge-ghost badge-sm">{totalCount}</span>
      </div>
      <div className="text-xs text-base-content/60">
        {pageLabel} / {totalPages}
      </div>
    </div>
  );
}
