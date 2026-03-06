import React, { useEffect, useMemo, useState } from 'react';
import { clearSession, apiRequest } from '../../shared/apiClient';
import useAuthHook from '../../shared/hooks/useAuthHook';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import themeOptions from '../../shared/themeOptions';

function BackendLayout({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'forest');
    const role = useMemo(() => localStorage.getItem('role') || 'admin', []);
    const { isBootstrapping } = useAuthHook();

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const signOut = async () => {
        try {
            await apiRequest('/api/signout', { method: 'POST', auth: true });
        } catch (error) {
            console.error('Sign out request failed:', error);
        } finally {
            clearSession();
            window.location.href = '/sign-in';
        }
    };

    if (isBootstrapping) {
        return (
            <main
                data-theme={theme}
                className="min-h-screen bg-base-200 text-base-content"
            />
        );
    }

    return (
        <main
            data-theme={theme}
            className="min-h-screen bg-base-200 text-base-content"
        >
            <div className="drawer lg:drawer-open">
                <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex min-h-screen flex-col">
                    <Navbar theme={theme} themes={themeOptions} setTheme={setTheme} signOut={signOut} />

                    <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>

                    <Footer role={role} />
                </div>

                <Sidebar />
            </div>
        </main>
    );
}

export default BackendLayout;
