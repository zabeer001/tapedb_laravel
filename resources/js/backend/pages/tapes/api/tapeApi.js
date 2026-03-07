function getErrorMessage(payload, fallbackMessage) {
    if (payload?.message) {
        return payload.message;
    }

    const firstValidationError = Object.values(payload?.errors || {})[0];

    if (Array.isArray(firstValidationError) && firstValidationError[0]) {
        return firstValidationError[0];
    }

    return fallbackMessage;
}

function buildHeaders(options = {}) {
    const token = localStorage.getItem('access_token');
    const headers = {
        Accept: 'application/json',
        ...(options.headers || {}),
    };

    if (!options.skipAuth && token) {
        headers.Authorization = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && options.includeJson) {
        headers['Content-Type'] = 'application/json';
    }

    return headers;
}

export async function requestJson(url, options = {}, fallbackMessage = 'Request failed.') {
    const response = await fetch(url, {
        method: options.method || 'GET',
        headers: buildHeaders({
            ...options,
            includeJson: !options.body || !(options.body instanceof FormData),
        }),
        body: options.body,
    });

    let payload = null;

    try {
        payload = await response.json();
    } catch (parseError) {
        payload = null;
    }

    if (!response.ok) {
        throw new Error(getErrorMessage(payload, fallbackMessage));
    }

    return payload;
}

export function buildTapeQuery(params = {}) {
    const query = new URLSearchParams();

    if (params.page) {
        query.set('page', String(params.page));
    }

    if (params.per_page) {
        query.set('per_page', String(params.per_page));
    }

    if (params.search) {
        query.set('search', params.search);
    }

    if (params.sort) {
        query.set('sort', params.sort);
    }

    if (params.year) {
        query.set('year', params.year);
    }

    if (params.qa_checked) {
        query.set('qa_checked', params.qa_checked);
    }

    if (params.screener) {
        query.set('screener', params.screener);
    }

    if (params.first_printer) {
        query.set('first_printer', params.first_printer);
    }

    return query.toString();
}

export async function fetchTapes(params = {}) {
    const query = buildTapeQuery(params);
    const path = query ? `/api/tapes?${query}` : '/api/tapes';

    return requestJson(path, { method: 'GET' }, 'Failed to load tapes.');
}

export async function fetchTape(id) {
    return requestJson(`/api/tapes/${id}`, {}, 'Failed to load tape.');
}

export async function createTape(formData) {
    return requestJson(
        '/api/tapes',
        {
            method: 'POST',
            body: formData,
        },
        'Failed to create tape.',
    );
}

export async function updateTape(id, formData) {
    return requestJson(
        `/api/tapes/${id}`,
        {
            method: 'PUT',
            body: formData,
        },
        'Failed to update tape.',
    );
}

export async function deleteTape(id) {
    return requestJson(`/api/tapes/${id}`, { method: 'DELETE' }, 'Failed to delete tape.');
}
