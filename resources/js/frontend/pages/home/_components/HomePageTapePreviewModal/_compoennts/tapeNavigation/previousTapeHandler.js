import { fetchPreviousTape } from './previewNavigationApi';

export async function handlePreviousTape({ previewTapeId, setPreviewError, openTapePreview }) {
    if (previewTapeId === null || previewTapeId === undefined) {
        setPreviewError("Tape id is missing.");
        return;
    }

    try {
        const payload = await fetchPreviousTape(previewTapeId);
        const previousTapeId = payload?.id;
        if (previousTapeId === null || previousTapeId === undefined) {
            setPreviewError(payload?.message || "No previous tape found.");
            return;
        }

        await openTapePreview(previousTapeId, { keepExistingData: true });
    } catch (error) {
        setPreviewError(error?.message || "Failed to load previous tape.");
    }
}
