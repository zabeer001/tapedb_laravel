import React from "react";
import PosterCell from "./cells/PosterCell";
import Chip from "./ui/Chip";
import HomePagePagination from "./HomePagePagination";
import useHomePageStore, { selectHomePageResultState } from "../_store/useHomePageStore";

export default function HomePageTable() {
  const { pagedRows, filteredCount, safePage, totalPages } = useHomePageStore(selectHomePageResultState);
  const loading = useHomePageStore((state) => state.loading);
  const error = useHomePageStore((state) => state.error);
  const loadTapes = useHomePageStore((state) => state.loadTapes);
  const resetFilters = useHomePageStore((state) => state.resetFilters);
  const openTapePreview = useHomePageStore((state) => state.openTapePreview);

  return (
    <div className="mt-5 card bg-base-100 shadow border border-base-300">
      <div className="card-body p-0">
        <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Results</span>
            <span className="badge badge-ghost badge-sm">{filteredCount}</span>
          </div>
          <div className="text-xs text-base-content/60">
            Page {safePage} / {totalPages}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-base-100">
              <tr className="text-xs">
                <th className="w-20">ID</th>
                <th className="min-w-[280px]">Poster / Title</th>
                <th>Year</th>
                <th className="min-w-[180px]">Distributor</th>
                <th>Seal</th>
                <th className="min-w-[190px]">Sticker</th>
                <th className="min-w-[190px]">Water marks</th>
                <th>Guard</th>
                <th>UPC</th>
                <th>Etching</th>
                <th>QA</th>
                <th className="text-right">View</th>
              </tr>
            </thead>

            <tbody>
              {error ? (
                <tr>
                  <td colSpan={12}>
                    <div className="p-8 flex flex-col items-center gap-2">
                      <div className="text-lg font-bold">Failed to load tapes</div>
                      <div className="text-sm text-base-content/70">{error}</div>
                      <button className="btn btn-ghost btn-sm" onClick={loadTapes}>
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : loading ? (
                <tr>
                  <td colSpan={12}>
                    <div className="p-8 flex flex-col items-center gap-2">
                      <span className="loading loading-spinner loading-md"></span>
                      <div className="text-sm text-base-content/70">Loading tapes...</div>
                    </div>
                  </td>
                </tr>
              ) : filteredCount === 0 ? (
                <tr>
                  <td colSpan={12}>
                    <div className="p-8 flex flex-col items-center gap-2">
                      <div className="text-lg font-bold">No results</div>
                      <div className="text-sm text-base-content/70">
                        Try a different keyword or reset filters.
                      </div>
                      <button className="btn btn-ghost btn-sm" onClick={resetFilters}>
                        Reset
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                pagedRows.map((r) => (
                  <tr key={r.id} className="hover">
                    <td className="font-mono text-sm">{r.id}</td>

                    <td>
                      <div className="flex items-center justify-between gap-4">
                        <PosterCell src={r.poster} title={r.title} />
                        <div className="flex flex-col items-end gap-1">
                          {r.firstPrint ? (
                            <span className="badge badge-warning badge-sm">FIRST PRINT</span>
                          ) : (
                            <span className="badge badge-ghost badge-sm">Standard</span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="text-sm font-semibold">{r.year}</td>
                    <td className="text-sm">{r.distributor}</td>
                    <td className="text-sm">{r.seal}</td>
                    <td className="text-sm">{r.sticker}</td>
                    <td className="text-sm">{r.waterMarks}</td>
                    <td className="text-sm">{r.guardColor}</td>
                    <td className="text-sm">{r.upc}</td>
                    <td className="text-sm">{r.etching}</td>

                    <td>{r.qa ? <Chip tone="success">{r.qaLabel}</Chip> : <Chip>Pending</Chip>}</td>

                    <td className="text-right">
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-square rounded-xl"
                        aria-label="View"
                        onClick={() => openTapePreview(r.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.27 2.943 9.542 7-1.273 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                          <circle cx="12" cy="12" r="2.5" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <HomePagePagination />
      </div>
    </div>
  );
}
