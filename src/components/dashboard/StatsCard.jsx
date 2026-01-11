import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function StatsCard({ title, value, previousValue, icon: Icon, colorClass, trend }) {
    const isPositive = trend === 'up';

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 group-hover:scale-110 transition-transform duration-500", colorClass)}></div>

            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">{value}</h3>
                </div>
                <div className={cn("p-3 rounded-lg bg-slate-50", colorClass.replace('bg-', 'text-'))}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            <div className="mt-4 flex items-center text-sm">
                <span className={cn(
                    "font-medium flex items-center",
                    isPositive ? "text-green-600" : "text-red-500"
                )}>
                    {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {Math.abs(value - previousValue)}%
                </span>
                <span className="text-slate-400 ml-2">from last hour</span>
            </div>
        </div>
    );
}
