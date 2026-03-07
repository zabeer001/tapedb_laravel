import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import FrontendLayout from './frontend/layouts/FrontendLayout';
import BackendLayout from './backend/layouts/BackendLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const frontendPages = import.meta.glob('./frontend/pages/**/*.jsx');
const commonPages = import.meta.glob('./common/**/*.jsx');
const backendPages = import.meta.glob('./backend/pages/**/*.jsx');

function resolveCommonLayout(pageNode) {
    const explicitContext = pageNode?.props?.layoutContext;
    if (explicitContext === 'backend') {
        return <BackendLayout>{pageNode}</BackendLayout>;
    }

    if (explicitContext === 'frontend') {
        return <FrontendLayout>{pageNode}</FrontendLayout>;
    }

    const currentPath = window.location.pathname || '/';
    if (currentPath.startsWith('/dashbaord')) {
        return <BackendLayout>{pageNode}</BackendLayout>;
    }

    return <FrontendLayout>{pageNode}</FrontendLayout>;
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        if (name.startsWith('common/')) {
            const page = await resolvePageComponent(`./${name}.jsx`, commonPages);
            page.default.layout = page.default.layout || ((pageNode) => resolveCommonLayout(pageNode));
            return page;
        }

        if (name.startsWith('frontend/pages/')) {
            const page = await resolvePageComponent(`./${name}.jsx`, frontendPages);
            page.default.layout = page.default.layout || ((pageNode) => <FrontendLayout>{pageNode}</FrontendLayout>);
            return page;
        }

        if (name.startsWith('backend/pages/')) {
            const page = await resolvePageComponent(`./${name}.jsx`, backendPages);
            page.default.layout = page.default.layout || ((pageNode) => <BackendLayout>{pageNode}</BackendLayout>);
            return page;
        }

        throw new Error(
            `Invalid Inertia page path "${name}". Use only "frontend/pages/...", "backend/pages/...", or "common/...".`
        );
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
