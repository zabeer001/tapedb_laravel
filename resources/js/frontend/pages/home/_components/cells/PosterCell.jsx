import React from "react";

export default function PosterCell({ src, title }) {
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
