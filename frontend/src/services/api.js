import { buildApiUrl } from "../config/api";
import Cookies from "js-cookie";

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = Cookies.get("auth_token");
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

// Dashboard Service
export const dashboardService = {
    async getStats() {
        const response = await fetch(buildApiUrl("/dashboard/stats"), {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    async getAnalytics(range = "month") {
        const response = await fetch(buildApiUrl(`/dashboard/analytics?range=${range}`), {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    async getRecentActivity(limit = 5) {
        const response = await fetch(buildApiUrl(`/dashboard/recent-activity?limit=${limit}`), {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },
};

// Transaction Service
export const transactionService = {
    async getAll(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(buildApiUrl(`/transactions?${queryString}`), {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    async getById(id) {
        const response = await fetch(buildApiUrl(`/transactions/${id}`), {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    async create(data) {
        const response = await fetch(buildApiUrl("/transactions"), {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async update(id, data) {
        const response = await fetch(buildApiUrl(`/transactions/${id}`), {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async delete(id) {
        const response = await fetch(buildApiUrl(`/transactions/${id}`), {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },
};

// Card Service
export const cardService = {
    async getAll() {
        const response = await fetch(buildApiUrl("/cards"), {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    async getById(id) {
        const response = await fetch(buildApiUrl(`/cards/${id}`), {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    async create(data) {
        const response = await fetch(buildApiUrl("/cards"), {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async update(id, data) {
        const response = await fetch(buildApiUrl(`/cards/${id}`), {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async toggleStatus(id, status) {
        const response = await fetch(buildApiUrl(`/cards/${id}/toggle-status`), {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify({ status }),
        });
        return handleResponse(response);
    },

    async delete(id) {
        const response = await fetch(buildApiUrl(`/cards/${id}`), {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },
};

// Goal Service
export const goalService = {
    async getAll() {
        const response = await fetch(buildApiUrl("/goals"), {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    async getById(id) {
        const response = await fetch(buildApiUrl(`/goals/${id}`), {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    async create(data) {
        const response = await fetch(buildApiUrl("/goals"), {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async update(id, data) {
        const response = await fetch(buildApiUrl(`/goals/${id}`), {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async addAmount(id, amount) {
        const response = await fetch(buildApiUrl(`/goals/${id}/add-amount`), {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify({ amount }),
        });
        return handleResponse(response);
    },

    async delete(id) {
        const response = await fetch(buildApiUrl(`/goals/${id}`), {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },
};

// Verification Service
export const verificationService = {
    async getStatus() {
        const response = await fetch(buildApiUrl("/verification/status"), {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    async submitStep(stepNumber, data) {
        const response = await fetch(buildApiUrl(`/verification/submit/${stepNumber}`), {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ data }),
        });
        return handleResponse(response);
    },
};

export default {
    dashboard: dashboardService,
    transaction: transactionService,
    card: cardService,
    goal: goalService,
    verification: verificationService,
};
