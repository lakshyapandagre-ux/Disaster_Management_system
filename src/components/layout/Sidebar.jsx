import { NavLink } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, Box, BrainCircuit, User, Map as MapIcon, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Sidebar({ userRole, onLogout }) {
    const navItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['ADMIN', 'AUTHORITY'] },
        { to: '/incidents', icon: AlertTriangle, label: 'Incidents', roles: ['ADMIN', 'AUTHORITY', 'VOLUNTEER'] },
        { to: '/resources', icon: Box, label: 'Resources', roles: ['ADMIN', 'AUTHORITY'] },
        { to: '/recommendations', icon: BrainCircuit, label: 'AI Command', roles: ['ADMIN', 'AUTHORITY'] },
        { to: '/map', icon: MapIcon, label: 'Live Map', roles: ['ADMIN', 'AUTHORITY', 'VOLUNTEER'] },
        { to: '/tasks', icon: User, label: 'My Tasks', roles: ['VOLUNTEER'] },
    ];

    const filteredItems = navItems.filter(item => !item.roles || item.roles.includes(userRole));

    return (
        <aside className="h-screen w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 shadow-xl">
            <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center animate-pulse">
                    <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-lg tracking-tight">ResQ<span className="text-red-500">.AI</span></h1>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Command Center</p>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {filteredItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                            )
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg bg-slate-800/50">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">
                        {userRole?.[0] || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">User ({userRole})</p>
                        <p className="text-xs text-slate-500 truncate">Online</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
