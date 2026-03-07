import React from "react";

export default function PreviewZoomOverlay({
  imageSrc,
  onClose,
  onPrev,
  onNext,
  canNavigate,
  currentIndex,
  totalCount,
}) {
  if (!imageSrc) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[220] bg-base-300/80 backdrop-blur-md">
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close zoom overlay"
      />

      <button
        type="button"
        className="btn btn-circle btn-sm absolute right-3 top-3 z-20 bg-base-100/90 sm:right-6 sm:top-6"
        onClick={onClose}
        aria-label="Close zoomed image"
      >
        ✕
      </button>

      <div className="relative z-10 grid h-full w-full place-items-center p-4">
        {canNavigate ? (
          <button
            type="button"
            className="btn btn-circle btn-sm absolute left-3 bg-base-100/90 sm:left-6 sm:btn-md"
            onClick={onPrev}
            aria-label="Previous image"
          >
            ❮
          </button>
        ) : null}

        <img
          src={imageSrc}
          alt="Zoomed tape"
          className="max-h-[90vh] max-w-[95vw] rounded-xl border border-base-200 object-contain shadow-2xl"
        />

        {canNavigate ? (
          <button
            type="button"
            className="btn btn-circle btn-sm absolute right-3 bg-base-100/90 sm:right-6 sm:btn-md"
            onClick={onNext}
            aria-label="Next image"
          >
            ❯
          </button>
        ) : null}
      </div>

      {canNavigate ? (
        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-base-100/90 px-3 py-1 text-xs font-medium">
          {(currentIndex ?? 0) + 1} / {totalCount}
        </div>
      ) : null}
    </div>
  );
}
