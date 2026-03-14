import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import useEditTapeStore from '../_store/useEditTapeStore';
import EditTapeHeader from './layout/EditTapeHeader';
import EditTapeLoading from './layout/EditTapeLoading';
import EditTapeError from './layout/EditTapeError';
import EditTapeGeneralSection from './sections/EditTapeGeneralSection';
import EditTapeAttributesSection from './sections/EditTapeAttributesSection';
import EditTapeImageSection from './sections/EditTapeImageSection';
import useAuth from '../../../../../shared/hooks/useAuth';

function EditTape() {
    const { tapeId } = usePage().props;
    const { isAuthenticated, role } = useAuth();
    const canAccessEdit = isAuthenticated && ['admin', 'superadmin', 'editor'].includes(role);
    const isLoading = useEditTapeStore((state) => state.isLoading);
    const isSaving = useEditTapeStore((state) => state.isSaving);
    const error = useEditTapeStore((state) => state.error);
    const submit = useEditTapeStore((state) => state.submit);
    const loadTape = useEditTapeStore((state) => state.loadTape);
    const reset = useEditTapeStore((state) => state.reset);

    useEffect(() => {
        if (!canAccessEdit) {
            return;
        }

        if (!tapeId) {
            return;
        }

        loadTape(tapeId);

        return () => {
            reset();
        };
    }, [canAccessEdit, loadTape, reset, tapeId]);

    const onSubmit = async (event) => {
        event.preventDefault();

        const ok = await submit(tapeId);

        if (ok) {
            window.location.href = `/dashbaord/tapes/${tapeId}?updated=1`;
        }
    };

    if (!canAccessEdit) {
        window.location.replace('/dashbaord/unauthorized');
        return null;
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <EditTapeHeader />

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {isLoading ? <EditTapeLoading /> : null}
                    <EditTapeError message={error} />

                    {!isLoading && !error ? (
                        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
                            <EditTapeGeneralSection />
                            <EditTapeAttributesSection />
                            <EditTapeImageSection />

                            <div className="md:col-span-2">
                                <button type="submit" className="btn btn-success" disabled={isSaving}>
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default EditTape;
