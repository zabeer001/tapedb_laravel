import React from "react";
import useHomePageStore from "../_store/useHomePageStore";

export default function HomePageFilters() {
  const query = useHomePageStore((state) => state.query);
  const qaFilter = useHomePageStore((state) => state.qaFilter);
  const setQuery = useHomePageStore((state) => state.setQuery);
  const clearQuery = useHomePageStore((state) => state.clearQuery);
  const setQaFilter = useHomePageStore((state) => state.setQaFilter);

  return (
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
                onChange={(e) => setQuery(e.target.value)}
              />
              {query ? (
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={clearQuery}
                  aria-label="Clear search"
                >
                  <span>&times;</span>
                </button>
              ) : null}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <select
              className="select select-bordered rounded-2xl"
              value={qaFilter}
              onChange={(e) => setQaFilter(e.target.value)}
            >
              <option value="ALL">All QA</option>
              <option value="QA">QA'd only</option>
              <option value="NOT_QA">Not QA'd</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
