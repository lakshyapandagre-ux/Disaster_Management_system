import { useEffect, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import StatsCard from '../components/dashboard/StatsCard';
import { AlertTriangle, MapPin, Package, Users, Activity } from 'lucide-react';
import { incidentService } from '../services/incidentService';
import { resourceService } from '../services/resourceService';

export default function Dashboard({ userRole }) {
    const [stats, setStats] = useState({
        activeIncidents: 0,
        zonesHighRisk: 0,
        availableResources: 0,
        activeVolunteers: 0
    });

    useEffect(() => {
        // Simulate data fetching for dashboard stats
        const fetchStats = async () => {
            const incidents = await incidentService.getAll();
            const resources = await resourceService.getAll();

            const active = incidents.filter(i => i.status !== 'RESOLVED').length;
            const critical = incidents.filter(i => i.severity === 'CRITICAL' || i.severity === 'HIGH').length;
            const totalResources = resources.reduce((acc, curr) => acc + curr.quantity, 0);

            setStats({
                activeIncidents: active,
                zonesHighRisk: critical,
                availableResources: Math.floor(totalResources / 100), // active "units" active just for show
                activeVolunteers: 42 // mocked active volunteers
            });
        };

        fetchStats();
        const interval = setInterval(fetchStats, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <PageContainer title="Command Dashboard" userRole={userRole}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Active Incidents"
                    value={stats.activeIncidents}
                    previousValue={stats.activeIncidents - 2}
                    icon={AlertTriangle}
                    colorClass="bg-red-500"
                    trend="up"
                />
                <StatsCard
                    title="High Severity Zones"
                    value={stats.zonesHighRisk}
                    previousValue={stats.zonesHighRisk}
                    icon={MapPin}
                    colorClass="bg-orange-500"
                    trend="same"
                />
                <StatsCard
                    title="Resource Units"
                    value={stats.availableResources}
                    previousValue={stats.availableResources + 10}
                    icon={Package}
                    colorClass="bg-blue-500"
                    trend="down"
                />
                <StatsCard
                    title="Field Volunteers"
                    value={stats.activeVolunteers}
                    previousValue={stats.activeVolunteers - 5}
                    icon={Users}
                    colorClass="bg-green-500"
                    trend="up"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                {/* Placeholder for Map Preview */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800">Live Incident Map</h3>
                        <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded full flex items-center">
                            <Activity className="w-3 h-3 mr-1" />
                            Real-time
                        </span>
                    </div>
                    <div className="flex-1 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                        <p className="text-slate-400 font-medium">Map View Component Overlay</p>
                    </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
                    <h3 className="font-bold text-slate-800 mb-4">Live Activity Feed</h3>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-start space-x-3 text-sm pb-3 border-b border-slate-100 last:border-0">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                                <div>
                                    <p className="text-slate-800 font-medium">New resource request from Zone 4</p>
                                    <p className="text-slate-500 text-xs">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
