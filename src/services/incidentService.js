import { MOCK_INCIDENTS } from '../mockData/incidents';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const incidentService = {
    getAll: async () => {
        await delay(800);
        return [...MOCK_INCIDENTS];
    },

    getById: async (id) => {
        await delay(500);
        return MOCK_INCIDENTS.find(inc => inc.id === id);
    },

    create: async (data) => {
        await delay(1000);
        const newIncident = {
            ...data,
            id: `INC-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: 'NEW',
            aiAnalysis: {
                priorityScore: Math.floor(Math.random() * 40) + 60, // 60-100
                riskAssessment: 'Analyzing...',
                suggestedAction: 'Pending AI Review'
            }
        };
        return newIncident;
    },

    updateStatus: async (id, status) => {
        await delay(600);
        // In a real app, we would update the backend here
        return { id, status, updatedAt: new Date().toISOString() };
    }
};
