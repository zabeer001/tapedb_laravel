import React from 'react';
import useCreateTapeStore from '../../_store/useCreateTapeStore';

const MAIN_FIELDS = [
    { label: 'Title', name: 'title', placeholder: 'Tape title' },
    { label: 'Year', name: 'year', placeholder: '1982' },
    { label: 'Distributor', name: 'distributor', placeholder: 'Distributor' },
    { label: 'Guard Color', name: 'guard_color', placeholder: 'Blue / Red' },
    { label: 'UPC', name: 'upc', placeholder: 'UPC' },
];

const FLAG_FIELDS = [
    { label: 'QA Checked', name: 'qa_checked' },
    { label: 'Screener', name: 'screener' },
    { label: 'First Printer', name: 'first_printer' },
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

function CheckboxField({ field, checked, onChange }) {
    return (
        <label className="cursor-pointer items-center gap-2 text-sm font-medium inline-flex">
            <input
                type="checkbox"
                name={field.name}
                className="checkbox checkbox-success checkbox-sm"
                checked={checked}
                onChange={onChange}
            />
            <span className="label-text font-medium">{field.label}</span>
        </label>
    );
}

function isChecked(value) {
    return value === 1 || value === '1' || value === true;
}

function CreateTapeGeneralSection() {
    const form = useCreateTapeStore((state) => state.form);
    const setField = useCreateTapeStore((state) => state.setField);

    const onTextChange = (event) => {
        const { name, value } = event.target;

        setField(name, value);
    };

    const onFlagChange = (event) => {
        const { name, checked } = event.target;
        setField(name, checked ? 1 : 0);
    };

    return (
        <div className="md:col-span-2 rounded-box border border-base-300">
            <div className="flex flex-col gap-4 border-b border-base-300 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h3 className="text-base font-semibold">Entry Metadata</h3>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:justify-end">
                    {FLAG_FIELDS.map((field) => (
                        <CheckboxField
                            key={field.name}
                            field={field}
                            checked={isChecked(form[field.name])}
                            onChange={onFlagChange}
                        />
                    ))}
                </div>
            </div>

            <div className="grid gap-4 p-4 md:grid-cols-2">
                {MAIN_FIELDS.map((field) => (
                    <TextField
                        key={field.name}
                        field={field}
                        value={form[field.name]}
                        onChange={onTextChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default CreateTapeGeneralSection;
