import React from 'react';

const uploadGuidelines = [
    'Only VHS tapes: no BETA tapes for now.',
    'Only NTSC tapes: no Canadian or European tapes for now.',
    'No re-release tapes: upload original tapes, not later remastered/classics editions.',
    'Check for duplicates before adding a tape.',
    'Add any new print-run variation, even if only one detail differs.',
    'Include all available images (ideally each tape side).',
    'Crop images cleanly to tape edges.',
    'Use "-" for non-visible tape elements (example: etching not visible).',
    'Follow the data standards guide for formatting each field.',
];

function SiteInfoPage() {
    return (
        <section className="mx-auto mt-6 w-full max-w-[110rem] space-y-6 px-4 sm:px-6">
            <div className="card border border-base-300 bg-base-100 shadow-xl">
                <div className="card-body p-6 sm:p-8">
                    <div className="badge badge-info badge-outline mb-3 w-fit px-4 py-3">Site Info</div>
                    <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Welcome to TapeDB!</h1>
                    <p className="mt-4 leading-8 text-base-content/80">
                        TapeDB is a visual archive designed to help collectors identify different VHS tape print runs and
                        details. The goal is to reduce the knowledge barrier for new collectors and help the community build
                        a complete identification guide. TapeDB is a continuous work in progress and welcomes contributions.
                        TapeDB will always be free for collectors to use.
                    </p>
                    <p className="mt-3 text-sm text-base-content/70">
                        Managed by Brady Haugh.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <article className="card border border-base-300 bg-base-100 shadow-lg">
                    <div className="card-body p-6">
                        <h2 className="text-2xl font-bold">TapeDB’s Mission</h2>
                        <p className="mt-2 text-base-content/80">
                            Provide an organized and searchable database of VHS tapes so collectors can quickly identify
                            print runs and verify authenticity.
                        </p>
                    </div>
                </article>

                <article className="card border border-base-300 bg-base-100 shadow-lg">
                    <div className="card-body p-6">
                        <h2 className="text-2xl font-bold">Shoutouts</h2>
                        <p className="mt-2 text-base-content/70">Coming soon.</p>
                    </div>
                </article>
            </div>

            <div className="card border border-base-300 bg-base-100 shadow-xl">
                <div className="card-body p-6 sm:p-8">
                    <h2 className="text-2xl font-bold">How to Use TapeDB</h2>
                    <div className="mt-4 space-y-4">
                        <div>
                            <p className="font-semibold">1. Search for a tape</p>
                            <p className="text-base-content/75">
                                Use the search box at the top of the page to find a movie by title, year, ID, or keyword.
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">2. Browse tape listings</p>
                            <p className="text-base-content/75">
                                Scroll through matching results and open records to view more images and identifying data.
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">3. Request a contributor account</p>
                            <p className="text-base-content/75">
                                Email Brady at{' '}
                                <a className="link link-primary" href="mailto:bradyjhaugh@gmail.com">
                                    bradyjhaugh@gmail.com
                                </a>{' '}
                                to get contributor access.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border border-base-300 bg-base-100 shadow-xl">
                <div className="card-body p-6 sm:p-8">
                    <h2 className="text-2xl font-bold">How to Upload to TapeDB</h2>
                    <p className="mt-2 text-base-content/80">
                        After signing in with a contributor account, go to the admin dashboard and add new entries. New
                        submissions appear immediately and remain marked as “Not QA’d” until reviewed.
                    </p>

                    <div className="mt-5 grid gap-3">
                        {uploadGuidelines.map((item) => (
                            <div key={item} className="rounded-xl border border-base-300 bg-base-200/60 px-4 py-3 text-sm">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card border border-warning/40 bg-warning/5 shadow-sm">
                <div className="card-body p-6">
                    <h2 className="text-xl font-bold">Commercial Use</h2>
                    <p className="text-base-content/80">
                        This database (including images) may not be used in other applications or for commercial purposes
                        without written permission.
                    </p>
                </div>
            </div>

            <div className="card border border-base-300 bg-base-100 shadow-xl">
                <div className="card-body p-6 sm:p-8">
                    <h2 className="text-2xl font-bold">Thank You!</h2>
                    <p className="mt-2 text-base-content/80">
                        This site is a passion project that will continue to grow over time. For feature requests, tape
                        requests, or data issues, please email Brady. - Brady
                    </p>
                    <p className="mt-4 text-sm text-base-content/60">
                        TapeDB © 2025 — A VHS Tape Archive &amp; Database for Collectors.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default SiteInfoPage;
