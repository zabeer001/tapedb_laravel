import { create } from "zustand";
import { apiRequest } from "../../../../shared/apiClient";
import { mapTapeToRow } from "../_utils/tapeMapper";

const PAGE_SIZE = 50;
const QA_FILTER_ALL = "ALL";
const MAX_PAGES_IN_MEMORY = 2;
const LOAD_MODE_REPLACE = "replace";
const LOAD_MODE_APPEND = "append";
const LOAD_MODE_PREPEND = "prepend";
let activeRequestId = 0;

function buildTapesUrl(page, query, qaFilter) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("per_page", String(PAGE_SIZE));

  const trimmedQuery = query.trim();
  if (trimmedQuery) {
    params.set("search", trimmedQuery);
  }

  if (qaFilter === "QA") {
    params.set("qa_checked", "1");
  } else if (qaFilter === "NOT_QA") {
    params.set("qa_checked", "0");
  }

  return `/api/tapes?${params.toString()}`;
}

function toPositiveInteger(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }
  return Math.floor(parsed);
}

function getSortedUniquePages(pageNumbers) {
  return Array.from(new Set(pageNumbers)).sort((a, b) => a - b);
}

function flattenRowsByPages(pagesByNumber, loadedPages) {
  return loadedPages.flatMap((pageNumber) => pagesByNumber[pageNumber] || []);
}

function trimLoadedPages(loadedPages, mode) {
  if (loadedPages.length <= MAX_PAGES_IN_MEMORY) {
    return loadedPages;
  }

  if (mode === LOAD_MODE_APPEND) {
    return loadedPages.slice(loadedPages.length - MAX_PAGES_IN_MEMORY);
  }

  if (mode === LOAD_MODE_PREPEND) {
    return loadedPages.slice(0, MAX_PAGES_IN_MEMORY);
  }

  return loadedPages.slice(loadedPages.length - MAX_PAGES_IN_MEMORY);
}

function pickPagesByNumber(pagesByNumber, loadedPages) {
  return loadedPages.reduce((acc, pageNumber) => {
    if (Object.prototype.hasOwnProperty.call(pagesByNumber, pageNumber)) {
      acc[pageNumber] = pagesByNumber[pageNumber];
    }
    return acc;
  }, {});
}

const useHomePageStore = create((set, get) => ({
  rows: [],
  pagesByNumber: {},
  loadedPages: [],
  loadedStartPage: 1,
  loadedEndPage: 1,
  loading: true,
  error: "",
  query: "",
  qaFilter: QA_FILTER_ALL,
  page: 1,
  totalPages: 1,
  totalCount: 0,
  hasNextPage: false,
  hasPrevPage: false,
  isPreviewOpen: false,
  previewTapeId: null,
  previewTape: null,
  previewLoading: false,
  previewError: "",

  loadTapes: async (targetPage = 1, options = {}) => {
    const requestId = ++activeRequestId;
    const { query, qaFilter } = get();
    const mode = options?.mode || LOAD_MODE_REPLACE;

    try {
      set({ loading: true, error: "" });

      const payload = await apiRequest(buildTapesUrl(targetPage, query, qaFilter));
      if (requestId !== activeRequestId) {
        return { inserted: false, stale: true };
      }

      const pageData = payload?.data || {};
      const items = Array.isArray(pageData?.data) ? pageData.data : [];
      const mappedItems = items.map(mapTapeToRow);
      const currentPage = toPositiveInteger(pageData?.current_page, targetPage);
      const totalPages = Math.max(1, toPositiveInteger(pageData?.last_page, 1));
      const totalCount = Number(pageData?.total);
      const safeTotalCount = Number.isFinite(totalCount) ? totalCount : mappedItems.length;
      let inserted = false;

      set((state) => {
        const isReplaceMode = mode === LOAD_MODE_REPLACE;
        const previousPages = state.pagesByNumber || {};
        const previousLoadedPages = state.loadedPages || [];

        const nextPagesByNumber = isReplaceMode
          ? { [currentPage]: mappedItems }
          : { ...previousPages, [currentPage]: mappedItems };
        const mergedLoadedPages = isReplaceMode
          ? [currentPage]
          : getSortedUniquePages([...previousLoadedPages, currentPage]);
        const nextLoadedPages = trimLoadedPages(mergedLoadedPages, mode);
        const trimmedPagesByNumber = pickPagesByNumber(nextPagesByNumber, nextLoadedPages);
        const loadedStartPage = nextLoadedPages[0] || currentPage;
        const loadedEndPage = nextLoadedPages[nextLoadedPages.length - 1] || currentPage;

        inserted =
          isReplaceMode || !Object.prototype.hasOwnProperty.call(previousPages, currentPage);

        return {
          rows: flattenRowsByPages(trimmedPagesByNumber, nextLoadedPages),
          pagesByNumber: trimmedPagesByNumber,
          loadedPages: nextLoadedPages,
          loadedStartPage,
          loadedEndPage,
          page: currentPage,
          totalPages,
          totalCount: safeTotalCount,
          hasNextPage: loadedEndPage < totalPages,
          hasPrevPage: loadedStartPage > 1,
        };
      });

      return { inserted, stale: false };
    } catch (err) {
      if (requestId !== activeRequestId) {
        return { inserted: false, stale: true };
      }

      set({ error: err?.message || "Failed to load tapes." });
      return { inserted: false, stale: false };
    } finally {
      if (requestId === activeRequestId) {
        set({ loading: false });
      }
    }
  },

  loadNextPage: async () => {
    const { loading, hasNextPage, totalPages, loadedPages, page } = get();
    if (loading || !hasNextPage) {
      return false;
    }

    const loadedEndPage = loadedPages.length > 0 ? loadedPages[loadedPages.length - 1] : page;
    const targetPage = Math.min(totalPages, loadedEndPage + 1);
    if (targetPage <= loadedEndPage) {
      return false;
    }

    const result = await get().loadTapes(targetPage, { mode: LOAD_MODE_APPEND });
    return Boolean(result?.inserted);
  },

  loadPrevPage: async () => {
    const { loading, hasPrevPage, loadedPages, page } = get();
    if (loading || !hasPrevPage) {
      return false;
    }

    const loadedStartPage = loadedPages.length > 0 ? loadedPages[0] : page;
    const targetPage = Math.max(1, loadedStartPage - 1);
    if (targetPage >= loadedStartPage) {
      return false;
    }

    const result = await get().loadTapes(targetPage, { mode: LOAD_MODE_PREPEND });
    return Boolean(result?.inserted);
  },

  setQuery: (query) => {
    set({ query });
    get().loadTapes(1);
  },

  clearQuery: () => {
    set({ query: "" });
    get().loadTapes(1);
  },

  setQaFilter: (qaFilter) => {
    set({ qaFilter });
    get().loadTapes(1);
  },

  resetFilters: () => {
    set({ query: "", qaFilter: QA_FILTER_ALL });
    get().loadTapes(1);
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
