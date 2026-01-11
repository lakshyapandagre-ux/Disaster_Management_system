import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, Clock, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SEVERITY_LEVELS } from '../../mockData/incidents';

export default function IncidentList({ incidents, selectedId, onSelect }) {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case SEVERITY_LEVELS.CRITICAL: return 'bg-red-500';
            case SEVERITY_LEVELS.HIGH: return 'bg-orange-500';
            case SEVERITY_LEVELS.MEDIUM: return 'bg-yellow-500';
            default: return 'bg-blue-500';
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-800">Priority Incident Queue</h3>
                <p className="text-xs text-slate-500">Sorted by Al Severity Score</p>
            </div>

            <div className="flex-1 overflow-y-auto">
                {incidents.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No active incidents</div>
                ) : (
                    incidents.map((incident) => (
                        <div
                            key={incident.id}
                            onClick={() => onSelect(incident.id)}
                            className={cn(
                                "p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors relative",
                                selectedId === incident.id ? "bg-blue-50/80" : ""
                            )}
                        >
                            <div className={cn("absolute left-0 top-0 bottom-0 w-1", getSeverityColor(incident.severity))} />

                            <div className="flex justify-between items-start mb-1 pl-2">
                                <span className="font-bold text-slate-800 text-sm">#{incident.id.split('-')[1]}</span>
                                <span className="text-xs font-mono text-slate-400">
                                    {formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true }).replace('about ', '')}
                                </span>
                            </div>

                            <div className="pl-2">
                                <p className="text-sm font-medium text-slate-700 line-clamp-2 mb-2">{incident.description}</p>

                                <div className="flex items-center space-x-3 text-xs text-slate-500">
                                    <span className="flex items-center">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {incident.location.city}
                                    </span>
                                    <span className="flex items-center">
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        Score: {incident.aiAnalysis.priorityScore}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
