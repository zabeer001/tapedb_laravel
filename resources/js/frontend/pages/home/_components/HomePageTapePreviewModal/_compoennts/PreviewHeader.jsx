import React from "react";
import { toDisplayText } from "./previewUtils";

export default function PreviewHeader({ tapeTitle, previewTapeId, onClose }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-base-300 px-4 py-4 sm:px-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-base-content/45">Navigate</p>
        <h3 className="text-lg font-black sm:text-xl">{tapeTitle}</h3>
        <p className="text-xs text-base-content/60">Entry #{toDisplayText(previewTapeId)}</p>
      </div>

      <button
        type="button"
        className="btn btn-sm btn-circle btn-ghost"
        aria-label="Close"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}
