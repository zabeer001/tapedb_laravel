import React from "react";

export default function HomePageTableFooter({ visibleCount, totalCount }) {
  return (
    <div className="px-4 sm:px-5 py-4 border-t border-base-300 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="text-xs text-base-content/60">
        Showing <span className="font-semibold text-base-content">{visibleCount}</span> of{" "}
        <span className="font-semibold text-base-content">{totalCount}</span> results
      </div>
      <div className="text-xs text-base-content/60">
        Scroll down for next page, scroll up for previous page.
      </div>
    </div>
  );
}
