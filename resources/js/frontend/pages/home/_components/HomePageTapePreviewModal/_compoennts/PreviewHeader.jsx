import React from "react";

import { toDisplayText } from "./previewUtils";
import TapeNavigation from "./tapeNavigation/TapeNavigation";

export default function PreviewHeader({ tapeTitle, previewTapeId, onClose }) {


  return (
    <div className="border-b border-base-300/80 bg-gradient-to-r from-base-200/40 via-base-100 to-base-200/20 px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.28em] text-base-content/50">Navigation</p>
          <h3 className="text-lg font-black leading-tight sm:text-xl">{tapeTitle}</h3>
          <p className="text-xs text-base-content/65">Tape #{toDisplayText(previewTapeId)}</p>
        </div>

        <div className="flex items-start gap-2 self-start">

          <TapeNavigation previewTapeId={previewTapeId} />
          <button
            type="button"
            className="btn btn-sm btn-circle self-start border border-base-300/80 bg-base-100/90 hover:bg-base-200/70"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
