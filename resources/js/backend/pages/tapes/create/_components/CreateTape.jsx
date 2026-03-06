import React, { useEffect } from 'react';
import CreateTapeHeader from './layout/CreateTapeHeader';
import CreateTapeError from './layout/CreateTapeError';
import CreateTapeGeneralSection from './sections/CreateTapeGeneralSection';
import CreateTapeAttributesSection from './sections/CreateTapeAttributesSection';
import CreateTapeImageSection from './sections/CreateTapeImageSection';
import useCreateTapeStore from '../_store/useCreateTapeStore';

function CreateTape() {
    const isSaving = useCreateTapeStore((state) => state.isSaving);
    const error = useCreateTapeStore((state) => state.error);
    const submit = useCreateTapeStore((state) => state.submit);
    const reset = useCreateTapeStore((state) => state.reset);

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    const onSubmit = async (event) => {
        event.preventDefault();

        const ok = await submit();

        if (ok) {
            window.location.href = '/dashbaord/tapes?created=1';
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <CreateTapeHeader />

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <CreateTapeError message={error} />

                    <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
                        <CreateTapeGeneralSection />
                        <CreateTapeAttributesSection />
                        <CreateTapeImageSection />

                        <div className="md:col-span-2">
                            <button type="submit" className="btn btn-success" disabled={isSaving}>
                                {isSaving ? 'Creating...' : 'Create Tape'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default CreateTape;
