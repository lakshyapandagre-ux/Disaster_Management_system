export const MOCK_RECOMMENDATIONS = [
    {
        id: 'REC-001',
        incidentId: 'INC-2024-001',
        resourceType: 'Food Packs',
        quantity: 500,
        source: 'Central Warehouse A',
        eta: '15 mins',
        confidence: 96,
        reason: 'Proximity and high stock levels',
        status: 'PENDING' // PENDING, APPROVED, REJECTED
    },
    {
        id: 'REC-002',
        incidentId: 'INC-2024-001',
        resourceType: 'Medical Kits',
        quantity: 20,
        source: 'Mobile Unit 4',
        eta: '45 mins',
        confidence: 82,
        reason: 'Nearest available unit despite traffic',
        status: 'APPROVED'
    },
    {
        id: 'REC-003',
        incidentId: 'INC-2024-002',
        resourceType: 'Ambulances',
        quantity: 3,
        source: 'City General',
        eta: '10 mins',
        confidence: 99,
        reason: 'Critical severity requires immediate dispatch',
        status: 'PENDING'
    },
    {
        id: 'REC-004',
        incidentId: 'INC-2024-003',
        resourceType: 'Hazmat Suits',
        quantity: 15,
        source: 'Industrial Safety Depot',
        eta: '30 mins',
        confidence: 88,
        reason: 'Specialized equipment match',
        status: 'PENDING'
    }
];
