import React from 'react';
import { Link } from '@inertiajs/react';

function CreateTapeHeader() {
    const userRole = localStorage.getItem('role') || 'user';

    return (
        <section className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-extrabold">Add Tape</h1>
                        <p className="mt-2 text-sm text-base-content/70">
                            Add a new tape and upload up to six images. Signed in as:{' '}
                            <span className="font-semibold uppercase">{userRole}</span>
                        </p>
                    </div>
                    <Link href="/dashbaord/tapes" className="btn btn-outline">
                        Back
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default CreateTapeHeader;
