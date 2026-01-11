import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { cn } from '../../lib/utils';

export default function PageContainer({ children, title, userRole }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Fixed on desktop, transform on mobile */}
            <div className={cn(
                "fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:transform-none select-none",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <Sidebar userRole={userRole} onLogout={() => window.location.reload()} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 md:ml-0 overflow-hidden">
                <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
