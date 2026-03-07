import React from "react";

export function PreviewLoadingState() {
  return (
    <div className="flex items-center gap-3 py-8">
      <span className="loading loading-spinner loading-md"></span>
      <span className="text-sm text-base-content/70">Loading tape details...</span>
    </div>
  );
}

export function PreviewErrorState({ error, onRetry }) {
  return (
    <div className="space-y-3 py-3">
      <p className="text-sm text-error">{error}</p>
      <button type="button" className="btn btn-sm" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
