import { create } from 'zustand';
import { fetchTape } from '../../api/tapeApi';

export const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

const initialState = {
    tape: null,
    isLoading: false,
    error: '',
};

const useShowTapeStore = create((set) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setTape: (tape) => set({ tape }),

    loadTape: async (tapeId) => {
        set({ isLoading: true, error: '' });

        try {
            const payload = await fetchTape(tapeId);
            set({
                tape: payload?.data || null,
                isLoading: false,
                error: '',
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error?.message || 'Failed to load tape.',
                tape: null,
            });
        }
    },

    reset: () =>
        set({
            ...initialState,
        }),
}));

export default useShowTapeStore;
