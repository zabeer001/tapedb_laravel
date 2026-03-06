import React from "react";
import useHomePageStore, { selectHomePageResultState } from "../_store/useHomePageStore";

export default function HomePagePagination() {
  const { visibleCount, filteredCount, safePage, totalPages } = useHomePageStore(selectHomePageResultState);
  const prevPage = useHomePageStore((state) => state.prevPage);
  const nextPage = useHomePageStore((state) => state.nextPage);
  const totalCount = filteredCount;

  return (
    <div className="px-4 sm:px-5 py-4 border-t border-base-300 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="text-xs text-base-content/60">
        Showing <span className="font-semibold text-base-content">{visibleCount}</span> of{" "}
        <span className="font-semibold text-base-content">{totalCount}</span> results
      </div>

      <div className="join">
        <button className="btn btn-sm join-item" disabled={safePage <= 1} onClick={prevPage}>
          Prev
        </button>
        <button className="btn btn-sm join-item btn-ghost pointer-events-none">{safePage}</button>
        <button className="btn btn-sm join-item" disabled={safePage >= totalPages} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
