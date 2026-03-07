import React from "react";
import useHomePageStore from "../../_store/useHomePageStore";
import HomePageTableTopBar from "./_components/HomePageTableTopBar";
import HomePageTableHead from "./_components/HomePageTableHead";
import HomePageTableStatusRow from "./_components/HomePageTableStatusRow";
import HomePageTableDataRow from "./_components/HomePageTableDataRow";
import HomePageTableFooter from "./_components/HomePageTableFooter";
import useHomePageTableScrollPagination from "./useHomePageTableScrollPagination";

export default function HomePageTable() {
  const rows = useHomePageStore((state) => state.rows);
  const page = useHomePageStore((state) => state.page);
  const loadedStartPage = useHomePageStore((state) => state.loadedStartPage);
  const loadedEndPage = useHomePageStore((state) => state.loadedEndPage);
  const totalPages = useHomePageStore((state) => state.totalPages);
  const totalCount = useHomePageStore((state) => state.totalCount);
  const hasNextPage = useHomePageStore((state) => state.hasNextPage);
  const hasPrevPage = useHomePageStore((state) => state.hasPrevPage);
  const loading = useHomePageStore((state) => state.loading);
  const error = useHomePageStore((state) => state.error);
  const loadTapes = useHomePageStore((state) => state.loadTapes);
  const loadNextPage = useHomePageStore((state) => state.loadNextPage);
  const loadPrevPage = useHomePageStore((state) => state.loadPrevPage);
  const resetFilters = useHomePageStore((state) => state.resetFilters);
  const openTapePreview = useHomePageStore((state) => state.openTapePreview);

  useHomePageTableScrollPagination({
    hasNextPage,
    hasPrevPage,
    loading,
    loadNextPage,
    loadPrevPage,
  });

  return (
    <div className="mt-5 card bg-base-100 shadow border border-base-300">
      <div className="card-body p-0">
        <HomePageTableTopBar
          totalCount={totalCount}
          loadedStartPage={loadedStartPage}
          loadedEndPage={loadedEndPage}
          totalPages={totalPages}
        />

        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm sm:table-md">
            <HomePageTableHead />

            <tbody>
              {loading && rows.length === 0 ? (
                <HomePageTableStatusRow
                  title="Loading tapes..."
                  subtitle="Please wait while we fetch records."
                  showSpinner
                />
              ) : rows.length === 0 && error ? (
                <HomePageTableStatusRow
                  title="Failed to load tapes"
                  subtitle={error}
                  actionLabel="Retry"
                  onAction={() => loadTapes(page)}
                />
              ) : rows.length === 0 ? (
                <HomePageTableStatusRow
                  title="No results"
                  subtitle="Try a different keyword or reset filters."
                  actionLabel="Reset"
                  onAction={resetFilters}
                />
              ) : (
                rows.map((row) => (
                  <HomePageTableDataRow
                    key={row.id}
                    row={row}
                    onOpenPreview={openTapePreview}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <HomePageTableFooter visibleCount={rows.length} totalCount={totalCount} />
      </div>
    </div>
  );
}
