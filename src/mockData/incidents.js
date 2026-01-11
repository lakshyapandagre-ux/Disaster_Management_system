export const INCIDENT_TYPES = {
    FLOOD: 'FLOOD',
    EARTHQUAKE: 'EARTHQUAKE',
    FIRE: 'FIRE',
    MEDICAL: 'MEDICAL',
    INFRASTRUCTURE: 'INFRASTRUCTURE',
};

export const SEVERITY_LEVELS = {
    CRITICAL: 'CRITICAL',
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW',
};

export const INCIDENT_STATUS = {
    NEW: 'NEW',
    ASSIGNED: 'ASSIGNED',
    IN_PROGRESS: 'IN_PROGRESS',
    RESOLVED: 'RESOLVED',
};

export const MOCK_INCIDENTS = [
    {
        id: 'INC-2024-001',
        type: INCIDENT_TYPES.FLOOD,
        severity: SEVERITY_LEVELS.CRITICAL,
        status: INCIDENT_STATUS.NEW,
        location: {
            lat: 23.0225,
            lng: 72.5714,
            address: 'Riverside Slum Area, Zone 4',
            city: 'Ahmedabad'
        },
        description: 'Rapid water level rise reported. approx 200 families trapped. Immediate evacuation needed.',
        peopleAffected: 850,
        reportedBy: 'Field Volunteer - Rahul',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        needs: ['Boats', 'Food Packets', 'Medical Team'],
        aiAnalysis: {
            priorityScore: 95,
            riskAssessment: 'High risk of drowning and waterborne diseases',
            suggestedAction: 'Deploy NDRF team and 5 rescue boats immediatey'
        }
    },
    {
        id: 'INC-2024-002',
        type: INCIDENT_TYPES.MEDICAL,
        severity: SEVERITY_LEVELS.HIGH,
        status: INCIDENT_STATUS.ASSIGNED,
        location: {
            lat: 23.0338,
            lng: 72.5850,
            address: 'City General Hospital, South Wing',
            city: 'Ahmedabad'
        },
        description: 'Structure collapse near hospital entrance. 15 injured reported.',
        peopleAffected: 15,
        reportedBy: 'Emergency Call Center',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        needs: ['Ambulances', 'Excavators'],
        aiAnalysis: {
            priorityScore: 88,
            riskAssessment: 'Structural instability',
            suggestedAction: 'Dispatch 3 Advanced Life Support Ambulances'
        }
    },
    {
        id: 'INC-2024-003',
        type: INCIDENT_TYPES.FIRE,
        severity: SEVERITY_LEVELS.HIGH,
        status: INCIDENT_STATUS.IN_PROGRESS,
        location: {
            lat: 23.0120,
            lng: 72.5100,
            address: 'Industrial Estate, GIDC',
            city: 'Ahmedabad'
        },
        description: 'Chemical factory fire spread to nearby warehouse.',
        peopleAffected: 50,
        reportedBy: 'Automated Sensor Network',
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
        needs: ['Fire Tenders', 'Hazmat Suits'],
        aiAnalysis: {
            priorityScore: 92,
            riskAssessment: 'Toxic smoke dispersion predicted towards residential area',
            suggestedAction: 'Evacuate 2km radius downwind'
        }
    },
    {
        id: 'INC-2024-004',
        type: INCIDENT_TYPES.INFRASTRUCTURE,
        severity: SEVERITY_LEVELS.MEDIUM,
        status: INCIDENT_STATUS.NEW,
        location: {
            lat: 22.9900,
            lng: 72.6000,
            address: 'Main Bridge, Highway 8',
            city: 'Ahmedabad'
        },
        description: 'Bridge crack noticed by patrol. Traffic halted.',
        peopleAffected: 0,
        reportedBy: 'Police Patrol',
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
        needs: ['Engineers', 'Barricades'],
        aiAnalysis: {
            priorityScore: 60,
            riskAssessment: 'Potential collapse if traffic continues',
            suggestedAction: 'Divert traffic to bypass road'
        }
    },
    {
        id: 'INC-2024-005',
        type: INCIDENT_TYPES.FLOOD,
        severity: SEVERITY_LEVELS.LOW,
        status: INCIDENT_STATUS.RESOLVED,
        location: {
            lat: 23.0500,
            lng: 72.5500,
            address: 'Low lying park',
            city: 'Ahmedabad'
        },
        description: 'Water logging in park.',
        peopleAffected: 0,
        reportedBy: 'Citizen',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
        needs: ['Pumps'],
        aiAnalysis: {
            priorityScore: 20,
            riskAssessment: 'Minimal',
            suggestedAction: 'Monitor'
        }
    }
];
