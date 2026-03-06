import React from 'react';
import { CREATE_IMAGE_FIELDS } from '../../_store/useCreateTapeStore';
import useCreateTapeStore from '../../_store/useCreateTapeStore';

function CreateTapeImageSection() {
    const previews = useCreateTapeStore((state) => state.previews);
    const setFile = useCreateTapeStore((state) => state.setFile);

    const onFileChange = (field, event) => {
        const file = event.target.files?.[0] || null;

        setFile(field, file);
    };

    return (
        <div className="md:col-span-2 rounded-box border border-base-300 p-4">
            <h3 className="mb-3 font-semibold">Images (img1 - img6)</h3>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {CREATE_IMAGE_FIELDS.map((field, index) => (
                    <label key={field} className="form-control w-full">
                        <span className="label-text mb-2">{`Image ${index + 1}`}</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered w-full"
                            onChange={(event) => onFileChange(field, event)}
                        />
                        {previews[field] ? (
                            <img
                                src={previews[field]}
                                className="mt-2 h-24 w-full rounded-lg border border-base-300 object-cover"
                                alt={`${field} preview`}
                            />
                        ) : null}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default CreateTapeImageSection;
