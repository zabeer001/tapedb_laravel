import React, { useMemo, useState } from "react";

/**
 * DaisyUI + Tailwind layout for TapeDB list page
 * - Clean header with brand + actions
 * - Search + filter bar
 * - Card-style table with sticky header
 * - Nice badges/chips for QA / First Print
 * - Pagination footer
 *
 * Replace `mockRows` with API data.
 */

const mockRows = [
  {
    id: 3374,
    poster: null,
    title: "M*A*S*H",
    year: 1980,
    distributor: "Magnetic Video",
    seal: "?",
    sticker: "—",
    waterMarks: "—",
    guardColor: "Black",
    upc: "None",
    etching: "—",
    qa: true,
    firstPrint: false,
  },
  {
    id: 3305,
    poster: null,
    title: "10 To Midnight",
    year: 1983,
    distributor: "MGM UA Home Video",
    seal: "V-Overlap",
    sticker: "Side, Blue (Dog Bone)",
    waterMarks: "None",
    guardColor: "—",
    upc: "None",
    etching: "—",
    qa: true,
    firstPrint: false,
  },
  {
    id: 3114,
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=240&q=60",
    title: "100 Rifles",
    year: 1979,
    distributor: "Magnetic Video",
    seal: "?",
    sticker: "—",
    waterMarks: "—",
    guardColor: "Grey",
    upc: "None",
    etching: "—",
    qa: true,
    firstPrint: true,
  },
  {
    id: 2030,
    poster: null,
    title: "1941",
    year: 1986,
    distributor: "MCA Home Video",
    seal: "H-Overlap",
    sticker: "None",
    waterMarks: "Wraparound, White, Hor…",
    guardColor: "Black",
    upc: "Back",
    etching: "MCATM",
    qa: true,
    firstPrint: false,
  },
  {
    id: 3555,
    poster: null,
    title: "1969",
    year: 1988,
    distributor: "Media",
    seal: "H-Overlap",
    sticker: "None",
    waterMarks: "Front, Black, Horizont…",
    guardColor: "Black",
    upc: "Back",
    etching: "None",
    qa: true,
    firstPrint: true,
  },
];

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

function Chip({ children, tone = "neutral" }) {
  const map = {
    neutral: "badge-ghost",
    success: "badge-success",
    warning: "badge-warning",
    info: "badge-info",
  };
  return <span className={classNames("badge badge-sm", map[tone])}>{children}</span>;
}

function PosterCell({ src, title }) {
  return (
    <div className="flex items-center gap-3">
      <div className="avatar">
        <div className="w-12 rounded-xl ring-1 ring-base-300">
          {src ? (
            <img src={src} alt={title} />
          ) : (
            <div className="w-12 h-12 bg-base-200 grid place-items-center text-base-content/50">
              <span className="text-xs font-semibold">No Img</span>
            </div>
          )}
        </div>
      </div>
      <div className="min-w-0">
        <div className="font-semibold truncate">{title}</div>
        <div className="text-xs text-base-content/60 truncate">Tape record</div>
      </div>
    </div>
  );
}

export default function TapeDBDaisyLayout() {
  const [query, setQuery] = useState("");
  const [qaFilter, setQaFilter] = useState("ALL"); // ALL | QA | NOT_QA
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockRows
      .filter((r) => {
        if (!q) return true;
        const hay = [
          r.id,
          r.title,
          r.year,
          r.distributor,
          r.seal,
          r.sticker,
          r.waterMarks,
          r.guardColor,
          r.upc,
          r.etching,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .filter((r) => {
        if (qaFilter === "ALL") return true;
        if (qaFilter === "QA") return r.qa === true;
        if (qaFilter === "NOT_QA") return r.qa === false;
        return true;
      });
  }, [query, qaFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="min-h-screen">
     

      {/* Page */}
      <div className="w-full px-4 py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Library</h1>
            <p className="text-sm text-base-content/70">
              Search, filter, and review tapes. Clean UI + fast scanning.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="stats shadow bg-base-100">
              <div className="stat py-3">
                <div className="stat-title text-xs">Total</div>
                <div className="stat-value text-xl">{mockRows.length}</div>
              </div>
              <div className="stat py-3">
                <div className="stat-title text-xs">QA’d</div>
                <div className="stat-value text-xl">
                  {mockRows.filter((r) => r.qa).length}
                </div>
              </div>
              <div className="stat py-3">
                <div className="stat-title text-xs">First Print</div>
                <div className="stat-value text-xl">
                  {mockRows.filter((r) => r.firstPrint).length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-5 card bg-base-100 shadow border border-base-300">
          <div className="card-body p-4 sm:p-5">
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="flex-1">
                <label className="input input-bordered w-full flex items-center gap-2 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0011.15 11.15z"
                    />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search by title, year, distributor, sticker, etching..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                  />
                  {query ? (
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  ) : null}
                </label>
                
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <select
                  className="select select-bordered rounded-2xl"
                  value={qaFilter}
                  onChange={(e) => {
                    setQaFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="ALL">All QA</option>
                  <option value="QA">QA’d only</option>
                  <option value="NOT_QA">Not QA’d</option>
                </select>

              
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-5 card bg-base-100 shadow border border-base-300">
          <div className="card-body p-0">
            <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Results</span>
                <span className="badge badge-ghost badge-sm">{filtered.length}</span>
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
                  {paged.length === 0 ? (
                    <tr>
                      <td colSpan={12}>
                        <div className="p-8 flex flex-col items-center gap-2">
                          <div className="text-lg font-bold">No results</div>
                          <div className="text-sm text-base-content/70">
                            Try a different keyword or reset filters.
                          </div>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => {
                              setQuery("");
                              setQaFilter("ALL");
                              setPage(1);
                            }}
                          >
                            Reset
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paged.map((r) => (
                      <tr key={r.id} className="hover">
                        <td className="font-mono text-sm">{r.id}</td>

                        <td>
                          <div className="flex items-center justify-between gap-4">
                            <PosterCell src={r.poster} title={r.title} />
                            <div className="flex flex-col items-end gap-1">
                              {r.firstPrint ? (
                                <span className="badge badge-warning badge-sm">
                                  FIRST PRINT
                                </span>
                              ) : (
                                <span className="badge badge-ghost badge-sm">
                                  Standard
                                </span>
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

                        <td>
                          {r.qa ? <Chip tone="success">QA’d</Chip> : <Chip>Pending</Chip>}
                        </td>

                        <td className="text-right">
                          <button className="btn btn-ghost btn-sm btn-square rounded-xl" aria-label="View">
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

            {/* Footer / Pagination */}
            <div className="px-4 sm:px-5 py-4 border-t border-base-300 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-xs text-base-content/60">
                Showing{" "}
                <span className="font-semibold text-base-content">
                  {paged.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-base-content">
                  {filtered.length}
                </span>{" "}
                results
              </div>

              <div className="join">
                <button
                  className="btn btn-sm join-item"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>
                <button className="btn btn-sm join-item btn-ghost pointer-events-none">
                  {safePage}
                </button>
                <button
                  className="btn btn-sm join-item"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: bottom spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}
