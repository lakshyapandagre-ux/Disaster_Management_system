import { Bell, Search, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Topbar({ onMenuClick, title }) {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center space-x-4">
                <button className="md:hidden p-2 hover:bg-slate-100 rounded-md" onClick={onMenuClick}>
                    <Menu className="w-5 h-5 text-slate-600" />
                </button>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
                <span className="hidden md:flex items-center space-x-2 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-100 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    <span>LIVE OPS: FLOOD - ZONE 4</span>
                </span>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search incidents, resources..."
                        className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all"
                    />
                </div>

                <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>
    );
}
