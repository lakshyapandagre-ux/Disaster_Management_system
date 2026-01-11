import PageContainer from '../layout/PageContainer';
import { MapPin, Navigation, Info } from 'lucide-react';
import { MOCK_INCIDENTS } from '../../mockData/incidents';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export default function MapViewPage({ userRole }) {
    const [selectedPin, setSelectedPin] = useState(null);

    return (
        <PageContainer title="Live Operations Map" userRole={userRole}>
            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700 h-[calc(100vh-140px)] relative">
                {/* Map Background Simulation */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Ahmedabad&zoom=12&size=1200x800&scale=2&sensor=false')] bg-cover bg-center grayscale contrast-125"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.3)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Pins */}
                {MOCK_INCIDENTS.map((inc, index) => (
                    <button
                        key={inc.id}
                        onClick={() => setSelectedPin(inc)}
                        className={cn(
                            "absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 hover:z-50 focus:outline-none",
                            selectedPin?.id === inc.id ? "z-50 scale-125" : "z-10 hover:scale-110"
                        )}
                        style={{
                            top: `${50 + (Math.random() * 40 - 20)}%`, // Randomize slightly for demo distinctness
                            left: `${50 + (Math.random() * 60 - 30)}%`
                        }}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-bounce",
                            inc.severity === 'CRITICAL' ? "bg-red-600" :
                                inc.severity === 'HIGH' ? "bg-orange-500" : "bg-yellow-500"
                        )}>
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                            {inc.type}
                        </div>
                    </button>
                ))}

                {/* Side Panel Overlay */}
                {selectedPin && (
                    <div className="absolute right-4 top-4 bottom-4 w-80 bg-white/95 backdrop-blur shadow-2xl rounded-xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-slate-800">{selectedPin.type}</h3>
                                <p className="text-xs text-slate-500">{selectedPin.location.address}</p>
                            </div>
                            <button onClick={() => setSelectedPin(null)} className="text-slate-400 hover:text-slate-600">
                                <span className="sr-only">Close</span>
                                &times;
                            </button>
                        </div>

                        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                                <span className="text-xs font-bold text-red-700 uppercase">Severity Priority</span>
                                <p className="font-bold text-xl text-red-800">{selectedPin.aiAnalysis.priorityScore}/100</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-slate-800 mb-2">Description</h4>
                                <p className="text-sm text-slate-600">{selectedPin.description}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-slate-800 mb-2">Required Resources</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedPin.needs.map(n => (
                                        <span key={n} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200 font-medium">
                                            {n}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-200">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg flex items-center justify-center">
                                <Navigation className="w-4 h-4 mr-2" />
                                Dispatch Units
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PageContainer>
    );
}
