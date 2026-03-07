import React from 'react';
import { formatNumber } from './reportFormatters';

function ReportTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 px-4 py-3 shadow-2xl">
      <p className="mb-2 text-sm font-bold">{label}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-base-content/80">
            <span className="font-semibold">{entry.name}:</span> {formatNumber(entry.value)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ReportTooltip;
