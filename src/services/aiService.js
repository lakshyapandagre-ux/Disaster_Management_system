import { MOCK_RECOMMENDATIONS } from '../mockData/recommendations';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const aiService = {
    getRecommendations: async () => {
        await delay(1200); // AI takes longer
        return [...MOCK_RECOMMENDATIONS];
    },

    approveIntervention: async (id) => {
        await delay(800);
        return { id, status: 'APPROVED' };
    },

    rejectIntervention: async (id) => {
        await delay(400);
        return { id, status: 'REJECTED' };
    }
};
