import React from 'react';
import useCreateTapeStore from '../../_store/useCreateTapeStore';

const TEXTAREA_FIELDS = [
    { label: 'Case', name: 'case_desc', rows: 6, placeholder: 'Case details' },
    { label: 'Notes', name: 'notes', rows: 6, placeholder: 'Additional notes' },
    { label: 'Seal', name: 'seal', rows: 4, placeholder: 'Seal details' },
    { label: 'Sticker', name: 'sticker', rows: 4, placeholder: 'Sticker details' },
    { label: 'Watermarks', name: 'watermarks', rows: 4, placeholder: 'Watermarks' },
    { label: 'Etching', name: 'etching', rows: 4, placeholder: 'Etching' },
];

function CreateTapeAttributesSection() {
    const form = useCreateTapeStore((state) => state.form);
    const setField = useCreateTapeStore((state) => state.setField);
    const setBooleanField = useCreateTapeStore((state) => state.setBooleanField);

    const onTextChange = (event) => {
        const { name, value } = event.target;

        setField(name, value);
    };

    const onApprovedChange = (event) => {
        setBooleanField('approved', event.target.checked);
    };

    return (
        <>
            <div className="md:col-span-2">
                <label className="label cursor-pointer gap-3 justify-start">
                    <input
                        type="checkbox"
                        name="approved"
                        className="checkbox checkbox-success"
                        checked={Boolean(form.approved)}
                        onChange={onApprovedChange}
                    />
                    <span className="label-text font-medium">Approved</span>
                </label>
            </div>

            {TEXTAREA_FIELDS.map((field) => (
                <label key={field.name} className="form-control w-full">
                    <span className="label-text mb-2">{field.label}</span>
                    <textarea
                        name={field.name}
                        className="textarea textarea-bordered h-24 w-full"
                        value={form[field.name] || ''}
                        onChange={onTextChange}
                        placeholder={field.placeholder}
                    />
                </label>
            ))}
        </>
    );
}

export default CreateTapeAttributesSection;
