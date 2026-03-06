import { create } from 'zustand';
import { createTape } from '../../api/tapeApi';

export const CREATE_IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

const createEmptyForm = {
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

const initialState = {
    form: createEmptyForm,
    files: {},
    previews: {},
    isSaving: false,
    error: '',
};

function withFormField(form, name, value) {
    return {
        ...form,
        [name]: value,
    };
}

function buildFormPayload(form, files) {
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

    CREATE_IMAGE_FIELDS.forEach((field) => {
        if (files[field]) {
            payload.append(field, files[field]);
        }
    });

    return payload;
}

const useCreateTapeStore = create((set, get) => ({
    ...initialState,

    reset: () => set(initialState),

    setError: (error) => set({ error }),

    setField: (name, value) =>
        set((state) => ({
            form: withFormField(state.form, name, value),
        })),

    setBooleanField: (name, value) =>
        set((state) => ({
            form: withFormField(state.form, name, Boolean(value)),
        })),

    setFile: (field, file) => {
        if (!file) {
            set((state) => {
                const nextFiles = { ...state.files };
                const nextPreviews = { ...state.previews };

                delete nextFiles[field];
                delete nextPreviews[field];

                return {
                    files: nextFiles,
                    previews: nextPreviews,
                };
            });

            return;
        }

        set((state) => ({
            files: {
                ...state.files,
                [field]: file,
            },
            previews: {
                ...state.previews,
                [field]: URL.createObjectURL(file),
            },
        }));
    },

    submit: async () => {
        set({ isSaving: true, error: '' });

        const { form, files } = get();
        const payload = buildFormPayload(form, files);

        try {
            await createTape(payload);
            set(initialState);
            return true;
        } catch (error) {
            set({ error: error?.message || 'Failed to create tape.' });
            return false;
        } finally {
            set({ isSaving: false });
        }
    },
}));

export default useCreateTapeStore;
