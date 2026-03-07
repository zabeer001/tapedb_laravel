import { useEffect, useState } from 'react';
import { getAccessToken } from '../apiClient';

function readAuthState() {
    return Boolean(getAccessToken());
}

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(readAuthState);

    useEffect(() => {
        const syncAuthState = () => {
            setIsAuthenticated(readAuthState());
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
    };
}
