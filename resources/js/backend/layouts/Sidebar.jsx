import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    LayoutDashboard,
    Disc3,
    Settings,
    Users,
    House,
} from 'lucide-react';

const menuItems = [
    { label: 'Dashboard', href: '/dashbaord', icon: LayoutDashboard },
    { label: 'Users', href: '/dashbaord/users', icon: Users },
    { label: 'Tapes', href: '/dashbaord/tapes', icon: Disc3 },
    { label: 'Settings', href: '/dashbaord/settings', icon: Settings },
    { label: 'Back to Homepage', href: '/', icon: House, variant: 'home' },
];

function Sidebar() {
    const { url } = usePage();

    return (
        <aside className="drawer-side z-20">
            <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay" />
            <div className="min-h-full w-72 border-r border-base-300 bg-base-100 p-4">
                <div className="card mb-6 border border-base-300 bg-base-200 shadow-sm">
                    <div className="card-body p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-base-content/70">Control Center</p>
                        <h2 className="text-2xl font-extrabold">Dashboard</h2>
                    </div>
                </div>

                <ul className="menu w-full rounded-box p-0">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = url === item.href;

                        return (
                            <li key={item.label} className="w-full">
                                <Link
                                    href={item.href}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 ${
                                        item.variant === 'home'
                                            ? 'mt-2 border border-primary/25 bg-primary/5 hover:bg-primary/10'
                                            : ''
                                    } ${isActive ? 'active' : ''}`}
                                >
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                            isActive
                                                ? 'bg-base-100/30'
                                                : item.variant === 'home'
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'bg-base-200 text-base-content/70'
                                        }`}
                                    >
                                        <Icon size={18} strokeWidth={2.2} />
                                    </span>
                                    <span className="text-sm font-medium tracking-[0.01em]">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
