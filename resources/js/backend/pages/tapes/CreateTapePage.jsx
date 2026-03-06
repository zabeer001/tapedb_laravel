import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import { createTape } from './api/tapeApi';

const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

const emptyForm = {
    user_id: '',
    name: '',
    title: '',
    year: '',
    distributor: '',
    case_desc: '',
    seal: '',
    sticker: '',
    watermarks: '',
    etching: '',
    notes: '',
    qa_checked: '',
    screener: '',
    first_printer: '',
    guard_color: '',
    upc: '',
    approved: false,
};

function CreateTapePage() {
    const userRole = useMemo(() => localStorage.getItem('role') || 'user', []);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [files, setFiles] = useState({});
    const [previews, setPreviews] = useState({});

    const onTextChange = (event) => {
        const { name, type, value, checked } = event.target;

        setForm((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const onFileChange = (field, event) => {
        const file = event.target.files?.[0] || null;

        if (!file) {
            setFiles((current) => {
                const next = { ...current };

                delete next[field];
                return next;
            });

            setPreviews((current) => {
                const next = { ...current };
                delete next[field];
                return next;
            });

            return;
        }

        setFiles((current) => ({
            ...current,
            [field]: file,
        }));

        setPreviews((current) => ({
            ...current,
            [field]: URL.createObjectURL(file),
        }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setError('');

        const payload = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (key === 'approved') {
                payload.append(key, value ? '1' : '0');
                return;
            }

            if (value === '' || value == null) {
                return;
            }

            payload.append(key, String(value));
        });

        IMAGE_FIELDS.forEach((field) => {
            if (files[field]) {
                payload.append(field, files[field]);
            }
        });

        try {
            await createTape(payload);
            window.location.href = '/tapes?created=1';
        } catch (err) {
            setError(err.message || 'Failed to create tape.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-extrabold">Add Tape</h1>
                            <p className="mt-2 text-sm text-base-content/70">
                                Add a new tape and upload up to six images. Signed in as:{' '}
                                <span className="font-semibold uppercase">{userRole}</span>
                            </p>
                        </div>
                        <Link href="/tapes" className="btn btn-outline">
                            Back
                        </Link>
                    </div>
                </div>
            </section>

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {error ? <div className="alert alert-error mb-4 py-2 text-sm">{error}</div> : null}

                    <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
                        <label className="form-control w-full">
                            <span className="label-text mb-2">User ID</span>
                            <input
                                type="number"
                                name="user_id"
                                className="input input-bordered w-full"
                                value={form.user_id}
                                onChange={onTextChange}
                                min={1}
                                placeholder="Optional user id"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Name</span>
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered w-full"
                                value={form.name}
                                onChange={onTextChange}
                                placeholder="Tape name"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Title</span>
                            <input
                                type="text"
                                name="title"
                                className="input input-bordered w-full"
                                value={form.title}
                                onChange={onTextChange}
                                placeholder="Tape title"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Year</span>
                            <input
                                type="text"
                                name="year"
                                className="input input-bordered w-full"
                                value={form.year}
                                onChange={onTextChange}
                                placeholder="1982"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Distributor</span>
                            <input
                                type="text"
                                name="distributor"
                                className="input input-bordered w-full"
                                value={form.distributor}
                                onChange={onTextChange}
                                placeholder="Distributor"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Guard Color</span>
                            <input
                                type="text"
                                name="guard_color"
                                className="input input-bordered w-full"
                                value={form.guard_color}
                                onChange={onTextChange}
                                placeholder="Blue / Red"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">UPC</span>
                            <input
                                type="text"
                                name="upc"
                                className="input input-bordered w-full"
                                value={form.upc}
                                onChange={onTextChange}
                                placeholder="UPC"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">QA Checked</span>
                            <input
                                type="text"
                                name="qa_checked"
                                className="input input-bordered w-full"
                                value={form.qa_checked}
                                onChange={onTextChange}
                                placeholder="Yes / No"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Screener</span>
                            <input
                                type="text"
                                name="screener"
                                className="input input-bordered w-full"
                                value={form.screener}
                                onChange={onTextChange}
                                placeholder="S1"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">First Printer</span>
                            <input
                                type="text"
                                name="first_printer"
                                className="input input-bordered w-full"
                                value={form.first_printer}
                                onChange={onTextChange}
                                placeholder="P1"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Case</span>
                            <textarea
                                name="case_desc"
                                className="textarea textarea-bordered h-28 w-full"
                                value={form.case_desc}
                                onChange={onTextChange}
                                placeholder="Case details"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Notes</span>
                            <textarea
                                name="notes"
                                className="textarea textarea-bordered h-28 w-full"
                                value={form.notes}
                                onChange={onTextChange}
                                placeholder="Additional notes"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Seal</span>
                            <textarea
                                name="seal"
                                className="textarea textarea-bordered h-24 w-full"
                                value={form.seal}
                                onChange={onTextChange}
                                placeholder="Seal details"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Sticker</span>
                            <textarea
                                name="sticker"
                                className="textarea textarea-bordered h-24 w-full"
                                value={form.sticker}
                                onChange={onTextChange}
                                placeholder="Sticker details"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Watermarks</span>
                            <textarea
                                name="watermarks"
                                className="textarea textarea-bordered h-24 w-full"
                                value={form.watermarks}
                                onChange={onTextChange}
                                placeholder="Watermarks"
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2">Etching</span>
                            <textarea
                                name="etching"
                                className="textarea textarea-bordered h-24 w-full"
                                value={form.etching}
                                onChange={onTextChange}
                                placeholder="Etching"
                            />
                        </label>

                        <div className="md:col-span-2">
                            <label className="label cursor-pointer gap-3 justify-start">
                                <input
                                    type="checkbox"
                                    name="approved"
                                    className="checkbox checkbox-success"
                                    checked={form.approved}
                                    onChange={onTextChange}
                                />
                                <span className="label-text font-medium">Approved</span>
                            </label>
                        </div>

                        <div className="md:col-span-2 rounded-box border border-base-300 p-4">
                            <h3 className="mb-3 font-semibold">Images (img1 - img6)</h3>
                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                {IMAGE_FIELDS.map((field, index) => (
                                    <label key={field} className="form-control w-full">
                                        <span className="label-text mb-2">{`Image ${index + 1}`}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="file-input file-input-bordered w-full"
                                            onChange={(event) => onFileChange(field, event)}
                                        />
                                        {previews[field] ? (
                                            <img
                                                src={previews[field]}
                                                className="mt-2 h-24 w-full rounded-lg border border-base-300 object-cover"
                                                alt={`${field} preview`}
                                            />
                                        ) : null}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <button type="submit" className="btn btn-success" disabled={isSaving}>
                                {isSaving ? 'Creating...' : 'Create Tape'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default CreateTapePage;
