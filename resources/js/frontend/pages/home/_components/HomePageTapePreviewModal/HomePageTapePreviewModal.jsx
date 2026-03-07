import React from "react";
import useHomePageStore from "../../_store/useHomePageStore";

const IMAGE_FIELDS = ["img1", "img2", "img3", "img4", "img5", "img6"];

function toDisplayText(value) {
  if (value === null || value === undefined) {
    return "—";
  }

  const normalized = value.toString().trim();
  return normalized || "—";
}

function toImageUrl(path) {
  if (!path) {
    return null;
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `/storage/${path}`;
}

export default function HomePageTapePreviewModal() {
  const isPreviewOpen = useHomePageStore((state) => state.isPreviewOpen);
  const previewTapeId = useHomePageStore((state) => state.previewTapeId);
  const previewTape = useHomePageStore((state) => state.previewTape);
  const previewLoading = useHomePageStore((state) => state.previewLoading);
  const previewError = useHomePageStore((state) => state.previewError);
  const closeTapePreview = useHomePageStore((state) => state.closeTapePreview);
  const retryTapePreview = useHomePageStore((state) => state.retryTapePreview);

  if (!isPreviewOpen) {
    return null;
  }

  const tapeTitle =
    previewTape?.title?.trim() || previewTape?.name?.trim() || `Tape #${toDisplayText(previewTapeId)}`;

  const details = previewTape
    ? [
        { label: "ID", value: previewTape.id },
        { label: "Name", value: previewTape.name },
        { label: "Title", value: previewTape.title },
        { label: "Year", value: previewTape.year },
        { label: "Distributor", value: previewTape.distributor },
        { label: "Seal", value: previewTape.seal },
        { label: "Sticker", value: previewTape.sticker },
        { label: "Watermarks", value: previewTape.watermarks },
        { label: "Guard Color", value: previewTape.guard_color },
        { label: "UPC", value: previewTape.upc },
        { label: "Etching", value: previewTape.etching },
        { label: "QA Checked", value: previewTape.qa_checked },
        { label: "First Printer", value: previewTape.first_printer },
        { label: "Notes", value: previewTape.notes },
      ]
    : [];

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true">
      <div className="modal-box max-w-5xl p-0">
        <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
          <h3 className="text-lg font-bold">{tapeTitle}</h3>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost"
            aria-label="Close"
            onClick={closeTapePreview}
          >
            ✕
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {previewLoading ? (
            <div className="flex items-center gap-3 py-8">
              <span className="loading loading-spinner loading-md"></span>
              <span className="text-sm text-base-content/70">Loading tape details...</span>
            </div>
          ) : null}

          {!previewLoading && previewError ? (
            <div className="space-y-3 py-3">
              <p className="text-sm text-error">{previewError}</p>
              <button type="button" className="btn btn-sm" onClick={retryTapePreview}>
                Retry
              </button>
            </div>
          ) : null}

          {!previewLoading && !previewError && previewTape ? (
            <div className="space-y-5">
              <div className="rounded-box border border-base-300 bg-base-200 p-4">
                <dl className="grid gap-3 md:grid-cols-2">
                  {details.map((detail) => (
                    <div key={detail.label}>
                      <dt className="text-xs uppercase text-base-content/60">{detail.label}</dt>
                      <dd className="text-sm font-medium">{toDisplayText(detail.value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold">Images</h4>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {IMAGE_FIELDS.map((field) => {
                    const imageUrl = toImageUrl(previewTape[field]);

                    if (!imageUrl) {
                      return (
                        <div
                          key={field}
                          className="rounded-box border border-dashed border-base-300 p-6 text-center text-xs text-base-content/60"
                        >
                          {field} not uploaded
                        </div>
                      );
                    }

                    return (
                      <img
                        key={field}
                        src={imageUrl}
                        alt={field}
                        className="h-40 w-full rounded-box border border-base-300 object-cover"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <button type="button" className="modal-backdrop" onClick={closeTapePreview} aria-label="Close" />
    </div>
  );
}
