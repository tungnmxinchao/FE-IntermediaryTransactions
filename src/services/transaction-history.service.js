import { AuthService } from './auth.service';
import { API_CONFIG } from '../config/api.config';
import { formatCurrency, formatDateTime } from '../common/format.utils';

export class TransactionHistoryService {
    static async getTransactionHistory(queryParams = {}) {
        const { 
            skip = 0, 
            top = 10, 
            filter = '', 
            orderby = 'CreatedAt desc' 
        } = queryParams;

        const endpoint = `${API_CONFIG.BASE_URL}/odata/TransactionHistory`;
        const url = new URL(endpoint);
        
        // Add OData query parameters
        if (skip) url.searchParams.append('$skip', skip);
        if (top) url.searchParams.append('$top', top);
        if (filter) url.searchParams.append('$filter', filter);
        if (orderby) url.searchParams.append('$orderby', orderby);
        url.searchParams.append('$count', 'true');
        
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AuthService.getAccessToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch transaction history');
        }

        const data = await response.json();
        return {
            value: data.value || [],
            '@odata.count': parseInt(data['@odata.count']) || 0
        };
    }

    static buildFilterQuery({searchTerm, minAmount, maxAmount, status, startDate, endDate}) {
        const filters = [];

        if (searchTerm) {
            filters.push(`(contains(Note, '${searchTerm}') or contains(string(Id), '${searchTerm}'))`);
        }

        if (minAmount) {
            filters.push(`Amount ge ${minAmount}`);
        }

        if (maxAmount) {
            filters.push(`Amount le ${maxAmount}`);
        }

        if (status && status !== 'all') {
            filters.push(`IsProcessed eq ${status === 'completed'}`);
        }

        if (startDate) {
            filters.push(`CreatedAt ge ${new Date(startDate).toISOString()}`);
        }

        if (endDate) {
            filters.push(`CreatedAt le ${new Date(endDate).toISOString()}`);
        }

        return filters.length > 0 ? filters.join(' and ') : '';
    }

    static getTransactionTypeLabel(type) {
        switch (type) {
            case 1:
                return 'Cộng tiền';
            case 2:
                return 'Trừ tiền';
            default:
                return 'Không xác định';
        }
    }

    static formatAmount(amount) {
        return formatCurrency(amount);
    }

    static formatDate(dateString) {
        return formatDateTime(dateString);
    }
} 