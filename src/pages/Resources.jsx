import { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { resourceService } from '../services/resourceService';
import { Search, Filter, Plus, Box, Truck } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Resources({ userRole }) {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const loadResources = async () => {
            const data = await resourceService.getAll();
            setResources(data);
        };
        loadResources();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'AVAILABLE': return 'bg-green-100 text-green-700 border-green-200';
            case 'IN_USE': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'MAINTENANCE': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'DEPLETED': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <PageContainer title="Resource Inventory" userRole={userRole}>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between items-center bg-slate-50">
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                        <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-500">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>

                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Resource
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3">Resource Name</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Quantity</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Managed By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {resources.map((res) => (
                                <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center mr-3 text-slate-500">
                                            {res.type === 'Ambulances' ? <Truck className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                                        </div>
                                        {res.id}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{res.type}</td>
                                    <td className="px-6 py-4 font-mono font-medium text-slate-800">
                                        {res.quantity.toLocaleString()} <span className="text-slate-400 text-xs font-sans">{res.unit}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{res.location}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn("px-2 py-1 rounded-full text-xs font-bold border", getStatusColor(res.status))}>
                                            {res.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{res.ngo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageContainer>
    );
}
