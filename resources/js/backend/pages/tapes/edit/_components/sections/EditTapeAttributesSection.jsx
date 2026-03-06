import React from 'react';
import useEditTapeStore from '../../_store/useEditTapeStore';

const TEXTAREA_FIELDS = [
    { label: 'Case', name: 'case_desc', placeholder: 'Case details' },
    { label: 'Notes', name: 'notes', placeholder: 'Additional notes' },
    { label: 'Seal', name: 'seal', placeholder: 'Seal details' },
    { label: 'Sticker', name: 'sticker', placeholder: 'Sticker details' },
    { label: 'Watermarks', name: 'watermarks', placeholder: 'Watermarks' },
    { label: 'Etching', name: 'etching', placeholder: 'Etching' },
];

function EditTapeAttributesSection() {
    const form = useEditTapeStore((state) => state.form);
    const setField = useEditTapeStore((state) => state.setField);
    const setBooleanField = useEditTapeStore((state) => state.setBooleanField);

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

export default EditTapeAttributesSection;
