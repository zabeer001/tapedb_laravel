import React from "react";
import PosterCell from "../../cells/PosterCell";
import Chip from "../../ui/Chip";

export default function HomePageTableDataRow({ row, onOpenPreview }) {
  return (
    <tr key={row.id} className="hover">
      <td className="w-14 font-mono text-xs sm:w-20 sm:text-sm">{row.id}</td>

      <td className="max-w-[220px]">
        <div className="sm:hidden">
          <PosterCell
            src={row.poster}
            title={row.title}
            firstPrint={row.firstPrint}
            screener={row.screener}
          />
        </div>

        <div className="hidden items-center justify-between gap-4 sm:flex">
          <PosterCell
            src={row.poster}
            title={row.title}
            firstPrint={row.firstPrint}
            screener={row.screener}
          />
          
        </div>
      </td>

      <td className="hidden text-sm font-semibold sm:table-cell">{row.year}</td>
      <td className="hidden text-sm md:table-cell">{row.distributor}</td>
      <td className="hidden text-sm lg:table-cell">{row.seal}</td>
      <td className="hidden text-sm xl:table-cell">{row.sticker}</td>
      <td className="hidden text-sm xl:table-cell">{row.waterMarks}</td>
      <td className="hidden text-sm xl:table-cell">{row.guardColor}</td>
      <td className="hidden text-sm 2xl:table-cell">{row.upc}</td>
      <td className="hidden text-sm 2xl:table-cell">{row.etching}</td>

      <td className="hidden sm:table-cell">
        <Chip tone={row.qa ? "success" : "warning"}>{row.qa ? "QA" : "Not QA"}</Chip>
      </td>

      <td className="text-right">
        <button
          type="button"
          className="btn btn-ghost bg-info text-info-content btn-xs btn-square rounded-xl sm:btn-sm"
          aria-label="View"
          onClick={() => onOpenPreview(row.id)}
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
  );
}
