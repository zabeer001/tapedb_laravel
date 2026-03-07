import React from "react";
import useHomePageStore from "../_store/useHomePageStore";

export default function HomePagePagination() {
  const rows = useHomePageStore((state) => state.rows);
  const page = useHomePageStore((state) => state.page);
  const totalPages = useHomePageStore((state) => state.totalPages);
  const totalCount = useHomePageStore((state) => state.totalCount);
  const hasPrevPage = useHomePageStore((state) => state.hasPrevPage);
  const hasNextPage = useHomePageStore((state) => state.hasNextPage);
  const prevPage = useHomePageStore((state) => state.loadPrevPage);
  const nextPage = useHomePageStore((state) => state.loadNextPage);

  return (
    <div className="px-4 sm:px-5 py-4 border-t border-base-300 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="text-xs text-base-content/60">
        Showing <span className="font-semibold text-base-content">{rows.length}</span> of{" "}
        <span className="font-semibold text-base-content">{totalCount}</span> results
      </div>

      <div className="join">
        <button className="btn btn-sm join-item" disabled={!hasPrevPage} onClick={prevPage}>
          Prev
        </button>
        <button className="btn btn-sm join-item btn-ghost pointer-events-none">{page}</button>
        <button className="btn btn-sm join-item" disabled={!hasNextPage || page >= totalPages} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
