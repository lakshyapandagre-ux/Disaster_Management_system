export const RESOURCE_TYPES = {
    FOOD: 'Food Packs',
    WATER: 'Water Bottles',
    MEDICAL: 'Medical Kits',
    SHELTER: 'Tents',
    TRANSPORT: 'Ambulances',
    PERSONNEL: 'Volunteers'
};

export const RESOURCE_STATUS = {
    AVAILABLE: 'AVAILABLE',
    IN_USE: 'IN_USE',
    DEPLETED: 'DEPLETED',
    MAINTENANCE: 'MAINTENANCE'
};

export const MOCK_RESOURCES = [
    {
        id: 'RES-001',
        type: RESOURCE_TYPES.FOOD,
        quantity: 5000,
        unit: 'packs',
        status: RESOURCE_STATUS.AVAILABLE,
        location: 'Central Warehouse A',
        ngo: 'Global Aid Foundation',
        coordinates: { lat: 23.0200, lng: 72.5800 }
    },
    {
        id: 'RES-002',
        type: RESOURCE_TYPES.WATER,
        quantity: 1200,
        unit: 'liters',
        status: RESOURCE_STATUS.AVAILABLE,
        location: 'North Depot',
        ngo: 'Local Community Hub',
        coordinates: { lat: 23.0400, lng: 72.5600 }
    },
    {
        id: 'RES-003',
        type: RESOURCE_TYPES.MEDICAL,
        quantity: 50,
        unit: 'kits',
        status: RESOURCE_STATUS.IN_USE,
        location: 'Mobile Unit 4',
        ngo: 'Red Cross',
        coordinates: { lat: 23.0225, lng: 72.5714 }
    },
    {
        id: 'RES-004',
        type: RESOURCE_TYPES.TRANSPORT,
        quantity: 3,
        unit: 'vehicles',
        status: RESOURCE_STATUS.MAINTENANCE,
        location: 'City Garage',
        ngo: 'Gov Transport',
        coordinates: { lat: 23.0100, lng: 72.5900 }
    },
    {
        id: 'RES-005',
        type: RESOURCE_TYPES.SHELTER,
        quantity: 200,
        unit: 'tents',
        status: RESOURCE_STATUS.AVAILABLE,
        location: 'Stadium Ground',
        ngo: 'Disaster Relief Corp',
        coordinates: { lat: 23.0500, lng: 72.5400 }
    },
    {
        id: 'RES-006',
        type: RESOURCE_TYPES.PERSONNEL,
        quantity: 25,
        unit: 'people',
        status: RESOURCE_STATUS.AVAILABLE,
        location: 'Volunteer Base Camp',
        ngo: 'Youth Brigade',
        coordinates: { lat: 23.0300, lng: 72.5500 }
    }
];
