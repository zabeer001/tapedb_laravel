import React from 'react';
import useShowTapeStore from '../../_store/useShowTapeStore';

const fallbackValue = '-';

const GeneralRow = ({ label, value }) => (
    <div className="flex">
        <dt className="w-40 font-medium">{label}</dt>
        <dd>{value || fallbackValue}</dd>
    </div>
);

function ShowTapeGeneralSection() {
    const tape = useShowTapeStore((state) => state.tape);

    if (!tape) {
        return null;
    }

    return (
        <div className="rounded-box border border-base-300 bg-base-200 p-4">
            <h2 className="mb-3 text-xl font-bold">General</h2>
            <dl className="grid gap-2 text-sm">
                <GeneralRow label="ID" value={tape.id} />
                <GeneralRow label="User ID" value={tape.user_id} />
                <GeneralRow label="Name" value={tape.name} />
                <GeneralRow label="Title" value={tape.title} />
                <GeneralRow label="Year" value={tape.year} />
                <GeneralRow label="Distributor" value={tape.distributor} />
                <GeneralRow label="Guard Color" value={tape.guard_color} />
                <GeneralRow label="UPC" value={tape.upc} />
                <GeneralRow label="QA Checked" value={tape.qa_checked} />
                <GeneralRow label="Screener" value={tape.screener} />
                <GeneralRow label="First Printer" value={tape.first_printer} />
                <GeneralRow label="Approved" value={tape.approved ? 'Yes' : 'No'} />
            </dl>
        </div>
    );
}

export default ShowTapeGeneralSection;
