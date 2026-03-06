import { create } from "zustand";
import { apiRequest } from "../../../../shared/apiClient";
import { mapTapeToRow } from "../_utils/tapeMapper";

const PAGE_SIZE = 10;
const QA_FILTER_ALL = "ALL";

function getFilteredRows(rows, query, qaFilter) {
  const q = query.trim().toLowerCase();

  return rows
    .filter((row) => {
      if (!q) {
        return true;
      }

      const haystack = [
        row.id,
        row.title,
        row.year,
        row.distributor,
        row.seal,
        row.sticker,
        row.waterMarks,
        row.guardColor,
        row.upc,
        row.etching,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    })
    .filter((row) => {
      if (qaFilter === QA_FILTER_ALL) {
        return true;
      }
      if (qaFilter === "QA") {
        return row.qa === true;
      }
      if (qaFilter === "NOT_QA") {
        return row.qa === false;
      }
      return true;
    });
}

function getPagedRows(filteredRows, page) {
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pagedRows = filteredRows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return {
    totalPages,
    safePage,
    pagedRows,
    visibleCount: pagedRows.length,
    filteredCount: filteredRows.length,
  };
}

function createHomePageResultSelector() {
  let lastRows = null;
  let lastQuery = "";
  let lastQaFilter = QA_FILTER_ALL;
  let lastPage = 1;
  let lastResult = null;

  return (state) => {
    const hasCache =
      lastResult !== null &&
      state.rows === lastRows &&
      state.query === lastQuery &&
      state.qaFilter === lastQaFilter &&
      state.page === lastPage;

    if (hasCache) {
      return lastResult;
    }

    const filteredRows = getFilteredRows(state.rows, state.query, state.qaFilter);
    const nextResult = getPagedRows(filteredRows, state.page);

    lastRows = state.rows;
    lastQuery = state.query;
    lastQaFilter = state.qaFilter;
    lastPage = state.page;
    lastResult = nextResult;

    return nextResult;
  };
}

export const selectHomePageResultState = createHomePageResultSelector();

const useHomePageStore = create((set, get) => ({
  rows: [],
  loading: true,
  error: "",
  query: "",
  qaFilter: QA_FILTER_ALL,
  page: 1,
  isPreviewOpen: false,
  previewTapeId: null,
  previewTape: null,
  previewLoading: false,
  previewError: "",

  loadTapes: async () => {
    try {
      set({ loading: true, error: "" });

      const allRows = [];
      let currentPage = 1;

      while (true) {
        const payload = await apiRequest(`/api/tapes?page=${currentPage}&per_page=100`);
        const items = payload?.data?.data || [];
        allRows.push(...items.map(mapTapeToRow));

        if (!payload?.data?.next_page_url) {
          break;
        }

        currentPage += 1;
      }

      set({ rows: allRows });
    } catch (err) {
      set({ error: err?.message || "Failed to load tapes." });
    } finally {
      set({ loading: false });
    }
  },

  setQuery: (query) => set({ query, page: 1 }),

  clearQuery: () => set({ query: "", page: 1 }),

  setQaFilter: (qaFilter) => set({ qaFilter, page: 1 }),

  resetFilters: () => set({ query: "", qaFilter: QA_FILTER_ALL, page: 1 }),

  prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),

  nextPage: () => {
    const { rows, query, qaFilter, page } = get();
    const filteredRows = getFilteredRows(rows, query, qaFilter);
    const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
    set({ page: Math.min(totalPages, page + 1) });
  },

  openTapePreview: async (tapeId) => {
    if (tapeId === null || tapeId === undefined) {
      return;
    }

    set({
      isPreviewOpen: true,
      previewTapeId: tapeId,
      previewTape: null,
      previewLoading: true,
      previewError: "",
    });

    try {
      const payload = await apiRequest(`/api/tapes/${tapeId}`);

      if (get().previewTapeId !== tapeId) {
        return;
      }

      set({
        previewTape: payload?.data || null,
        previewLoading: false,
        previewError: "",
      });
    } catch (err) {
      if (get().previewTapeId !== tapeId) {
        return;
      }

      set({
        previewTape: null,
        previewLoading: false,
        previewError: err?.message || "Failed to load tape details.",
      });
    }
  },

  closeTapePreview: () =>
    set({
      isPreviewOpen: false,
      previewTapeId: null,
      previewTape: null,
      previewLoading: false,
      previewError: "",
    }),

  retryTapePreview: () => {
    const tapeId = get().previewTapeId;
    if (tapeId === null || tapeId === undefined) {
      return;
    }
    get().openTapePreview(tapeId);
  },
}));

export default useHomePageStore;
