import React from 'react';
import { Link, usePage } from '@inertiajs/react';

function EditTapeHeader() {
    const { tapeId } = usePage().props;
    const role = localStorage.getItem('role') || 'user';

    return (
        <section className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-extrabold">Edit Tape</h1>
                        <p className="mt-2 text-sm text-base-content/70">
                            Update tape metadata and uploaded images. Signed in as:{' '}
                            <span className="font-semibold uppercase">{role}</span>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/dashbaord/tapes" className="btn btn-outline">
                            Back
                        </Link>
                        <Link href={`/dashbaord/tapes/${tapeId}`} className="btn btn-ghost">
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EditTapeHeader;
