import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import useShowTapeStore from '../_store/useShowTapeStore';
import ShowTapeHeader from './layout/ShowTapeHeader';
import ShowTapeLoading from './layout/ShowTapeLoading';
import ShowTapeError from './layout/ShowTapeError';
import ShowTapeGeneralSection from './sections/ShowTapeGeneralSection';
import ShowTapeAttributesSection from './sections/ShowTapeAttributesSection';
import ShowTapeImageSection from './sections/ShowTapeImageSection';

function ShowTape() {
    const { tapeId } = usePage().props;
    const isLoading = useShowTapeStore((state) => state.isLoading);
    const error = useShowTapeStore((state) => state.error);
    const loadTape = useShowTapeStore((state) => state.loadTape);
    const reset = useShowTapeStore((state) => state.reset);

    useEffect(() => {
        loadTape(tapeId);

        return () => reset();
    }, [loadTape, tapeId, reset]);

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <ShowTapeHeader />

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {isLoading ? <ShowTapeLoading /> : null}
                    <ShowTapeError message={error} />

                    {!isLoading && !error ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            <ShowTapeGeneralSection />
                            <ShowTapeAttributesSection />
                            <ShowTapeImageSection />
                        </div>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default ShowTape;
