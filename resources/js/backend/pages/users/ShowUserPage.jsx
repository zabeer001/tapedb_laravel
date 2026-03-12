import React, { useEffect, useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import useAuth from '../../../shared/hooks/useAuth';

function ShowUserPage() {
    const { userId } = usePage().props;
    const { isAuthenticated } = useAuth();
    const userRole = useMemo(() => localStorage.getItem('role') || 'user', []);
    const canAccessUsers = isAuthenticated && ['admin', 'superadmin'].includes(userRole.toLowerCase());
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const requestJson = async (url, fallbackMessage = 'Request failed.') => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            throw new Error('No access token found. Please sign in again.');
        }

        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        let payload = null;

        try {
            payload = await response.json();
        } catch (parseError) {
            payload = null;
        }

        if (!response.ok) {
            throw new Error(payload?.message || fallbackMessage);
        }

        return payload;
    };

    useEffect(() => {
        if (!canAccessUsers) {
            return;
        }

        const loadUser = async () => {
            setIsLoading(true);

            try {
                const payload = await requestJson(`/api/users/${userId}`, 'Failed to load user details.');
                setUser(payload?.data || null);
                setError('');
            } catch (err) {
                setError(err.message || 'Failed to load user details.');
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, [userId, canAccessUsers]);

    if (!canAccessUsers) {
        window.location.replace('/dashbaord/unauthorized');
        return null;
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-extrabold">User Details</h1>
                            <p className="mt-2 text-sm text-base-content/70">
                                Review this user record. Signed in as: <span className="font-semibold uppercase">{userRole}</span>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/dashbaord/users" className="btn btn-outline">Back</Link>
                            <Link href={`/dashbaord/users/${userId}/edit`} className="btn btn-info btn-outline">Edit</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {isLoading ? <p className="text-sm text-base-content/70">Loading user...</p> : null}
                    {error ? <div className="alert alert-error py-2 text-sm">{error}</div> : null}

                    {!isLoading && !error && user ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="stats border border-base-300 bg-base-200">
                                <div className="stat">
                                    <div className="stat-title">User ID</div>
                                    <div className="stat-value text-2xl">{user.id}</div>
                                </div>
                            </div>
                            <div className="stats border border-base-300 bg-base-200">
                                <div className="stat">
                                    <div className="stat-title">Role</div>
                                    <div className="stat-value text-2xl uppercase">{user.role || 'user'}</div>
                                </div>
                            </div>
                            <div className="stats border border-base-300 bg-base-200">
                                <div className="stat">
                                    <div className="stat-title">Name</div>
                                    <div className="stat-value text-2xl">{user.name}</div>
                                </div>
                            </div>
                            <div className="stats border border-base-300 bg-base-200">
                                <div className="stat">
                                    <div className="stat-title">Email</div>
                                    <div className="stat-value text-2xl">{user.email}</div>
                                </div>
                            </div>
                            <div className="stats border border-base-300 bg-base-200 md:col-span-2">
                                <div className="stat">
                                    <div className="stat-title">Created</div>
                                    <div className="stat-value text-2xl">
                                        {user.created_at ? new Date(user.created_at).toLocaleString() : '-'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default ShowUserPage;
