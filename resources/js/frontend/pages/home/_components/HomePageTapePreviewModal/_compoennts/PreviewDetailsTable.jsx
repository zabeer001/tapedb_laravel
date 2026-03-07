import React from "react";
import Chip from "../../ui/Chip";
import { toDisplayText } from "./previewUtils";

export default function PreviewDetailsTable({ details, qaTone, qaLabel }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-200/50 p-3 sm:p-4">
      <div className="space-y-0 overflow-hidden rounded-xl border border-base-300 bg-base-100">
        {details.map((detail, index) => (
          <div
            key={detail.label}
            className={`grid gap-1 px-3 py-3 text-sm sm:grid-cols-[150px_1fr] sm:items-center sm:px-4 ${
              index !== details.length - 1 ? "border-b border-base-300" : ""
            }`}
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-base-content/50">{detail.label}</p>
            <p className="font-medium">{toDisplayText(detail.value)}</p>
          </div>
        ))}

        <div className="grid gap-1 border-t border-base-300 px-3 py-3 text-sm sm:grid-cols-[150px_1fr] sm:items-center sm:px-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-base-content/50">QA Checked</p>
          <div>
            <Chip tone={qaTone}>{qaLabel}</Chip>
          </div>
        </div>
      </div>
    </div>
  );
}
