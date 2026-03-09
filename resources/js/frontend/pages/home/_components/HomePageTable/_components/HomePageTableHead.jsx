import React from "react";

export default function HomePageTableHead() {
  return (
    <thead className="bg-base-100">
      <tr className="text-xs">
        <th className="w-14 sm:w-20">#</th>
        <th className="min-w-[180px] sm:min-w-[280px]">Title</th>
        <th className="hidden w-16 max-w-16 sm:table-cell">Year</th>
        <th className="hidden w-[11rem] max-w-[11rem] md:table-cell">Distributor</th>
        <th className="hidden w-[11rem] max-w-[11rem] lg:table-cell">Seal</th>
        <th className="hidden w-[11rem] max-w-[11rem] xl:table-cell">Sticker</th>
        <th className="hidden w-[11rem] max-w-[11rem] xl:table-cell">Water marks</th>
        <th className="hidden w-[11rem] max-w-[11rem] xl:table-cell">Guard</th>
        <th className="hidden w-[11rem] max-w-[11rem] 2xl:table-cell">UPC</th>
        <th className="hidden w-[11rem] max-w-[11rem] 2xl:table-cell">Etching</th>
        <th className="hidden sm:table-cell">QA</th>
        <th className="text-right">View</th>
      </tr>
    </thead>
  );
}
