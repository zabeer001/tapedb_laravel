import React, { useEffect, useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { fetchTape, updateTape } from './api/tapeApi';

const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

function EditTapePage() {
    const { tapeId } = usePage().props;
    const userRole = useMemo(() => localStorage.getItem('role') || 'user', []);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
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
    });
    const [files, setFiles] = useState({});
    const [previews, setPreviews] = useState({});
    const [existing, setExisting] = useState({});

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

    useEffect(() => {
        const loadTape = async () => {
            try {
                const payload = await fetchTape(tapeId);
                const tape = payload?.data || null;

                if (!tape) {
                    throw new Error('Tape not found.');
                }

                setForm({
                    user_id: tape.user_id ? String(tape.user_id) : '',
                    name: tape.name || '',
                    title: tape.title || '',
                    year: tape.year || '',
                    distributor: tape.distributor || '',
                    case_desc: tape.case_desc || '',
                    seal: tape.seal || '',
                    sticker: tape.sticker || '',
                    watermarks: tape.watermarks || '',
                    etching: tape.etching || '',
                    notes: tape.notes || '',
                    qa_checked: tape.qa_checked || '',
                    screener: tape.screener || '',
                    first_printer: tape.first_printer || '',
                    guard_color: tape.guard_color || '',
                    upc: tape.upc || '',
                    approved: Boolean(tape.approved),
                });

                setExisting({
                    img1: tape.img1 || '',
                    img2: tape.img2 || '',
                    img3: tape.img3 || '',
                    img4: tape.img4 || '',
                    img5: tape.img5 || '',
                    img6: tape.img6 || '',
                });

                setError('');
            } catch (err) {
                setError(err.message || 'Failed to load tape.');
            } finally {
                setIsLoading(false);
            }
        };

        loadTape();
    }, [tapeId]);

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

            if (value !== '') {
                payload.append(key, String(value));
            }
        });

        IMAGE_FIELDS.forEach((field) => {
            if (files[field]) {
                payload.append(field, files[field]);
            }
        });

        try {
            await updateTape(tapeId, payload);
            window.location.href = '/tapes?updated=1';
        } catch (err) {
            setError(err.message || 'Failed to update tape.');
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
                            <h1 className="text-3xl font-extrabold">Edit Tape</h1>
                            <p className="mt-2 text-sm text-base-content/70">
                                Update tape details and replace images. Signed in as:{' '}
                                <span className="font-semibold uppercase">{userRole}</span>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/tapes" className="btn btn-outline">
                                Back
                            </Link>
                            <Link href={`/tapes/${tapeId}`} className="btn btn-ghost">
                                View
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {isLoading ? <p className="text-sm text-base-content/70">Loading tape...</p> : null}
                    {error ? <div className="alert alert-error mb-4 py-2 text-sm">{error}</div> : null}

                    {!isLoading && (
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
                                />
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2">Case</span>
                                <textarea
                                    name="case_desc"
                                    className="textarea textarea-bordered h-28 w-full"
                                    value={form.case_desc}
                                    onChange={onTextChange}
                                />
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2">Notes</span>
                                <textarea
                                    name="notes"
                                    className="textarea textarea-bordered h-28 w-full"
                                    value={form.notes}
                                    onChange={onTextChange}
                                />
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2">Seal</span>
                                <textarea
                                    name="seal"
                                    className="textarea textarea-bordered h-24 w-full"
                                    value={form.seal}
                                    onChange={onTextChange}
                                />
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2">Sticker</span>
                                <textarea
                                    name="sticker"
                                    className="textarea textarea-bordered h-24 w-full"
                                    value={form.sticker}
                                    onChange={onTextChange}
                                />
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2">Watermarks</span>
                                <textarea
                                    name="watermarks"
                                    className="textarea textarea-bordered h-24 w-full"
                                    value={form.watermarks}
                                    onChange={onTextChange}
                                />
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2">Etching</span>
                                <textarea
                                    name="etching"
                                    className="textarea textarea-bordered h-24 w-full"
                                    value={form.etching}
                                    onChange={onTextChange}
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
                                    {IMAGE_FIELDS.map((field, index) => {
                                        const previewUrl = previews[field] ? previews[field] : existing[field] ? `/storage/${existing[field]}` : '';

                                        return (
                                            <label key={field} className="form-control w-full">
                                                <span className="label-text mb-2">{`Image ${index + 1}`}</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="file-input file-input-bordered w-full"
                                                    onChange={(event) => onFileChange(field, event)}
                                                />
                                                {previewUrl ? (
                                                    <img
                                                        src={previewUrl}
                                                        className="mt-2 h-24 w-full rounded-lg border border-base-300 object-cover"
                                                        alt={`${field} preview`}
                                                    />
                                                ) : null}
                                            </label>
                                        );
                                    })}
                                </div>
                                <p className="mt-2 text-xs text-base-content/60">
                                    Uploading a new image for any slot replaces that old one on the server.
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <button type="submit" className="btn btn-success" disabled={isSaving}>
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}

export default EditTapePage;
