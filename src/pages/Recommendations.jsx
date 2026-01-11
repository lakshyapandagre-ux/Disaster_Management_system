import { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { aiService } from '../services/aiService';
import { BrainCircuit, Check, X, ArrowRight, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Recommendations({ userRole }) {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const data = await aiService.getRecommendations();
        setRecommendations(data);
        setLoading(false);
    };

    const handleAction = async (id, action) => {
        // In real app, call service
        const updated = recommendations.map(rec =>
            rec.id === id ? { ...rec, status: action === 'approve' ? 'APPROVED' : 'REJECTED' } : rec
        );
        setRecommendations(updated);
    };

    return (
        <PageContainer title="AI Command Recommendations" userRole={userRole}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec) => (
                    <div key={rec.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center space-x-2">
                                <BrainCircuit className="w-5 h-5 text-purple-600" />
                                <span className="font-bold text-slate-700 text-sm">AI-REC-{rec.id.split('-')[1]}</span>
                            </div>
                            <div className={cn(
                                "px-2 py-0.5 text-xs font-bold rounded uppercase",
                                rec.confidence > 90 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            )}>
                                {rec.confidence}% Confidence
                            </div>
                        </div>

                        <div className="p-5 flex-1 space-y-4">
                            <div>
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Incident</span>
                                <p className="text-slate-900 font-medium font-mono">{rec.incidentId}</p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resource</span>
                                    <p className="text-lg font-bold text-slate-800">{rec.quantity} {rec.resourceType}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300" />
                                <div className="flex-1 text-right">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</span>
                                    <p className="text-sm font-medium text-slate-700">{rec.source}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                                <p className="text-slate-600 italic">"{rec.reason}"</p>
                            </div>

                            <div className="flex items-center text-xs text-slate-500 font-medium">
                                <Clock className="w-3 h-3 mr-1" />
                                ETA: {rec.eta}
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-3">
                            {rec.status === 'PENDING' ? (
                                <>
                                    <button
                                        onClick={() => handleAction(rec.id, 'reject')}
                                        className="flex justify-center items-center py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleAction(rec.id, 'approve')}
                                        className="flex justify-center items-center py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-colors shadow-sm"
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Approve
                                    </button>
                                </>
                            ) : (
                                <div className={cn(
                                    "col-span-2 py-2 flex items-center justify-center font-bold text-sm rounded-lg",
                                    rec.status === 'APPROVED' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                )}>
                                    {rec.status === 'APPROVED' ? 'Approved & Dispatched' : 'Recommendation Rejected'}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </PageContainer>
    );
}
