import { MOCK_RESOURCES } from '../mockData/resources';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const resourceService = {
    getAll: async () => {
        await delay(600);
        return [...MOCK_RESOURCES];
    },

    addResource: async (resource) => {
        await delay(1000);
        return {
            ...resource,
            id: `RES-${Date.now()}`,
            status: 'AVAILABLE'
        };
    },

    updateQuantity: async (id, quantity) => {
        await delay(500);
        return { id, quantity };
    }
};
