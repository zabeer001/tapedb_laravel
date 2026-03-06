import React from 'react';
import useEditTapeStore from '../../_store/useEditTapeStore';

const INPUT_FIELDS = [
    { label: 'User ID', name: 'user_id', type: 'number', placeholder: 'Optional user id', min: 1 },
    { label: 'Name', name: 'name', placeholder: 'Tape name' },
    { label: 'Title', name: 'title', placeholder: 'Tape title' },
    { label: 'Year', name: 'year', placeholder: '1982' },
    { label: 'Distributor', name: 'distributor', placeholder: 'Distributor' },
    { label: 'Guard Color', name: 'guard_color', placeholder: 'Blue / Red' },
    { label: 'UPC', name: 'upc', placeholder: 'UPC' },
    { label: 'QA Checked', name: 'qa_checked', placeholder: 'Yes / No' },
    { label: 'Screener', name: 'screener', placeholder: 'S1' },
    { label: 'First Printer', name: 'first_printer', placeholder: 'P1' },
];

function TextField({ field, value, onChange }) {
    return (
        <label className="form-control w-full">
            <span className="label-text mb-2">{field.label}</span>
            <input
                type={field.type || 'text'}
                name={field.name}
                className="input input-bordered w-full"
                value={value || ''}
                onChange={onChange}
                min={field.min}
                placeholder={field.placeholder}
            />
        </label>
    );
}

function EditTapeGeneralSection() {
    const form = useEditTapeStore((state) => state.form);
    const setField = useEditTapeStore((state) => state.setField);

    const onTextChange = (event) => {
        const { name, value } = event.target;

        setField(name, value);
    };

    return (
        <>
            {INPUT_FIELDS.map((field) => (
                <TextField
                    key={field.name}
                    field={field}
                    value={form[field.name]}
                    onChange={onTextChange}
                />
            ))}
        </>
    );
}

export default EditTapeGeneralSection;
