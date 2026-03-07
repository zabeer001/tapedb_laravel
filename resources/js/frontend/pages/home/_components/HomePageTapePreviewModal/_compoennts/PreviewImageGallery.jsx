import React from "react";

export default function PreviewImageGallery({ imageItems, onImageClick }) {
  if (imageItems.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 justify-items-center gap-4 sm:gap-6 lg:grid-cols-4">
      {imageItems.map((image, index) => {
        const centerLastRowClass =
          imageItems.length === 6 && index === 4
            ? "lg:col-start-2"
            : imageItems.length === 6 && index === 5
            ? "lg:col-start-3"
            : "";

        return (
          <button
            key={image.field}
            type="button"
            onClick={() => onImageClick(index)}
            className={`flex h-[180px] w-[120px] items-center justify-center overflow-hidden rounded-xl border border-base-300 bg-transparent p-0 transition hover:scale-[1.02] sm:h-[260px] sm:w-[170px] ${centerLastRowClass}`}
            aria-label={`Zoom ${image.field}`}
          >
            <img src={image.src} alt={image.field} className="h-full w-full object-cover" />
          </button>
        );
      })}
    </div>
  );
}
