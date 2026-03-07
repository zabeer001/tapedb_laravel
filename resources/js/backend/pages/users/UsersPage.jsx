import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { RotateCcw, Search } from 'lucide-react';

const ROLE_OPTIONS = ['all', 'user', 'admin', 'superadmin'];

function UsersPageHeader({ userRole }) {
    return (
        <section className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-extrabold">Users</h1>
                        <p className="mt-2 text-sm text-base-content/70">
                            Manage your platform users here. Signed in as:{' '}
                            <span className="font-semibold uppercase">{userRole}</span>
                        </p>
                    </div>
                    <Link href="/dashbaord/users/create" className="btn btn-sm btn-neutral text-neutral-content">
                        Add User
                    </Link>
                </div>
            </div>
        </section>
    );
}

function UsersPageLoading() {
    return <p className="text-sm text-base-content/70">Loading users...</p>;
}

function UsersPageError({ message }) {
    if (!message) {
        return null;
    }

    return <div className="alert alert-error py-2 text-sm">{message}</div>;
}

function UsersFilterSection({ searchValue, roleValue, onSearchChange, onRoleChange, onReset }) {
    return (
        <section className="mb-4 rounded-xl border border-base-300 bg-base-100 p-2 shadow-sm">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                <label className="input input-bordered input-sm flex h-9 min-h-9 w-full items-center gap-1.5 rounded-lg border-base-300 bg-base-100 px-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] lg:flex-1">
                    <Search className="size-3.5 text-base-content/40" />
                    <input
                        type="search"
                        className="grow text-xs placeholder:text-base-content/40"
                        placeholder="Search by user name or email"
                        value={searchValue}
                        onChange={onSearchChange}
                    />
                </label>

                <div className="flex flex-col gap-2 sm:flex-row lg:w-auto">
                    <select
                        className="select select-bordered select-sm h-9 min-h-9 w-full rounded-lg border-base-300 bg-base-100 px-2 text-xs shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:w-40"
                        value={roleValue}
                        onChange={onRoleChange}
                    >
                        {ROLE_OPTIONS.map((role) => (
                            <option key={role} value={role}>
                                {role === 'all' ? 'All roles' : role.toUpperCase()}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        className="btn btn-sm h-9 min-h-9 rounded-lg border border-base-300 bg-base-100 px-3 text-xs font-medium text-base-content shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:border-base-content/20 hover:bg-base-200"
                        onClick={onReset}
                    >
                        <RotateCcw className="size-3.5" />
                        Reset
                    </button>
                </div>
            </div>
        </section>
    );
}

function UsersListSection({ users, onDeleteUser }) {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full table-fixed">
                <colgroup>
                    <col className="w-[8%]" />
                    <col className="w-[24%]" />
                    <col className="w-[30%]" />
                    <col className="w-[12%]" />
                    <col className="w-[26%]" />
                </colgroup>
                <thead>
                    <tr>
                        <th className="whitespace-nowrap">ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="whitespace-nowrap">Role</th>
                        <th className="pl-[5%] text-center ">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="py-8 text-center text-base-content/70">
                                No users found.
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td className="whitespace-nowrap">{user.id}</td>
                                <td className="font-medium">{user.name}</td>
                                <td className="truncate">{user.email}</td>
                                <td className="whitespace-nowrap uppercase">{user.role || 'user'}</td>
                                <td className="whitespace-nowrap text-right">
                                    <div className="flex flex-wrap justify-end gap-2">
                                        <Link
                                            href={`/dashbaord/users/${user.id}`}
                                            className="btn btn-xs border-neutral bg-white text-neutral hover:bg-neutral hover:text-white"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/dashbaord/users/${user.id}/edit`}
                                            className="btn btn-xs border-sky-400 bg-sky-400 text-white hover:border-sky-500 hover:bg-sky-500"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-xs border-pink-500 bg-pink-500 text-white hover:border-pink-600 hover:bg-pink-600"
                                            onClick={() => onDeleteUser(user)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

function UsersPage() {
    const userRole = useMemo(() => localStorage.getItem('role') || 'user', []);
    const initialFilters = useMemo(() => {
        const params = new URLSearchParams(window.location.search);

        return {
            updated: params.get('updated') === '1',
            search: params.get('search') || '',
            role: params.get('role') || 'all',
        };
    }, []);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(initialFilters.updated ? 'User updated successfully.' : '');
    const [searchValue, setSearchValue] = useState(initialFilters.search);
    const [activeSearch, setActiveSearch] = useState(initialFilters.search);
    const [roleValue, setRoleValue] = useState(initialFilters.role);
    const [activeRole, setActiveRole] = useState(initialFilters.role);
    const didMountFilters = useRef(false);

    const getErrorMessage = (payload, fallbackMessage) => {
        if (payload?.message) {
            return payload.message;
        }

        const firstValidationError = Object.values(payload?.errors || {})[0];

        if (Array.isArray(firstValidationError) && firstValidationError[0]) {
            return firstValidationError[0];
        }

        return fallbackMessage;
    };

    const requestJson = async (url, options = {}, fallbackMessage = 'Request failed.') => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            throw new Error('No access token found. Please sign in again.');
        }

        const response = await fetch(url, {
            ...options,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                ...(options.headers || {}),
            },
        });

        let payload = null;

        try {
            payload = await response.json();
        } catch (parseError) {
            payload = null;
        }

        if (!response.ok) {
            throw new Error(getErrorMessage(payload, fallbackMessage));
        }

        return payload;
    };

    const loadUsers = async (search = '', role = 'all') => {
        setIsLoading(true);

        try {
            const createUsersUrl = (page) => {
                const params = new URLSearchParams({ page: String(page) });

                if (search) {
                    params.set('search', search);
                }

                if (role && role !== 'all') {
                    params.set('role', role);
                }

                return `/api/users?${params.toString()}`;
            };

            const firstPayload = await requestJson(createUsersUrl(1), {}, 'Failed to load users.');
            const firstPage = firstPayload?.data;
            const allUsers = Array.isArray(firstPage?.data) ? [...firstPage.data] : [];
            const currentPage = Number(firstPage?.current_page || 1);
            const lastPage = Number(firstPage?.last_page || 1);

            if (lastPage > currentPage) {
                const pageRequests = [];

                for (let page = currentPage + 1; page <= lastPage; page += 1) {
                    pageRequests.push(requestJson(createUsersUrl(page), {}, 'Failed to load users.'));
                }

                const pagePayloads = await Promise.all(pageRequests);

                for (const pagePayload of pagePayloads) {
                    const pageUsers = Array.isArray(pagePayload?.data?.data) ? pagePayload.data.data : [];
                    allUsers.push(...pageUsers);
                }
            }

            setUsers(allUsers);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to load users.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsers(initialFilters.search, initialFilters.role);
    }, [initialFilters]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.get('created') === '1') {
            setMessage('User created successfully.');
        }
    }, []);

    const syncPageQuery = (search, role) => {
        const params = new URLSearchParams(window.location.search);

        if (search) {
            params.set('search', search);
        } else {
            params.delete('search');
        }

        if (role && role !== 'all') {
            params.set('role', role);
        } else {
            params.delete('role');
        }

        params.delete('updated');

        const query = params.toString();
        const nextUrl = query ? `/dashbaord/users?${query}` : '/dashbaord/users';
        window.history.replaceState({}, '', nextUrl);
    };

    useEffect(() => {
        if (!didMountFilters.current) {
            didMountFilters.current = true;
            return;
        }

        const nextSearch = searchValue.trim();
        const timeoutId = window.setTimeout(() => {
            setMessage('');
            setError('');
            setActiveSearch(nextSearch);
            setActiveRole(roleValue);
            syncPageQuery(nextSearch, roleValue);
            loadUsers(nextSearch, roleValue);
        }, 300);

        return () => window.clearTimeout(timeoutId);
    }, [searchValue, roleValue]);

    const onDeleteUser = async (user) => {
        const ok = window.confirm(`Delete ${user.name}?`);

        if (!ok) {
            return;
        }

        setError('');
        setMessage('');

        try {
            const payload = await requestJson(
                `/api/users/${user.id}`,
                { method: 'DELETE' },
                'Failed to delete user.',
            );

            setMessage(payload?.message || 'User deleted successfully.');
            await loadUsers(activeSearch, activeRole);
        } catch (err) {
            setError(err.message || 'Failed to delete user.');
        }
    };

    const onResetFilters = () => {
        setSearchValue('');
        setRoleValue('all');
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <UsersPageHeader userRole={userRole} />

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {message ? <div className="alert alert-success py-2 text-sm">{message}</div> : null}
                    {isLoading ? <UsersPageLoading /> : null}
                    <UsersPageError message={error} />

                    <UsersFilterSection
                        searchValue={searchValue}
                        roleValue={roleValue}
                        onSearchChange={(event) => setSearchValue(event.target.value)}
                        onRoleChange={(event) => setRoleValue(event.target.value)}
                        onReset={onResetFilters}
                    />

                    {!isLoading && !error ? (
                        <UsersListSection users={users} onDeleteUser={onDeleteUser} />
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default UsersPage;
