import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { MapPin, CheckCircle, AlertOctagon, Navigation, Phone, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_INCIDENTS } from '../mockData/incidents';

export default function VolunteerTasks({ userRole }) {
    const [tasks, setTasks] = useState(MOCK_INCIDENTS.slice(0, 3).map(i => ({ ...i, taskStatus: 'PENDING' })));

    const handleStatusChange = (id, status) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, taskStatus: status } : t));
    };

    return (
        <PageContainer title="My Assignments" userRole={userRole}>
            <div className="max-w-xl mx-auto space-y-4">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

                        {/* Map Header */}
                        <div className="h-32 bg-slate-200 relative">
                            <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-400">
                                [Route Map Preview]
                            </div>
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                                2.4 km away
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={cn(
                                        "inline-block px-2 py-0.5 rounded text-xs font-bold uppercase mb-2",
                                        task.severity === 'CRITICAL' ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                                    )}>
                                        {task.type} • {task.severity}
                                    </span>
                                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{task.location.address}</h3>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4 text-sm text-slate-700">
                                <p>{task.description}</p>
                                <div className="mt-2 pt-2 border-t border-slate-200 flex items-center text-slate-500 text-xs">
                                    <User className="w-3 h-3 mr-1" />
                                    Reported by {task.reportedBy}
                                </div>
                            </div>

                            <div className="flex items-end justify-between space-x-3">
                                {task.taskStatus === 'PENDING' ? (
                                    <button
                                        onClick={() => handleStatusChange(task.id, 'IN_PROGRESS')}
                                        className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-medium flex items-center justify-center text-sm active:scale-95 transition-transform"
                                    >
                                        <Navigation className="w-4 h-4 mr-2" />
                                        Start Navigation
                                    </button>
                                ) : task.taskStatus === 'IN_PROGRESS' ? (
                                    <button
                                        onClick={() => handleStatusChange(task.id, 'COMPLETED')}
                                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center text-sm active:scale-95 transition-transform"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Mark Safe
                                    </button>
                                ) : (
                                    <div className="flex-1 bg-green-50 text-green-700 py-3 rounded-lg font-bold flex items-center justify-center text-sm border border-green-200">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Task Completed
                                    </div>
                                )}

                                <button className="bg-slate-100 text-slate-700 p-3 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors">
                                    <Phone className="w-5 h-5" />
                                </button>
                                <button className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                                    <AlertOctagon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </PageContainer>
    );
}
