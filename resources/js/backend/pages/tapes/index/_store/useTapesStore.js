import { create } from 'zustand';
import { deleteTape, fetchTapes } from '../../api/tapeApi';

const DEFAULT_FILTERS = {
    search: '',
    year: '',
    qa_checked: '',
    screener: '',
    first_printer: '',
};

const initialState = {
    tapes: [],
    page: 1,
    perPage: 15,
    total: 0,
    totalPages: 0,
    filters: DEFAULT_FILTERS,
    isLoading: false,
    deletingId: null,
    error: '',
};

function sanitizeFilters(filters) {
    return {
        ...filters,
        search: filters.search?.trim() || '',
        year: filters.year?.trim() || '',
        qa_checked: filters.qa_checked?.trim() || '',
        screener: filters.screener?.trim() || '',
        first_printer: filters.first_printer?.trim() || '',
    };
}

const useTapesStore = create((set, get) => ({
    ...initialState,

    setFilter: (key, value) =>
        set((state) => ({
            page: 1,
            filters: {
                ...state.filters,
                [key]: value ?? '',
            },
        })),

    setPage: (page) =>
        set({
            page: Math.max(1, Number(page || 1)),
        }),

    resetFilters: () =>
        set({
            filters: {
                ...DEFAULT_FILTERS,
            },
            page: 1,
        }),

    clearError: () => set({ error: '' }),

    loadTapes: async () => {
        set({ isLoading: true, error: '' });

        const { page, filters } = get();
        const payloadFilters = sanitizeFilters(filters);

        try {
            const payload = await fetchTapes({
                page,
                ...payloadFilters,
            });

            const data = payload?.data || {};

            set({
                tapes: Array.isArray(data.data) ? data.data : [],
                page: Number(data.current_page || page),
                perPage: Number(data.per_page || 15),
                total: Number(data.total || 0),
                totalPages: Number(data.last_page || 0),
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error?.message || 'Failed to load tapes.',
            });
        }
    },

    deleteTape: async (tapeId) => {
        set({ deletingId: tapeId, error: '' });

        try {
            await deleteTape(tapeId);
            await get().loadTapes();
            return true;
        } catch (error) {
            set({ error: error?.message || 'Failed to delete tape.' });
            return false;
        } finally {
            set({ deletingId: null });
        }
    },

    reset: () =>
        set({
            ...initialState,
            filters: {
                ...DEFAULT_FILTERS,
            },
        }),
}));

export default useTapesStore;
