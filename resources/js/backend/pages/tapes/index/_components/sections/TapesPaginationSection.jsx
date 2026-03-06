import React from 'react';
import useTapesStore from '../../_store/useTapesStore';

function buildRange(currentPage, totalPages) {
    const maxButtons = 5;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
        start = Math.max(1, end - maxButtons + 1);
    }

    return { start, end };
}

function TapesPaginationSection() {
    const page = useTapesStore((state) => state.page);
    const totalPages = useTapesStore((state) => state.totalPages);
    const setPage = useTapesStore((state) => state.setPage);

    if (!totalPages || totalPages <= 1) {
        return null;
    }

    const { start, end } = buildRange(page, totalPages);
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <button
                type="button"
                className="btn btn-sm btn-outline"
                disabled={!canPrev}
                onClick={() => canPrev && setPage(page - 1)}
            >
                Previous
            </button>

            <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: end - start + 1 }, (_, index) => {
                    const pageNumber = start + index;

                    return (
                        <button
                            key={pageNumber}
                            type="button"
                            className={`btn btn-sm ${pageNumber === page ? 'btn-active' : 'btn-outline'}`}
                            onClick={() => setPage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                className="btn btn-sm btn-outline"
                disabled={!canNext}
                onClick={() => canNext && setPage(page + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default TapesPaginationSection;
