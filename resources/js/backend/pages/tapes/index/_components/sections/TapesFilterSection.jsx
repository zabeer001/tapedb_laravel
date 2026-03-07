import React from 'react';
import { RotateCcw, Search } from 'lucide-react';
import useTapesStore from '../../_store/useTapesStore';

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
];

const QA_OPTIONS = [
    { value: '', label: 'All QA' },
    { value: 'Yes', label: 'QA: Yes' },
    { value: 'No', label: 'QA: No' },
];

const PER_PAGE_OPTIONS = [10, 15, 25, 50];

function TapesFilterSection() {
    const filters = useTapesStore((state) => state.filters);
    const perPage = useTapesStore((state) => state.perPage);
    const setFilter = useTapesStore((state) => state.setFilter);
    const setPerPage = useTapesStore((state) => state.setPerPage);
    const resetFilters = useTapesStore((state) => state.resetFilters);

    return (
        <section className="mb-4 rounded-xl border border-base-300 bg-base-100 p-2 shadow-sm">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                <label className="input input-bordered input-sm flex h-9 min-h-9 w-full items-center gap-1.5 rounded-lg border-base-300 bg-base-100 px-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] lg:flex-1">
                    <Search className="size-3.5 text-base-content/40" />
                    <input
                        type="text"
                        className="grow text-xs placeholder:text-base-content/40"
                        placeholder="Search title, distributor, UPC..."
                        value={filters.search}
                        onChange={(event) => setFilter('search', event.target.value)}
                    />
                </label>

                <div className="flex flex-col gap-2 sm:flex-row lg:w-auto">
                    <select
                        className="select select-bordered select-sm h-9 min-h-9 w-full rounded-lg border-base-300 bg-base-100 px-2 text-xs shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:w-36"
                        value={filters.sort}
                        onChange={(event) => setFilter('sort', event.target.value)}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <select
                        className="select select-bordered select-sm h-9 min-h-9 w-full rounded-lg border-base-300 bg-base-100 px-2 text-xs shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:w-32"
                        value={filters.qa_checked}
                        onChange={(event) => setFilter('qa_checked', event.target.value)}
                    >
                        {QA_OPTIONS.map((option) => (
                            <option key={option.value || 'all'} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <select
                        className="select select-bordered select-sm h-9 min-h-9 w-full rounded-lg border-base-300 bg-base-100 px-2 text-xs shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:w-24"
                        value={String(perPage)}
                        onChange={(event) => setPerPage(Number(event.target.value))}
                    >
                        {PER_PAGE_OPTIONS.map((size) => (
                            <option key={size} value={size}>
                                {size} / page
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        className="btn btn-sm h-9 min-h-9 rounded-lg border border-base-300 bg-base-100 px-3 text-xs font-medium text-base-content shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:border-base-content/20 hover:bg-base-200"
                        onClick={resetFilters}
                    >
                        <RotateCcw className="size-3.5" />
                        Reset
                    </button>
                </div>
            </div>
        </section>
    );
}

export default TapesFilterSection;
