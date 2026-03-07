import { create } from 'zustand';
import { deleteTape, fetchTapes } from '../../api/tapeApi';

const DEFAULT_FILTERS = {
    search: '',
    sort: 'newest',
    year: '',
    qa_checked: '',
    screener: '',
    first_printer: '',
};

const initialState = {
    tapes: [],
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 0,
    filters: DEFAULT_FILTERS,
    isLoading: false,
    deletingId: null,
    error: '',
};

function sanitizeFilters(filters) {
    const sort = (filters.sort || 'newest').trim().toLowerCase();

    return {
        ...filters,
        search: filters.search?.trim() || '',
        sort: sort === 'oldest' ? 'oldest' : 'newest',
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

    setPerPage: (perPage) =>
        set({
            perPage: Math.min(100, Math.max(1, Number(perPage || 10))),
            page: 1,
        }),

    resetFilters: () =>
        set({
            filters: {
                ...DEFAULT_FILTERS,
            },
            perPage: 10,
            page: 1,
        }),

    clearError: () => set({ error: '' }),

    loadTapes: async () => {
        set({ isLoading: true, error: '' });

        const { page, perPage, filters } = get();
        const payloadFilters = sanitizeFilters(filters);

        try {
            const payload = await fetchTapes({
                page,
                per_page: perPage,
                ...payloadFilters,
            });

            const data = payload?.data || {};

            set({
                tapes: Array.isArray(data.data) ? data.data : [],
                page: Number(data.current_page || page),
                perPage: Number(data.per_page || perPage || 10),
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
