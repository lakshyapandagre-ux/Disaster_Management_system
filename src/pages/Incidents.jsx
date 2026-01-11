import { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import IncidentList from '../components/incidents/IncidentList';
import IncidentDetails from '../components/incidents/IncidentDetails';
import { incidentService } from '../services/incidentService';
import { useToast } from '../components/common/Toast';

export default function Incidents({ userRole }) {
    const [incidents, setIncidents] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        loadIncidents();
    }, []);

    const loadIncidents = async () => {
        setLoading(true);
        const data = await incidentService.getAll();
        setIncidents(data);
        if (data.length > 0 && !selectedId) {
            setSelectedId(data[0].id);
        }
        setLoading(false);
    };

    const selectedIncident = incidents.find(i => i.id === selectedId);

    const handleAssign = (id) => {
        addToast("Resource Allocation", `Opened resource allocation panel for incident ${id}`, "info");
    };

    const handleResolve = async (id) => {
        if (window.confirm('Are you sure you want to mark this active incident as resolved?')) {
            await incidentService.updateStatus(id, 'RESOLVED');
            addToast("Incident Resolved", `Incident ${id} has been marked as resolved and closed.`, "success");
            await loadIncidents();
        }
    };

    return (
        <PageContainer title="Incident Management" userRole={userRole}>
            <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6">
                <div className="w-full lg:w-1/3 h-full">
                    <IncidentList
                        incidents={incidents}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />
                </div>
                <div className="w-full lg:w-2/3 h-full">
                    <IncidentDetails
                        incident={selectedIncident}
                        onAssign={handleAssign}
                        onResolve={handleResolve}
                    />
                </div>
            </div>
        </PageContainer>
    );
}
