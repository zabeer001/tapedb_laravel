import React from 'react';
import useEditTapeStore, { EDIT_IMAGE_FIELDS } from '../../_store/useEditTapeStore';

function EditTapeImageSection() {
    const tape = useEditTapeStore((state) => state.tape);
    const previews = useEditTapeStore((state) => state.previews);
    const removeImages = useEditTapeStore((state) => state.removeImages);
    const setFile = useEditTapeStore((state) => state.setFile);
    const setRemoveImage = useEditTapeStore((state) => state.setRemoveImage);

    const onFileChange = (field, event) => {
        const file = event.target.files?.[0] || null;

        setFile(field, file);
    };

    const onRemoveImage = (field, event) => {
        setRemoveImage(field, event.target.checked);
    };

    if (!tape) {
        return null;
    }

    return (
        <div className="md:col-span-2 rounded-box border border-base-300 p-4">
            <h3 className="mb-3 font-semibold">Images (img1 - img6)</h3>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {EDIT_IMAGE_FIELDS.map((field, index) => {
                    const imageUrl = tape[`${field}_url`] || null;
                    const hasCurrentImage = Boolean(imageUrl);
                    const currentImage = hasCurrentImage && !removeImages[field]
                        ? imageUrl
                        : null;
                    const previewImage = previews[field] || null;
                    const shownImage = previewImage || currentImage;
                    const canRemove = hasCurrentImage || Boolean(previewImage);

                    return (
                        <label key={field} className="form-control w-full">
                            <span className="label-text mb-2">{`Image ${index + 1}`}</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
                                onChange={(event) => onFileChange(field, event)}
                            />

                            {shownImage ? (
                                <img
                                    src={shownImage}
                                    className="mt-2 h-24 w-full rounded-lg border border-base-300 object-cover"
                                    alt={`${field} preview`}
                                />
                            ) : (
                                <div className="mt-2 rounded-lg border border-dashed border-base-300 bg-base-200 p-4 text-center text-sm text-base-content/60">
                                    {field} not uploaded
                                </div>
                            )}

                            {canRemove ? (
                                <label className="label mt-2 cursor-pointer justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        name={`${field}_remove`}
                                        className="checkbox checkbox-error checkbox-sm"
                                        checked={Boolean(removeImages[field])}
                                        onChange={(event) => onRemoveImage(field, event)}
                                    />
                                    <span className="label-text">Remove image</span>
                                </label>
                            ) : null}
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

export default EditTapeImageSection;
