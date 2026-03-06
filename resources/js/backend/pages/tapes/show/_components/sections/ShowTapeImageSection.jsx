import React from 'react';
import useShowTapeStore from '../../_store/useShowTapeStore';
import { IMAGE_FIELDS } from '../../_store/useShowTapeStore';

function ShowTapeImageSection() {
    const tape = useShowTapeStore((state) => state.tape);

    if (!tape) {
        return null;
    }

    return (
        <div className="rounded-box border border-base-300 p-4 md:col-span-2">
            <h2 className="mb-3 text-xl font-bold">Images</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {IMAGE_FIELDS.map((field) => {
                    const image = tape[field];

                    if (!image) {
                        return (
                            <div
                                key={field}
                                className="rounded-lg border border-dashed border-base-300 p-8 text-center text-sm text-base-content/60"
                            >
                                {field} not uploaded
                            </div>
                        );
                    }

                    return (
                        <img
                            key={field}
                            src={`/storage/${image}`}
                            alt={field}
                            className="h-40 w-full rounded-lg border border-base-300 object-cover"
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ShowTapeImageSection;
