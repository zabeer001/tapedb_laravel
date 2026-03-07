import { apiRequest } from '../../../shared/apiClient';

export async function fetchReportStats() {
    return apiRequest('/api/reports/stats', { method: 'GET', auth: true });
}
