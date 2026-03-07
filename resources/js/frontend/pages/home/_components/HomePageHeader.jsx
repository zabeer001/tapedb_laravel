import React from "react";
import useHomePageStore from "../_store/useHomePageStore";

export default function HomePageHeader() {
  const loading = useHomePageStore((state) => state.loading);
  const totalCount = useHomePageStore((state) => state.totalCount);
  const screenerTotalCount = useHomePageStore((state) => state.screenerTotalCount);
  const firstPrinterTotalCount = useHomePageStore((state) => state.firstPrinterTotalCount);

  return (
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
            <div className="stat-value text-xl">{loading ? "..." : totalCount}</div>
          </div>
          <div className="stat py-3">
            <div className="stat-title text-xs">Screener</div>
            <div className="stat-value text-xl">{loading ? "..." : screenerTotalCount}</div>
          </div>
          <div className="stat py-3">
            <div className="stat-title text-xs">First Print</div>
            <div className="stat-value text-xl">{loading ? "..." : firstPrinterTotalCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
