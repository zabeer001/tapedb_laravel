import React from 'react';
import { Link } from '@inertiajs/react';
import useTapesStore from '../../_store/useTapesStore';

function TapesListSection() {
    const tapes = useTapesStore((state) => state.tapes);
    const deletingId = useTapesStore((state) => state.deletingId);
    const deleteTape = useTapesStore((state) => state.deleteTape);

    const onDeleteTape = async (tapeId) => {
        if (!window.confirm(`Delete tape #${tapeId}?`)) {
            return;
        }

        await deleteTape(tapeId);
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Distributor</th>
                        <th>QA</th>
                        <th>Screener</th>
                        <th>Printer</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tapes.length ? (
                        tapes.map((tape) => (
                            <tr key={tape.id}>
                                <td>{tape.id}</td>
                                <td>{tape.name || '-'}</td>
                                <td>{tape.title || '-'}</td>
                                <td>{tape.year || '-'}</td>
                                <td>{tape.distributor || '-'}</td>
                                <td>{tape.qa_checked || '-'}</td>
                                <td>{tape.screener || '-'}</td>
                                <td>{tape.first_printer || '-'}</td>
                                <td className="text-right">
                                    <div className="flex flex-wrap justify-end gap-2">
                                        <Link href={`/dashbaord/tapes/${tape.id}`} className="btn btn-xs btn-outline">
                                            View
                                        </Link>
                                        <Link href={`/dashbaord/tapes/${tape.id}/edit`} className="btn btn-xs btn-info">
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-error"
                                            disabled={Boolean(deletingId === tape.id)}
                                            onClick={() => onDeleteTape(tape.id)}
                                        >
                                            {deletingId === tape.id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="py-8 text-center text-base-content/70">
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
