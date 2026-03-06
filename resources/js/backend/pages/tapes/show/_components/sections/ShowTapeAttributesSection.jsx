import React from 'react';
import useShowTapeStore from '../../_store/useShowTapeStore';

function ShowTapeAttributesSection() {
    const tape = useShowTapeStore((state) => state.tape);

    if (!tape) {
        return null;
    }

    const attributes = [
        { label: 'Case', value: tape.case_desc },
        { label: 'Seal', value: tape.seal },
        { label: 'Sticker', value: tape.sticker },
        { label: 'Watermarks', value: tape.watermarks },
        { label: 'Etching', value: tape.etching },
        { label: 'Notes', value: tape.notes },
    ];

    return (
        <div className="rounded-box border border-base-300 bg-base-200 p-4">
            <h2 className="mb-3 text-xl font-bold">Attributes</h2>
            <dl className="grid gap-2 text-sm">
                {attributes.map((attribute) => (
                    <div key={attribute.label}>
                        <p className="font-medium">{attribute.label}</p>
                        <p className="text-base-content/80">{attribute.value || '-'}</p>
                    </div>
                ))}
            </dl>
        </div>
    );
}

export default ShowTapeAttributesSection;
