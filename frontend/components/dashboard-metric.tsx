import type { LucideIcon } from 'lucide-react';

interface DashboardMetricProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function DashboardMetric({ icon: Icon, label, value }: DashboardMetricProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-100 shadow-glow">
      <div className="flex items-center gap-3 text-slate-400">
        <Icon className="h-5 w-5 text-accent" />
        <span className="text-xs uppercase tracking-[0.3em]">{label}</span>
      </div>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
