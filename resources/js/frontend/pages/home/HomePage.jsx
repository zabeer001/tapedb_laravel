import React, { useEffect } from "react";
import HomePageFilters from "./_components/HomePageFilters";
import HomePageHeader from "./_components/HomePageHeader";
import HomePageTapePreviewModal from "./_components/HomePageTapePreviewModal";
import HomePageTable from "./_components/HomePageTable";
import useHomePageStore from "./_store/useHomePageStore";

export default function TapeDBDaisyLayout() {
  const loadTapes = useHomePageStore((state) => state.loadTapes);

  useEffect(() => {
    loadTapes();
  }, [loadTapes]);

  return (
    <div className="min-h-screen">
      {/* Page */}
      <div className="w-full px-4 py-6">
        <HomePageHeader />
        <HomePageFilters />
        <HomePageTable />
        <HomePageTapePreviewModal />

        {/* Optional: bottom spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}
