import { AlertTriangle, Clock, MapPin, CheckCircle, ArrowRight, Activity, ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

export default function IncidentDetails({ incident, onAssign, onResolve }) {
    if (!incident) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col items-center justify-center text-slate-400 p-8">
                <Activity className="w-16 h-16 mb-4 opacity-20" />
                <p>Select an incident to view live details and Al analysis</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-start">
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <span className={cn(
                            "px-2 py-0.5 text-xs font-bold rounded uppercase",
                            incident.severity === 'CRITICAL' ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                        )}>
                            {incident.severity} Severity
                        </span>
                        <span className="text-sm font-mono text-slate-400">{incident.id}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{incident.type} reported at {incident.location.address}</h2>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">{incident.aiAnalysis.priorityScore}</div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Priority Score</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Map Placeholder */}
                <div className="w-full h-48 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Ahmedabad&zoom=13&size=600x300&sensor=false')] bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700"></div>
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-10 font-medium text-sm flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-red-500" />
                        {incident.location.lat.toFixed(4)}, {incident.location.lng.toFixed(4)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
                            <ShieldAlert className="w-4 h-4 mr-2" />
                            Situation Report
                        </h3>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm space-y-3">
                            <p className="text-slate-700 leading-relaxed">{incident.description}</p>
                            <div className="flex justify-between text-xs pt-2 border-t border-slate-200">
                                <span className="text-slate-500">Reported by: {incident.reportedBy}</span>
                                <span className="text-slate-500">{format(new Date(incident.createdAt), 'PPp')}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-lg">
                            <span className="text-sm font-medium text-red-800">People Affected</span>
                            <span className="text-2xl font-bold text-red-600">{incident.peopleAffected}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center text-indigo-600">
                            <Activity className="w-4 h-4 mr-2" />
                            AI Analysis
                        </h3>
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm space-y-3">
                            <div>
                                <span className="font-semibold text-indigo-900 block mb-1">Risk Assessment</span>
                                <p className="text-indigo-800">{incident.aiAnalysis.riskAssessment}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-indigo-900 block mb-1">Suggested Action</span>
                                <p className="text-indigo-800">{incident.aiAnalysis.suggestedAction}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-slate-500 uppercase">Identified Needs</h4>
                            <div className="flex flex-wrap gap-2">
                                {incident.needs.map(need => (
                                    <span key={need} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                                        {need}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex space-x-4">
                <button
                    onClick={() => onAssign(incident.id)}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center lg:text-sm"
                >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Assign Resources
                </button>
                <button
                    onClick={() => onResolve(incident.id)}
                    className="px-6 border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium py-2.5 rounded-lg transition-all flex items-center justify-center lg:text-sm"
                >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Resolved
                </button>
            </div>
        </div>
    );
}
