import React, { useMemo, useState } from "react";
import useHomePageStore from "../../_store/useHomePageStore";
import PreviewHeader from "./_compoennts/PreviewHeader";
import PreviewImageGallery from "./_compoennts/PreviewImageGallery";
import PreviewDetailsTable from "./_compoennts/PreviewDetailsTable";
import PreviewZoomOverlay from "./_compoennts/PreviewZoomOverlay";
import { PreviewErrorState, PreviewLoadingState } from "./_compoennts/PreviewStatus";
import {
  buildImageItems,
  buildPreviewDetails,
  getTapeTitle,
  isTruthyFlag,
} from "./_compoennts/previewUtils";

export default function HomePageTapePreviewModal() {
  const [zoomedImageIndex, setZoomedImageIndex] = useState(null);
  const isPreviewOpen = useHomePageStore((state) => state.isPreviewOpen);
  const previewTapeId = useHomePageStore((state) => state.previewTapeId);
  const previewTape = useHomePageStore((state) => state.previewTape);
  const previewLoading = useHomePageStore((state) => state.previewLoading);
  const previewError = useHomePageStore((state) => state.previewError);
  const closeTapePreview = useHomePageStore((state) => state.closeTapePreview);
  const retryTapePreview = useHomePageStore((state) => state.retryTapePreview);

  const handleClosePreview = () => {
    setZoomedImageIndex(null);
    closeTapePreview();
  };

  const tapeTitle = getTapeTitle(previewTape, previewTapeId);
  const details = useMemo(() => buildPreviewDetails(previewTape), [previewTape]);
  const imageItems = useMemo(() => buildImageItems(previewTape), [previewTape]);
  const qaTone = isTruthyFlag(previewTape?.qa_checked) ? "success" : "warning";
  const qaLabel = isTruthyFlag(previewTape?.qa_checked) ? "QA'd" : "Not QA";
  const canNavigateZoom = imageItems.length > 1;
  const zoomedImageSrc =
    zoomedImageIndex !== null && imageItems[zoomedImageIndex]
      ? imageItems[zoomedImageIndex].src
      : null;

  const handlePrevZoom = () => {
    if (!canNavigateZoom || zoomedImageIndex === null) {
      return;
    }

    setZoomedImageIndex((prevIndex) => {
      if (prevIndex === null) {
        return prevIndex;
      }
      return (prevIndex - 1 + imageItems.length) % imageItems.length;
    });
  };

  const handleNextZoom = () => {
    if (!canNavigateZoom || zoomedImageIndex === null) {
      return;
    }

    setZoomedImageIndex((prevIndex) => {
      if (prevIndex === null) {
        return prevIndex;
      }
      return (prevIndex + 1) % imageItems.length;
    });
  };

  if (!isPreviewOpen) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[200] bg-base-300/45 backdrop-blur-sm"
        onClick={handleClosePreview}
        aria-label="Close preview"
      />

      <div className="fixed inset-0 z-[210] overflow-y-auto p-3 sm:p-6" role="dialog" aria-modal="true">
        <div className="mx-auto w-full max-w-6xl rounded-[1.75rem] border border-base-300 bg-base-100 shadow-2xl">
          <PreviewHeader
            tapeTitle={tapeTitle}
            previewTapeId={previewTapeId}
            onClose={handleClosePreview}
          />

          <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-6">
            {previewLoading ? <PreviewLoadingState /> : null}

            {!previewLoading && previewError ? (
              <PreviewErrorState error={previewError} onRetry={retryTapePreview} />
            ) : null}

            {!previewLoading && !previewError && previewTape ? (
              <div className="space-y-6">
                <PreviewImageGallery
                  imageItems={imageItems}
                  onImageClick={(index) => setZoomedImageIndex(index)}
                />
                <PreviewDetailsTable details={details} qaTone={qaTone} qaLabel={qaLabel} />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <PreviewZoomOverlay
        imageSrc={zoomedImageSrc}
        onClose={() => setZoomedImageIndex(null)}
        onPrev={handlePrevZoom}
        onNext={handleNextZoom}
        canNavigate={canNavigateZoom}
        currentIndex={zoomedImageIndex}
        totalCount={imageItems.length}
      />
    </>
  );
}
