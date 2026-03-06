import React from 'react';
import useTapesStore from '../../_store/useTapesStore';

const QA_OPTIONS = ['Yes', 'No'];
const YEAR_OPTIONS = Array.from({ length: 70 }, (_, index) => String(2026 - index));

function TapesFilterSection() {
    const filters = useTapesStore((state) => state.filters);
    const setFilter = useTapesStore((state) => state.setFilter);
    const resetFilters = useTapesStore((state) => state.resetFilters);

  
    return (
        <section>
            <div className="mb-3 grid gap-2 lg:grid-cols-6">
                <label className="form-control">
                    <span className="label-text mb-2">Search</span>
                    <input
                        className="input input-bordered w-full"
                        placeholder="Search by name, title, distributor..."
                        value={filters.search}
                        onChange={(event) => setFilter('search', event.target.value)}
                    />
                </label>

                

                <label className="form-control">
                    <span className="label-text mb-2">QA Checked</span>
                    <select
                        className="select select-bordered w-full"
                        value={filters.qa_checked}
                        onChange={(event) => setFilter('qa_checked', event.target.value)}
                    >
                        <option value="">Any</option>
                        {QA_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option || 'Any'}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="form-control">
                    <span className="label-text mb-2">Screener</span>
                    <input
                        className="input input-bordered w-full"
                        placeholder="S1"
                        value={filters.screener}
                        onChange={(event) => setFilter('screener', event.target.value)}
                    />
                </label>

                <label className="form-control">
                    <span className="label-text mb-2">First Printer</span>
                    <input
                        className="input input-bordered w-full"
                        placeholder="P1"
                        value={filters.first_printer}
                        onChange={(event) => setFilter('first_printer', event.target.value)}
                    />
                </label>
                <label className="form-control">
                    <span className="label-text mb-2">Year</span>
                    <select
                        className="select select-bordered w-full"
                        value={filters.year}
                        onChange={(event) => setFilter('year', event.target.value)}
                    >
                        <option value="">Any</option>
                        {YEAR_OPTIONS.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    type="button"
                    className="btn btn-outline flex-shrink-0 self-end"
                    onClick={resetFilters}
                >
                    Reset Filters
                </button>
            </div>
        </section>
    );
}

export default TapesFilterSection;
