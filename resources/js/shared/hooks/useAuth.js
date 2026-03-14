import { useEffect, useState } from 'react';
import { getAccessToken } from '../apiClient';

function readAuthState() {
    return Boolean(getAccessToken());
}

function readRole() {
    return (localStorage.getItem('role') || 'user').toLowerCase();
}

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(readAuthState);
    const [role, setRole] = useState(readRole);

    useEffect(() => {
        const syncAuthState = () => {
            setIsAuthenticated(readAuthState());
            setRole(readRole());
        };

        window.addEventListener('storage', syncAuthState);
        window.addEventListener('focus', syncAuthState);

        return () => {
            window.removeEventListener('storage', syncAuthState);
            window.removeEventListener('focus', syncAuthState);
        };
    }, []);

    return {
        isAuthenticated,
        role,
        isAdminOrSuperadmin: role === 'admin' || role === 'superadmin',
    };
}
