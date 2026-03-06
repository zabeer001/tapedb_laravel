import React from 'react';
import { Link } from '@inertiajs/react';

function FrontendNavbar({ themes, theme, setTheme }) {
    return (
        <header className="navbar relative z-[100]  rounded-2xl border border-base-300/50 bg-base-100/70 px-4 shadow-lg backdrop-blur-xl sm:px-6">
            <div className="navbar-start">
                <img
                    src="/images/tapedb-logo.png"
                    alt="TapeDB logo"
                    className="h-12 w-auto max-w-[260px] object-contain"
                />
            </div>

           

            <div className="navbar-end gap-2">
                <button type="button" className="btn btn-info btn-sm hidden sm:inline-flex">
                    Site Info
                </button>
                <button type="button" className="btn btn-success btn-sm hidden sm:inline-flex">
                    Stats
                </button>
                <Link
                    href="/sign-in"
                    className={`btn btn-sm ${theme === 'light' ? 'btn-neutral text-neutral-content' : 'btn-primary'}`}
                >
                    Login
                </Link>

                <div className="dropdown dropdown-end">
                    <button
                        type="button"
                        tabIndex={0}
                        className="btn btn-sm btn-ghost gap-1 px-2"
                        aria-label="Change theme"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="18" height="18" rx="5" className="fill-base-200 stroke-base-300" strokeWidth="1.2" />
                            <circle cx="9" cy="9" r="1.6" fill="#7c3aed" />
                            <circle cx="15" cy="9" r="1.6" fill="#0ea5e9" />
                            <circle cx="9" cy="15" r="1.6" fill="#ec4899" />
                            <circle cx="15" cy="15" r="1.6" fill="#22c55e" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.12l3.71-3.89a.75.75 0 1 1 1.08 1.04l-4.25 4.46a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[9999] mt-2 max-h-80 w-56 overflow-y-auto rounded-box border border-base-300 bg-base-100 p-2 shadow-2xl"
                    >
                        {themes.map((name) => (
                            <li key={name}>
                                <button
                                    type="button"
                                    className={`btn btn-sm btn-ghost btn-block justify-start capitalize ${
                                        theme === name ? 'btn-active' : ''
                                    }`}
                                    onClick={() => setTheme(name)}
                                >
                                    {name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default FrontendNavbar;
