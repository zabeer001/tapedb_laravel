import { create } from 'zustand';
import { fetchTape, updateTape } from '../../api/tapeApi';

export const EDIT_IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];
const BINARY_FIELDS = new Set(['qa_checked', 'screener', 'first_printer']);

const EMPTY_FORM = {
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
    qa_checked: 0,
    screener: 0,
    first_printer: 0,
    guard_color: '',
    upc: '',
    approved: false,
};

const initialState = {
    tape: null,
    form: EMPTY_FORM,
    files: {},
    previews: {},
    removeImages: {},
    isLoading: false,
    isSaving: false,
    error: '',
};

function withFormField(form, name, value) {
    return {
        ...form,
        [name]: value,
    };
}

function getStringValue(value) {
    return value === undefined || value === null ? '' : String(value);
}

function normalizeBinaryFlag(value) {
    return value === 1 || value === '1' || value === true ? 1 : 0;
}

function buildPayload(form, files, removeImages) {
    const payload = new FormData();

    Object.entries(form).forEach(([key, value]) => {
        if (key === 'approved') {
            payload.append(key, value ? '1' : '0');
            return;
        }

        payload.append(key, getStringValue(value));
    });

    EDIT_IMAGE_FIELDS.forEach((field) => {
        if (files[field]) {
            payload.append(field, files[field]);
            return;
        }

        if (removeImages[field]) {
            payload.append(field, '');
        }
    });

    return payload;
}

function normalizeTape(tape) {
    const current = { ...EMPTY_FORM };

    Object.keys(current).forEach((key) => {
        if (key in tape) {
            if (BINARY_FIELDS.has(key)) {
                current[key] = normalizeBinaryFlag(tape[key]);
                return;
            }

            current[key] = tape[key];
        }
    });

    return {
        ...current,
        approved: Boolean(tape.approved),
    };
}

const useEditTapeStore = create((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setSaving: (isSaving) => set({ isSaving }),
    setTape: (tape) => set({ tape }),

    reset: () =>
        set({
            ...initialState,
            form: EMPTY_FORM,
        }),

    setField: (name, value) =>
        set((state) => ({
            form: withFormField(state.form, name, value),
        })),

    setBooleanField: (name, value) =>
        set((state) => ({
            form: withFormField(state.form, name, Boolean(value)),
        })),

    setFile: (field, file) =>
        set((state) => {
            if (!file) {
                const nextFiles = { ...state.files };
                const nextPreviews = { ...state.previews };

                delete nextFiles[field];
                delete nextPreviews[field];

                return {
                    files: nextFiles,
                    previews: nextPreviews,
                    removeImages: {
                        ...state.removeImages,
                        [field]: false,
                    },
                };
            }

            return {
                files: {
                    ...state.files,
                    [field]: file,
                },
                previews: {
                    ...state.previews,
                    [field]: URL.createObjectURL(file),
                },
                removeImages: {
                    ...state.removeImages,
                    [field]: false,
                },
            };
        }),

    setRemoveImage: (field, remove) =>
        set((state) => {
            const nextFiles = { ...state.files };
            const nextPreviews = { ...state.previews };

            if (remove) {
                delete nextFiles[field];
                delete nextPreviews[field];
            }

            return {
                files: nextFiles,
                previews: nextPreviews,
                removeImages: {
                    ...state.removeImages,
                    [field]: Boolean(remove),
                },
            };
        }),

    loadTape: async (tapeId) => {
        set({ isLoading: true, error: '' });

        try {
            const payload = await fetchTape(tapeId);
            const tape = payload?.data || null;

            set({
                tape,
                form: tape ? normalizeTape(tape) : EMPTY_FORM,
                files: {},
                previews: {},
                removeImages: {},
                isLoading: false,
            });
        } catch (error) {
            set({
                tape: null,
                isLoading: false,
                error: error?.message || 'Failed to load tape.',
            });
        }
    },

    submit: async (tapeId) => {
        set({ isSaving: true, error: '' });

        const { form, files, removeImages } = get();
        const payload = buildPayload(form, files, removeImages);

        try {
            await updateTape(tapeId, payload);
            set({
                files: {},
                previews: {},
                removeImages: {},
            });
            return true;
        } catch (error) {
            set({ error: error?.message || 'Failed to update tape.' });
            return false;
        } finally {
            set({ isSaving: false });
        }
    },
}));

export default useEditTapeStore;
