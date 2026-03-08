import useHomePageStore from '@/frontend/pages/home/_store/useHomePageStore';
import React from 'react'
import { handleNextTape } from './nextTapeHandler';
import { handlePreviousTape } from './previousTapeHandler';



export default function TapeNavigation({ previewTapeId }) {
    const openTapePreview = useHomePageStore((state) => state.openTapePreview);
    const setPreviewError = useHomePageStore((state) => state.setPreviewError);

    const handlePrevious = async () => {
        await handlePreviousTape({ previewTapeId, setPreviewError, openTapePreview });
    };

    const handleNext = async () => {
        await handleNextTape({ previewTapeId, setPreviewError, openTapePreview });
    };
    
    return (
        <div className="flex gap-3 pt-[30px]">
            <button
                type="button"
                className="btn btn-sm join-item rounded-full border-0 bg-base-content px-4 text-base-100 hover:bg-base-content/90"
                onClick={handlePrevious}
            >
                Previous
            </button>
            <button
                type="button"
                className="btn btn-sm join-item rounded-full border-0 bg-base-content px-4 text-base-100 hover:bg-base-content/90"
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    )
}
