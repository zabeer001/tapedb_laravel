import React, { useEffect, useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { fetchTape } from './api/tapeApi';

const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

function ShowTapePage() {
    const { tapeId } = usePage().props;
    const userRole = useMemo(() => localStorage.getItem('role') || 'user', []);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [tape, setTape] = useState(null);

    useEffect(() => {
        const loadTape = async () => {
            setIsLoading(true);

            try {
                const payload = await fetchTape(tapeId);
                setTape(payload?.data || null);
                setError('');
            } catch (err) {
                setError(err.message || 'Failed to load tape.');
            } finally {
                setIsLoading(false);
            }
        };

        loadTape();
    }, [tapeId]);

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-extrabold">Tape Details</h1>
                            <p className="mt-2 text-sm text-base-content/70">
                                Review tape metadata and uploaded images. Signed in as:{' '}
                                <span className="font-semibold uppercase">{userRole}</span>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/tapes" className="btn btn-outline">
                                Back
                            </Link>
                            <Link href={`/tapes/${tapeId}/edit`} className="btn btn-info btn-outline">
                                Edit
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {isLoading ? <p className="text-sm text-base-content/70">Loading tape...</p> : null}
                    {error ? <div className="alert alert-error py-2 text-sm">{error}</div> : null}

                    {!isLoading && !error && tape ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-box border border-base-300 bg-base-200 p-4">
                                <h2 className="mb-3 text-xl font-bold">General</h2>
                                <dl className="grid gap-2 text-sm">
                                    <div className="flex">
                                        <dt className="w-40 font-medium">ID</dt>
                                        <dd>{tape.id}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">User ID</dt>
                                        <dd>{tape.user_id || '-'}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">Name</dt>
                                        <dd>{tape.name || '-'}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">Title</dt>
                                        <dd>{tape.title || '-'}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">Year</dt>
                                        <dd>{tape.year || '-'}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">Distributor</dt>
                                        <dd>{tape.distributor || '-'}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">Guard Color</dt>
                                        <dd>{tape.guard_color || '-'}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">UPC</dt>
                                        <dd>{tape.upc || '-'}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">QA Checked</dt>
                                        <dd>{tape.qa_checked || '-'}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">Screener</dt>
                                        <dd>{tape.screener || '-'}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">First Printer</dt>
                                        <dd>{tape.first_printer || '-'}</dd>
                                    </div>
                                    <div className="flex">
                                        <dt className="w-40 font-medium">Approved</dt>
                                        <dd>{tape.approved ? 'Yes' : 'No'}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="rounded-box border border-base-300 bg-base-200 p-4">
                                <h2 className="mb-3 text-xl font-bold">Attributes</h2>
                                <dl className="grid gap-2 text-sm">
                                    <div>
                                        <p className="font-medium">Case</p>
                                        <p className="text-base-content/80">{tape.case_desc || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Seal</p>
                                        <p className="text-base-content/80">{tape.seal || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Sticker</p>
                                        <p className="text-base-content/80">{tape.sticker || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Watermarks</p>
                                        <p className="text-base-content/80">{tape.watermarks || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Etching</p>
                                        <p className="text-base-content/80">{tape.etching || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Notes</p>
                                        <p className="text-base-content/80">{tape.notes || '-'}</p>
                                    </div>
                                </dl>
                            </div>

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
                        </div>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default ShowTapePage;
