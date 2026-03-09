import React from "react";

export default function PosterCell({ src, title, firstPrint, screener }) {
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
        <div className="font-semibold whitespace-normal break-words leading-snug">{title}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          {firstPrint ? (
            <button type="button" className="btn btn-warning btn-xs h-5 min-h-0 px-2 text-[9px]">
              FIRST PRINT
            </button>
          ) : null}
          {screener ? (
            <button type="button" className="btn btn-info btn-xs h-5 min-h-0 px-2 text-[9px]">
              SCREENER
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
