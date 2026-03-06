import React, { useEffect } from 'react';
import useTapesStore from '../_store/useTapesStore';
import TapesPageHeader from './layout/TapesPageHeader';
import TapesPageLoading from './layout/TapesPageLoading';
import TapesPageError from './layout/TapesPageError';
import TapesFilterSection from './sections/TapesFilterSection';
import TapesListSection from './sections/TapesListSection';
import TapesPaginationSection from './sections/TapesPaginationSection';

function TapesPage() {
    const loadTapes = useTapesStore((state) => state.loadTapes);
    const page = useTapesStore((state) => state.page);
    const filters = useTapesStore((state) => state.filters);
    const isLoading = useTapesStore((state) => state.isLoading);
    const error = useTapesStore((state) => state.error);

    useEffect(() => {
        loadTapes();
    }, [loadTapes, page, filters.search, filters.year, filters.qa_checked, filters.screener, filters.first_printer]);

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <TapesPageHeader />

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {isLoading ? <TapesPageLoading /> : null}
                    <TapesPageError message={error} />
                    <TapesFilterSection />

                    {!isLoading && !error ? (
                        <>
                            <TapesListSection />
                            <TapesPaginationSection />
                        </>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default TapesPage;
