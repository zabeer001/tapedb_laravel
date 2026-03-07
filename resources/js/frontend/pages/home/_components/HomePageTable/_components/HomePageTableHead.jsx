import React from "react";

export default function HomePageTableHead() {
  return (
    <thead className="bg-base-100">
      <tr className="text-xs">
        <th className="w-14 sm:w-20">#</th>
        <th className="min-w-[180px] sm:min-w-[280px]">Title</th>
        <th className="hidden sm:table-cell">Year</th>
        <th className="hidden min-w-[180px] md:table-cell">Distributor</th>
        <th className="hidden lg:table-cell">Seal</th>
        <th className="hidden min-w-[190px] xl:table-cell">Sticker</th>
        <th className="hidden min-w-[190px] xl:table-cell">Water marks</th>
        <th className="hidden xl:table-cell">Guard</th>
        <th className="hidden 2xl:table-cell">UPC</th>
        <th className="hidden 2xl:table-cell">Etching</th>
        <th className="hidden sm:table-cell">QA</th>
        <th className="text-right">View</th>
      </tr>
    </thead>
  );
}
