import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { deleteTape, fetchTapes } from './api/tapeApi';

const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

function TapesPage() {
    const userRole = useMemo(() => localStorage.getItem('role') || 'user', []);
    const initialFilters = useMemo(() => {
        const params = new URLSearchParams(window.location.search);

        return {
            search: params.get('search') || '',
            year: params.get('year') || '',
            qa_checked: params.get('qa_checked') || '',
            screener: params.get('screener') || '',
            first_printer: params.get('first_printer') || '',
        };
    }, []);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [tapes, setTapes] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });
    const [searchValue, setSearchValue] = useState(initialFilters.search);
    const [activeSearch, setActiveSearch] = useState(initialFilters.search);
    const [yearValue, setYearValue] = useState(initialFilters.year);
    const [activeYear, setActiveYear] = useState(initialFilters.year);
    const [qaValue, setQaValue] = useState(initialFilters.qa_checked);
    const [activeQa, setActiveQa] = useState(initialFilters.qa_checked);
    const [screenerValue, setScreenerValue] = useState(initialFilters.screener);
    const [activeScreener, setActiveScreener] = useState(initialFilters.screener);
    const [printerValue, setPrinterValue] = useState(initialFilters.first_printer);
    const [activePrinter, setActivePrinter] = useState(initialFilters.first_printer);
    const filterDebounce = useRef(null);
    const didMount = useRef(false);

    const buildImageCount = (tape) => IMAGE_FIELDS.filter((field) => Boolean(tape[field])).length;

    const syncFilters = () => {
        const params = new URLSearchParams(window.location.search);

        if (activeSearch) {
            params.set('search', activeSearch);
        } else {
            params.delete('search');
        }

        if (activeYear) {
            params.set('year', activeYear);
        } else {
            params.delete('year');
        }

        if (activeQa) {
            params.set('qa_checked', activeQa);
        } else {
            params.delete('qa_checked');
        }

        if (activeScreener) {
            params.set('screener', activeScreener);
        } else {
            params.delete('screener');
        }

        if (activePrinter) {
            params.set('first_printer', activePrinter);
        } else {
            params.delete('first_printer');
        }

        const nextUrl = params.toString() ? `/tapes?${params.toString()}` : '/tapes';
        window.history.replaceState({}, '', nextUrl);
    };

    const loadTapes = async (page = 1) => {
        setIsLoading(true);

        try {
            const payload = await fetchTapes({
                page,
                search: activeSearch,
                year: activeYear,
                qa_checked: activeQa,
                screener: activeScreener,
                first_printer: activePrinter,
            });

            const data = payload?.data;
            setTapes(Array.isArray(data?.data) ? data.data : []);
            setPagination({
                current_page: Number(data?.current_page || 1),
                last_page: Number(data?.last_page || 1),
            });
            setError('');
            syncFilters();
        } catch (err) {
            setError(err.message || 'Failed to load tapes.');
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async (tape) => {
        const yes = window.confirm(`Delete tape "${tape.title || tape.name || 'Untitled'}"?`);

        if (!yes) {
            return;
        }

        setError('');

        try {
            const payload = await deleteTape(tape.id);
            setMessage(payload?.message || 'Tape deleted.');
            await loadTapes(pagination.current_page || 1);
        } catch (err) {
            setError(err.message || 'Failed to delete tape.');
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.get('created') === '1') {
            setMessage('Tape created successfully.');
            params.delete('created');
            const nextUrl = params.toString() ? `/tapes?${params.toString()}` : '/tapes';
            window.history.replaceState({}, '', nextUrl);
        }

        if (params.get('updated') === '1') {
            setMessage('Tape updated successfully.');
            params.delete('updated');
            const nextUrl = params.toString() ? `/tapes?${params.toString()}` : '/tapes';
            window.history.replaceState({}, '', nextUrl);
        }
    }, []);

    useEffect(() => {
        loadTapes(1);
    }, []);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }

        const nextSearch = searchValue.trim();
        const nextYear = yearValue.trim();
        const nextQa = qaValue.trim();
        const nextScreener = screenerValue.trim();
        const nextPrinter = printerValue.trim();

        if (filterDebounce.current) {
            window.clearTimeout(filterDebounce.current);
        }

        filterDebounce.current = window.setTimeout(() => {
            setMessage('');
            setError('');
            setActiveSearch(nextSearch);
            setActiveYear(nextYear);
            setActiveQa(nextQa);
            setActiveScreener(nextScreener);
            setActivePrinter(nextPrinter);
            loadTapes(1);
        }, 350);
    }, [searchValue, yearValue, qaValue, screenerValue, printerValue]);

    const openPage = (page) => {
        if (page < 1 || page > pagination.last_page) {
            return;
        }

        loadTapes(page);
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-extrabold">Tapes</h1>
                            <p className="mt-2 text-sm text-base-content/70">
                                Manage tape records and media images. Signed in as:{' '}
                                <span className="font-semibold uppercase">{userRole}</span>
                            </p>
                        </div>
                        <Link href="/tapes/create" className="btn btn-success">
                            Add Tape
                        </Link>
                    </div>
                </div>
            </section>

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-5">
                        <label className="form-control">
                            <span className="label-text mb-1 text-xs uppercase">Search</span>
                            <input
                                type="search"
                                className="input input-bordered input-sm"
                                placeholder="Name / title / distributor"
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                            />
                        </label>
                        <label className="form-control">
                            <span className="label-text mb-1 text-xs uppercase">Year</span>
                            <input
                                type="text"
                                className="input input-bordered input-sm"
                                placeholder="e.g. 1985"
                                value={yearValue}
                                onChange={(event) => setYearValue(event.target.value)}
                            />
                        </label>
                        <label className="form-control">
                            <span className="label-text mb-1 text-xs uppercase">QA Checked</span>
                            <input
                                type="text"
                                className="input input-bordered input-sm"
                                placeholder="e.g. Yes"
                                value={qaValue}
                                onChange={(event) => setQaValue(event.target.value)}
                            />
                        </label>
                        <label className="form-control">
                            <span className="label-text mb-1 text-xs uppercase">Screener</span>
                            <input
                                type="text"
                                className="input input-bordered input-sm"
                                placeholder="e.g. T1"
                                value={screenerValue}
                                onChange={(event) => setScreenerValue(event.target.value)}
                            />
                        </label>
                        <label className="form-control">
                            <span className="label-text mb-1 text-xs uppercase">First Printer</span>
                            <input
                                type="text"
                                className="input input-bordered input-sm"
                                placeholder="e.g. P1"
                                value={printerValue}
                                onChange={(event) => setPrinterValue(event.target.value)}
                            />
                        </label>
                    </div>

                    {message ? <div className="alert alert-success mb-4 py-2 text-sm">{message}</div> : null}
                    {error ? <div className="alert alert-error mb-4 py-2 text-sm">{error}</div> : null}

                    {isLoading ? <p className="text-sm text-base-content/70">Loading tapes...</p> : null}

                    {!isLoading ? (
                        <div className="overflow-x-auto rounded-box border border-base-300">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Year</th>
                                        <th>Distributor</th>
                                        <th>QA</th>
                                        <th>Images</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tapes.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center text-base-content/70">
                                                No tapes found.
                                            </td>
                                        </tr>
                                    ) : (
                                        tapes.map((tape) => {
                                            const imageCount = buildImageCount(tape);

                                            return (
                                                <tr key={tape.id}>
                                                    <td>{tape.id}</td>
                                                    <td>{tape.name || '-'}</td>
                                                    <td>{tape.title || '-'}</td>
                                                    <td>{tape.year || '-'}</td>
                                                    <td>{tape.distributor || '-'}</td>
                                                    <td>{tape.qa_checked || '-'}</td>
                                                    <td>
                                                        <span className="badge badge-outline">{imageCount} / 6</span>
                                                    </td>
                                                    <td>
                                                        <div className="flex flex-wrap gap-2">
                                                            <Link href={`/tapes/${tape.id}`} className="btn btn-xs btn-outline">
                                                                Show
                                                            </Link>
                                                            <Link href={`/tapes/${tape.id}/edit`} className="btn btn-xs btn-info btn-outline">
                                                                Edit
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="btn btn-xs btn-error btn-outline"
                                                                onClick={() => onDelete(tape)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : null}

                    {pagination.last_page > 1 ? (
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline"
                                disabled={pagination.current_page <= 1}
                                onClick={() => openPage(pagination.current_page - 1)}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline"
                                disabled={pagination.current_page >= pagination.last_page}
                                onClick={() => openPage(pagination.current_page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default TapesPage;
