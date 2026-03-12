import React from 'react';
import { Link } from '@inertiajs/react';
import useTapesStore from '../../_store/useTapesStore';

function TapesListSection() {
    const role = (localStorage.getItem('role') || 'user').toLowerCase();
    const canEditTape = ['admin', 'superadmin', 'editor'].includes(role);
    const canDeleteTape = ['admin', 'superadmin'].includes(role);
    const tapes = useTapesStore((state) => state.tapes);
    const deletingId = useTapesStore((state) => state.deletingId);
    const deleteTape = useTapesStore((state) => state.deleteTape);

    const onDeleteTape = async (tapeId) => {
        if (!canDeleteTape) {
            return;
        }

        if (!window.confirm(`Delete tape #${tapeId}?`)) {
            return;
        }

        await deleteTape(tapeId);
    };

    const formatBinaryFlag = (value) => {
        if (value === 1 || value === '1') {
            return 'Yes';
        }

        if (value === 0 || value === '0') {
            return 'No';
        }

        return '-';
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-fixed w-full">
                <thead>
                    <tr>
                        <th className="w-16 max-w-16">ID</th>
                        <th className="w-80 max-w-80">Title</th>
                        <th className="w-20 max-w-20">Year</th>
                        <th className="w-72 max-w-72">Distributor</th>
                        <th className="w-20 max-w-20">QA</th>
                        <th className="w-24 max-w-24">Screener</th>
                        <th className="w-24 max-w-24">Printer</th>
                        <th className="w-44 max-w-44 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tapes.length ? (
                        tapes.map((tape) => (
                            <tr key={tape.id}>
                                <td className="w-16 max-w-16 align-top">
                                    <div className="whitespace-normal break-words leading-snug">{tape.id}</div>
                                </td>
                                <td className="w-80 max-w-80 align-top">
                                    <div className="whitespace-normal break-words leading-snug">{tape.title || '-'}</div>
                                </td>
                                <td className="w-20 max-w-20 align-top">
                                    <div className="whitespace-normal break-words leading-snug">{tape.year || '-'}</div>
                                </td>
                                <td className="w-72 max-w-72 align-top">
                                    <div className="whitespace-normal break-words leading-snug">{tape.distributor || '-'}</div>
                                </td>
                                <td className="w-20 max-w-20 align-top">
                                    <div className="whitespace-normal break-words leading-snug">{formatBinaryFlag(tape.qa_checked)}</div>
                                </td>
                                <td className="w-24 max-w-24 align-top">
                                    <div className="whitespace-normal break-words leading-snug">{formatBinaryFlag(tape.screener)}</div>
                                </td>
                                <td className="w-24 max-w-24 align-top">
                                    <div className="whitespace-normal break-words leading-snug">{formatBinaryFlag(tape.first_printer)}</div>
                                </td>
                                <td className="w-44 max-w-44 text-right align-top">
                                    <div className="flex flex-nowrap justify-end gap-1 whitespace-nowrap">
                                        <Link href={`/dashbaord/tapes/${tape.id}`} className="btn btn-xs btn-outline">
                                            View
                                        </Link>
                                        {canEditTape ? (
                                            <Link href={`/dashbaord/tapes/${tape.id}/edit`} className="btn btn-xs btn-info">
                                                Edit
                                            </Link>
                                        ) : null}
                                        {canDeleteTape ? (
                                            <button
                                                type="button"
                                                className="btn btn-xs btn-error"
                                                disabled={Boolean(deletingId === tape.id)}
                                                onClick={() => onDeleteTape(tape.id)}
                                            >
                                                {deletingId === tape.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        ) : null}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="py-8 text-center text-base-content/70">
                                No tapes found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TapesListSection;
