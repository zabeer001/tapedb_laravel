import { fetchNextTape } from './previewNavigationApi';

export async function handleNextTape({ previewTapeId, setPreviewError, openTapePreview }) {
    if (previewTapeId === null || previewTapeId === undefined) {
        setPreviewError("Tape id is missing.");
        return;
    }

    try {
        const payload = await fetchNextTape(previewTapeId);
        const nextTapeId = payload?.id;
        if (nextTapeId === null || nextTapeId === undefined) {
            setPreviewError(payload?.message || "No next tape found.");
            return;
        }

        await openTapePreview(nextTapeId, { keepExistingData: true });
    } catch (error) {
        setPreviewError(error?.message || "Failed to load next tape.");
    }
}
