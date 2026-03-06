import React, { useMemo } from 'react';

function SettingsPage() {
    const userRole = useMemo(() => localStorage.getItem('role') || 'user', []);

    return (
        <div className="mx-auto max-w-7xl">
            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-3xl font-extrabold">Settings</h1>
                    <p className="text-sm text-base-content/70">
                        Configure app-level preferences and controls. Signed in as: <span className="font-semibold uppercase">{userRole}</span>
                    </p>
                </div>
            </section>
        </div>
    );
}

export default SettingsPage;
